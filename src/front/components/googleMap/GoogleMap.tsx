import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import {APIProvider, Map, Marker, AdvancedMarker, Pin} from '@vis.gl/react-google-maps'
import Box from '@mui/material/Box'
import '@/styles/googleMap/GoogleMap.scss'


const GoogleMapArea = () => {

    const position = {lat: 35.658584, lng: 139.745433}
    

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

    return <APIProvider apiKey={''}>
            <Map defaultCenter={position} defaultZoom={3}>
                <Marker position={position} title='Tokyo Tower'/>
            </Map>
            <AdvancedMarker position={positionAkiba}></AdvancedMarker>
        </APIProvider>
}

export default GoogleMapArea