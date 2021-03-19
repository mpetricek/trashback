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

export default function MapLeaflet(props) {
    const [GeoDisabled, setGeoDisabled] = useState(false)
    const { locationData, setLocationData } = React.useContext(LocationContext)
    const [locations, setLocations] = useState([])
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
                color = 'text-yellow-500'
                break
            case 'medium':
                color = 'text-red-500'
                break
            case 'high':
                color = 'text-gray-600'
                break
            default:
                color = 'text-green-500'
        }

        return L.divIcon({
            html:
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>',
            className: 'bg-transparent ' + color,
            iconRetinaUrl: '/img/map/marker.svg',
            iconSize: [30, 30],
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
    const NewMarkers = () => {
        const map = useMapEvents({
            click(e) {
                setLocationData({ ...locationData, location: [e.latlng.lat, e.latlng.lng] })
            },
        })
        return locationData.userLocation[0] !== null ? (
            <Marker
                key={locationData.location && locationData.location[0]}
                icon={icon()}
                position={
                    locationData.location && locationData.location[0] !== null
                        ? locationData.location
                        : locationData.userLocation
                }
            />
        ) : null
    }
    const SetBounds = () => {
        const map = useMap()

        let markerBounds = latLngBounds([])
        locations.forEach((item) => {
            markerBounds.extend(item.location)
        })
        markerBounds.isValid() && map.fitBounds(markerBounds) // <===== Error: Bounds are not valid.
        return null
    }

    return (
        <MapContainer
            zoom={20}
            className={props.className}
            center={props.addMarker && position}
            // dragging={props.dragging}
            tap={props.tap}
            style={props.style}
            zoomControl={false}
        >
            {/*locationData.userLocation && locationData.userLocation[0] !== null && (
                <ChangeView center={locationData.userLocation} zoom={24} />
            ) */}
            {props.addMarker && locationData.location && locationData.location[0] !== null && (
                <ChangeView center={locationData.location} zoom={24} />
            )}
            <TileLayer url={tileLayer.tiles} attribution={tileLayer.attribution} />
            {props.addMarker && <NewMarkers />}

            {!props.addMarker &&
                locations.map((item, index) => (
                    <Marker key={index} icon={icon(item.type)} position={item.location}>
                        <Popup>
                            Title: {item.title} Type: {item.type}
                        </Popup>
                    </Marker>
                ))}
            {!props.addMarker && <SetBounds />}
            <ZoomControl position="bottomleft" />
        </MapContainer>
    )
}
