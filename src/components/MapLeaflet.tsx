import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    Tooltip,
    Circle,
    useMapEvent,
    ZoomControl,
    useMapEvents,
    useMap,
} from 'react-leaflet'
import L, { latLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationContext } from './LocationContext'
import geocoder from 'leaflet-control-geocoder'
import Loader from './Loader'

export default function MapLeaflet(props) {
    const [GeoDisabled, setGeoDisabled] = useState(false)

    const { locationData, setLocationData } = React.useContext(LocationContext)
    const [locations, setLocations] = useState([])

    //const geocoder = LCG.L.Control.Geocoder.nominatim()
    const getAddress = (latlng, user?) => {
        var geocoderFunc = geocoder.nominatim({ reverseQueryParams: { 'accept-language': 'en' } })
        geocoderFunc &&
            geocoderFunc.reverse(latlng, 13, (results) => {
                results[0] &&
                    setLocationData({
                        ...locationData,
                        place:
                            results[0].properties.address.city ||
                            results[0].properties.address.town ||
                            results[0].properties.address.village ||
                            results[0].properties.address.municipality,
                        location: [latlng.lat, latlng.lng],
                        userLocation: user ? [latlng.lat, latlng.lng] : locationData.userLocation,
                        country_code: results[0].properties.address.country_code,
                    })
            })
    }
    useEffect(() => {
        const fetchEntries = async () => {
            await fetch('/api/entries', { method: 'GET' })
                .then((res) => res.json())
                .then((json) => setLocations(json.entriesData))
        }
        fetchEntries()
    }, [])
    useEffect(() => {
        if (!navigator.geolocation) {
            setGeoDisabled(true)
        } else {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocationData({
                    ...locationData,
                    userLocation: [position.coords.latitude, position.coords.longitude],
                })
                getAddress({ lat: position.coords.latitude, lng: position.coords.longitude }, true)
            })
        }

        return () => {
            //setUserLocation([])
        }
    }, [])
    const position: [number, number] =
        locationData.userLocation && locationData.userLocation[0] !== null ? locationData.userLocation : [53.14, 8.22]
    const tileLayer = {
        tiles: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
    }

    const icon = (type?: string) => {
        let color
        switch (type) {
            case 'light':
                color = 'text-yellow-600'
                break

            case 'high':
                color = 'text-gray-700'
                break
            default:
                color = 'text-red-600'
        }

        return L.divIcon({
            html:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>',
            className: 'bg-transparent ' + color,
            iconRetinaUrl: '/img/map/marker.svg',
            iconSize: [30, 30],
        })
    }

    const iconAdd = () => {
        return L.divIcon({
            html:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>',
            className: 'text-white rounded-full bg-green-500',
            iconSize: [25, 25],
        })
    }
    const iconUser = () => {
        return L.divIcon({
            html:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" /></svg>',
            className: 'text-purple-500',
            iconSize: [25, 25],
        })
    }
    const iconCleaned = () => {
        return L.divIcon({
            html:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>',
            className: 'text-green-500',
            iconSize: [25, 25],
        })
    }
    function ChangeView({ center, zoom }) {
        const map = useMap()
        map.setView(center, zoom)
        setTimeout(() => {
            map.invalidateSize()
        }, 250)
        return null
    }

    const toggleAddLocation = (e?) => {
        e && e.preventDefault()
        setLocationData({
            ...locationData,
            addLocation: true,
        })
    }

    const [newLocation, setNewLocation] = useState<[number, number]>([null, null])
    const newRef = useRef()
    const NewMarkers = () => {
        const map = useMapEvents({
            click(e) {
                map.flyTo(e.latlng, map.getZoom())
                setNewLocation([e.latlng.lat, e.latlng.lng])
                getAddress(e.latlng)
            },
        })
        //NewMarkers.leafletElement.openPopup()
        useEffect(() => {
            //  newRef?.current?.openPopup()
        }, [])

        return newLocation[0] !== null ? (
            <Marker
                key={locationData.location && locationData.location[0]}
                icon={iconAdd()}
                position={newLocation}
                ref={newRef}
                eventHandlers={{
                    click: () => {
                        toggleAddLocation()
                    },
                }}
            />
        ) : /* <Tooltip direction="top">
                    <p className="flex items-center">
                        <b className="font-bold text-grey-darkest">Place:</b>{' '}
                        {newLocationLoading ? <Loader size={4} className="mx-auto" /> : locationData.place}
                    </p>
                    <input type="file" accept="image/*" capture="environment" />
                    <button className="bg-green-500 hover:bg-green-600 font-medium text-white shadow-sm rounded-md mx-auto px-3 py-1 block mt-1">
                        Add location
                    </button>
                </Tooltip> 
                <Popup>
                    <button
                        className="bg-green-500 hover:bg-green-600 font-medium text-white shadow-sm rounded-md mx-auto px-3 py-1 block mt-1"
                        onClick={(e) => toggleAddLocation(e)}
                    >
                        Add location
                    </button>
                </Popup>*/
        null
    }
    const UserPosition = () => {
        return locationData.userLocation[0] !== null ? (
            <Marker
                key={locationData.userLocation[0]}
                icon={iconUser()}
                position={locationData.userLocation}
                eventHandlers={{
                    click: () => {
                        toggleAddLocation()
                    },
                }}
            />
        ) : null
    }
    // const SetBounds = () => {
    //     const map = useMap()

    //     let markerBounds = latLngBounds([])

    //     useEffect(() => {
    //         locations.forEach((item) => {
    //             markerBounds.extend(item.location)
    //         })
    //         markerBounds.isValid() && map.fitBounds(markerBounds) // <===== Error: Bounds are not valid.
    //     }, [])

    //     return null
    // }

    return locationData.userLocation[0] !== null ? (
        <MapContainer
            zoom={20}
            className={props.className}
            center={position}
            // dragging={props.dragging}
            tap={props.tap}
            style={props.style}
            zoomControl={false}
        >
            {/*locationData.userLocation && locationData.userLocation[0] !== null && (
                <ChangeView center={locationData.userLocation} zoom={24} />
            ) */}
            {/* {props.addMarker && locationData.location && locationData.location[0] !== null && (
                <ChangeView center={locationData.location} zoom={24} />
            )} */}

            <TileLayer
                url={tileLayer.tiles}
                attribution={tileLayer.attribution}
                eventHandlers={{
                    load: () => props.setMapLoaded(),
                }}
            />

            <NewMarkers />
            <UserPosition />
            {locations.map((item, index) => (
                <Marker key={index} icon={item.cleaned ? iconCleaned() : icon(item.type)} position={item.location}>
                    <Popup>
                        Town {item.town} Type: {item.type}
                    </Popup>
                </Marker>
            ))}
            {/* {!props.addMarker && <SetBounds />} */}
            <ZoomControl position="bottomleft" />
        </MapContainer>
    ) : (
        ''
    )
}
