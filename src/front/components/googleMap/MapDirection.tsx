import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps'
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { EventInfo } from '@/types'

interface MapDirectionProps {
  selectedStartPlace: google.maps.places.PlaceResult | null
  selectedEndPlace: google.maps.places.PlaceResult | null
  isCommerce: boolean
  routeIndex: number
  setRouteIndex: Dispatch<SetStateAction<number>>
  routes: google.maps.DirectionsRoute[]
  setRoutes: Dispatch<SetStateAction<google.maps.DirectionsRoute[]>>
  travelMode: google.maps.TravelMode
  modalEventInfo: EventInfo
  setModalEventInfo: Dispatch<SetStateAction<EventInfo>>
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
    modalEventInfo,
    setModalEventInfo,
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
        transitOptions: {
          departureTime: new Date(modalEventInfo.start), // Set a specific departure time
          // arrivalTime: new Date('2024-08-16T09:00:00'), // Alternatively, set an arrival time
        }
      }).then(response => {

        directionRenderer.setDirections(response)
        setRoutes(response.routes)

        setModalEventInfo({
          ...modalEventInfo,
          location: {
            ...modalEventInfo.location_to,
            google_map_json: {
              ...modalEventInfo.location_to.google_map_json,
              travel_mode: response.request.travelMode,
            },
          },
          location_from: {
            ...modalEventInfo.location_from,
            google_map_json: {
              ...modalEventInfo.location_from.google_map_json,
              travel_mode: response.request.travelMode,
            },
          },
          location_to: {
            ...modalEventInfo.location_to,
            google_map_json: {
              ...modalEventInfo.location_to.google_map_json,
              travel_mode: response.request.travelMode,
            },
          },
        })
      }).catch(err => {
        console.log('map direction err:', err)
      })
    }, [directionService, directionRenderer, selectedStartPlace, selectedEndPlace, travelMode])

    return null
}

export default MapDirection
