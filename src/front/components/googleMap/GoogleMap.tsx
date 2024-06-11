import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import {APIProvider, Map, Marker, AdvancedMarker, Pin, InfoWindow,useAdvancedMarkerRef} from '@vis.gl/react-google-maps'
import Box from '@mui/material/Box'
import '@/styles/googleMap/GoogleMap.scss'


const GoogleMapArea = () => {
    // const position = {lat: 35.658584, lng: 139.745433}
    // const [markerRef, marker] = useAdvancedMarkerRef();
    
    // const onClickMarker = (e: google.maps.MapMouseEvent, info: string): void => {
    //     console.log('onClickMarker', e)
    //     console.log('onClickMarker info', info)
    // }
    // const containerStyle = {
    //     width: '100%',
    //     height: '100%',
    //     borderRadius: '20px',
    // }

    // const center = {
    //     lat: 35.658584,
    //     lng: 139.745433
    // }

    const positionAkiba = {
        lat: 35.69731,
        lng: 139.7747,
    }

    // const positionIwamotocho = {
    //     lat: 35.69397,
    //     lng: 139.7762,
    // }

    // const markerLabelAkiba = {
    //     color: "white",
    //     fontFamily: "sans-serif",
    //     fontSize: "15px",
    //     fontWeight: "100",
    //     text: "5",
    // }

    // const markerLabelIwamotocho = {
    //     color: "white",
    //     fontFamily: "sans-serif",
    //     fontSize: "15px",
    //     fontWeight: "100",
    //     text: "12",
    // }

    // return <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    //         <Map
    //             defaultCenter={position}
    //             defaultZoom={3}
    //             mapId={process.env.NEXT_PUBLIC_MAP_ID}
    //         >
    //             <AdvancedMarker
    //                 position={position}
    //                 title='Tokyo Tower'
    //                 onClick={(e) => {onClickMarker(e, "custom info")}}
    //                 ref={markerRef}
      
    //             >
    //                 <Pin
    //                     background={'#0f9d58'}
    //                     borderColor={'#006425'}
    //                     glyphColor={'#60d98f'}
    //                 />
    //             </AdvancedMarker>
    //         </Map>
    //     </APIProvider>
    return <>google map</>
}

export default GoogleMapArea