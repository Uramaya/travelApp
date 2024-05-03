import { JSXElementConstructor, useEffect, useCallback, useState } from 'react'
import { Views } from 'react-big-calendar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Box from '@mui/material/Box'
import '@/styles/googleMap/GoogleMap.scss'


const GlobalToolBar = () => {
    return (
        <div className="google-map-wrapper">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center', justifyContent: 'center' }} className="google-map" >
                <p>Google Map</p>
            </Box>
        </div>
    )
}

export default GlobalToolBar