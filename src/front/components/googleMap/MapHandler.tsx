import {useMap} from '@vis.gl/react-google-maps';
import React, {useEffect} from 'react';

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null
  marker: google.maps.marker.AdvancedMarkerElement | null
  isCommerce: boolean
}

const MapHandler = ({ place, marker, isCommerce }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker || isCommerce) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

export default React.memo(MapHandler);
