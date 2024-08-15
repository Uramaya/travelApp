import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface MapDirectionProps {
  selectedStartPlace: google.maps.places.PlaceResult | null
  selectedEndPlace: google.maps.places.PlaceResult | null
  isCommerce: Boolean
  routeIndex: number
  setRouteIndex: Dispatch<SetStateAction<number>>
  routes: google.maps.DirectionsRoute[]
  setRoutes: Dispatch<SetStateAction<google.maps.DirectionsRoute[]>>
  travelMode: google.maps.TravelMode
}

const MapDirection = ({
    selectedStartPlace,
    selectedEndPlace,
    isCommerce,
    routeIndex,
    setRouteIndex,
    routes,
    setRoutes,
    travelMode,
  }: MapDirectionProps) => {
    const map = useMap()
    const routesLibrary = useMapsLibrary("routes")
    const [directionService, setDirectionService] = useState<google.maps.DirectionsService>()
    const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>()
    const selectedRoute = routes[routeIndex]

    useEffect(() => {
      if (!routesLibrary || !map) return
      setDirectionService(new routesLibrary.DirectionsService())
      setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }))

    }, [routesLibrary, map])

    useEffect(() => {
      if (!routesLibrary || !map) return
      setDirectionService(new routesLibrary.DirectionsService())
      setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }))

    }, [routesLibrary, map])

    useEffect(() => {
      if (!directionService || !directionRenderer || !selectedStartPlace || !selectedEndPlace) return

      directionService.route({
        origin: selectedStartPlace.geometry?.location,
        destination: selectedEndPlace.geometry?.location,
        travelMode: travelMode || window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      }).then(response => {
        console.log('response', response)
        directionRenderer.setDirections(response)
        setRoutes(response.routes)
      })
      console.log('routes', routes)
    }, [directionService, directionRenderer, selectedStartPlace, selectedEndPlace])

    return null
}

export default MapDirection
