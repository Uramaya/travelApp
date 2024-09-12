import React, { useRef, useEffect, useState } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { LocationsComponent } from '@/types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons"
import dayjs from 'dayjs'

interface Props {
  lat: number | null
  lng: number | null
  departureTime: Date
  zoom?: number | null
}

const GoogleMapsLink = ({
  lat, lng, departureTime, zoom = 15
}: Props) => {

  const departureTimeUnix = dayjs(departureTime).unix()

  // Construct the Google Maps URL
  const googleMapsUrl = (lat && lng) ? 
  `https://www.google.com/maps?q=${lat},${lng}&departure_time=${departureTimeUnix}` : 'https://www.google.com/maps'

  return (
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      <Button className='map-location-btn mui-customize' variant="contained" size="small">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className="" >
          <FontAwesomeIcon icon={faMapLocationDot} className="icon-map-location" color="#A2A2A2" />
          <div className='title-map-location'>Open Google Map</div>
        </Box>
      </Button>
    </a>
  );
};

export default GoogleMapsLink