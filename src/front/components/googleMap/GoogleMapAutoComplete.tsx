import { JSXElementConstructor, useEffect, useCallback, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { EventInfo, EventInfoKeys, UserInfo, EventTypeInfo, LocationsComponent } from '@/types'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faLocationPin } from "@fortawesome/free-solid-svg-icons"
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


const GoogleMapAutoComplete = ({
    events,
}: {
    events: EventInfo[],
}) => {
    const position = { lat: 35.658584, lng: 139.745433 }
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [location, setLocation] = useState(null);

    const onClickMarker = (e: google.maps.MapMouseEvent, info: string): void => {
    }

    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null)


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
                <AdvancedMarker ref={markerRef} position={null} />
            </Map>
            <MapControl position={ControlPosition.LEFT_TOP}>
                <div className="autocomplete-control">
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} setLocation={setLocation}/>
                </div>
            </MapControl>
            <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
    </div>
}

export default GoogleMapAutoComplete