import React, { useEffect, useContext, useMemo, useRef, useState } from 'react'
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
import { icon, iconAdd, iconUser, iconCleaned } from './Markers'
import { latLng, latLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TrashbackContext } from '../TrashbackContext'
import geocoder from 'leaflet-control-geocoder'
import Loader from '../Loader'

export default function MapLeaflet(props) {
    const { trashbackData, setTrashbackData } = useContext(TrashbackContext)
    const [locations, setLocations] = useState([])

    //const geocoder = LCG.L.Control.Geocoder.nominatim()
    const getAddress = (latlng, user?) => {
        var geocoderFunc = geocoder.nominatim({ reverseQueryParams: { 'accept-language': 'en' } })
        geocoderFunc &&
            geocoderFunc.reverse(latlng, 13, (results) => {
                console.log(latlng)
                results[0] &&
                    setTrashbackData({
                        ...trashbackData,
                        place:
                            results[0].properties.address.city ||
                            results[0].properties.address.town ||
                            results[0].properties.address.village ||
                            results[0].properties.address.municipality,
                        location: [latlng.lat, latlng.lng],
                        userLocation: user ? [latlng.lat, latlng.lng] : trashbackData.userLocation,
                        country_code: results[0].properties.address.country_code,
                    })
            })
    }

    // Get locations
    useEffect(() => {
        const fetchEntries = async () => {
            await fetch('/api/entries', { method: 'GET' })
                .then((res) => res.json())
                .then((json) => setLocations(json.entriesData))
        }
        fetchEntries()
    }, [])

    // Get user position
    useEffect(() => {
        if (Object.keys(navigator.geolocation).length === 0) {
            const fetchEntries = async () => {
                await fetch('https://freegeoip.live/json/')
                    .then((res) => res.json())
                    .then((json) =>
                        setTrashbackData({
                            ...trashbackData,
                            userLocation: [json.latitude, json.longitude],
                        })
                    )
            }
            fetchEntries()
        } else {
            navigator.geolocation.getCurrentPosition(function (position) {
                setTrashbackData({
                    ...trashbackData,
                    userLocation: [position.coords.latitude, position.coords.longitude],
                })
                getAddress({ lat: position.coords.latitude, lng: position.coords.longitude }, true)
            })
        }

        // return () => {
        //     setLocationData([])
        // }
    }, [])

    // Set center
    const position: [number, number] =
        trashbackData.userLocation && trashbackData.userLocation[0] !== null
            ? trashbackData.userLocation
            : [53.14, 8.22]

    // Set tileLayer
    const tileLayer = {
        tiles: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
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
        setTrashbackData({
            ...trashbackData,
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
                key={trashbackData.location && trashbackData.location[0]}
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
        return trashbackData.userLocation[0] !== null ? (
            <Marker
                key={trashbackData.userLocation[0]}
                icon={iconUser()}
                position={trashbackData.userLocation}
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

    return trashbackData.userLocation[0] !== null ? (
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
            {locations.map((item) => (
                <Marker key={item.id} icon={item.cleaned ? iconCleaned() : icon(item.type)} position={item.location}>
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
