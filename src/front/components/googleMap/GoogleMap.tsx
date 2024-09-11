import { JSXElementConstructor, useEffect, useCallback, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { EventInfo, EventInfoKeys, UserInfo, EventTypeInfo } from '@/types'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faLocationPin, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import PlaceAutocomplete from "@/components/googleMap/PlaceAutocomplete"
import MapHandler from '@/components/googleMap/MapHandler';
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useAdvancedMarkerRef,
    useMap,
    useMapsLibrary,
    ControlPosition,
    MapControl,
} from '@vis.gl/react-google-maps'
import Box from '@mui/material/Box'
import '@/styles/googleMap/GoogleMap.scss'


const GoogleMapArea = ({
    events,
    isNotShowNum = false,
}: {
    events: EventInfo[],
    isNotShowNum?: boolean,
}) => {
    const position = { lat: 35.658584, lng: 139.745433 }
    const [markerRef, marker] = useAdvancedMarkerRef()

    const onClickMarker = (e: google.maps.MapMouseEvent, eventInfo: EventInfo): void => {
        console.log('onClickMarker', e)
        console.log('onClickMarker info', eventInfo)
      }

    const calendarEventsAdvanceMarkers = (): JSX.Element => {
        return <>{events.map((event) => {
            const position = { 
                lat: event.location?.google_map_json?.lat,
                lng: event.location?.google_map_json?.lng }
            if (!event.location?.google_map_json?.lat || !event.location?.google_map_json?.lng) {
                return
            }
            const title = event.location.google_map_json.name
            return <AdvancedMarker
                position={position}
                title={title}
                onClick={(e) => { onClickMarker(e, event) }}
                ref={markerRef}
                >
                {pin(event)}
            </AdvancedMarker>
        })}</>
    }

    const pin = (event: EventInfo): JSX.Element => {
        if (isNotShowNum) {
            return <div className='google-map-pin'>
                <FontAwesomeIcon className='google-map-pin-icon' icon={faLocationDot} color="#D84949" />
            </div>
        } else {
            return <div className='google-map-pin'>
                <FontAwesomeIcon className='google-map-pin-icon' icon={faLocationPin} color="#D84949" />
                <div className='google-map-pin-num'>{event.index || 1}</div>
            </div>
        }
    }

    return <div className='google-map-area'>
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
        >
            <Map
                defaultCenter={position}
                defaultZoom={3}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
                disableDefaultUI={true}
            >
                {calendarEventsAdvanceMarkers()}
            </Map>
        </APIProvider>
    </div>
}

export default GoogleMapArea