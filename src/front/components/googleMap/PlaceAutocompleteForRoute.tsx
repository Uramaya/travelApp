import React, { useRef, useEffect, useState } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { EventInfo } from '@/types'
import { Autocomplete } from '@react-google-maps/api'

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
  modalEventInfo: EventInfo
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo>>
  setIsAutoComplete: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceAutocompleteForRoute = ({
  onPlaceSelect,
  modalEventInfo,
  setModalEventInfo,
  setIsAutoComplete
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);


  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace())
      const place = placeAutocomplete.getPlace()
      if (place.geometry) {
        const googleMapJson = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name || null,
          formatted_address: place.formatted_address || null,
        }
        setModalEventInfo({
          ...modalEventInfo,
          location: {
            id: modalEventInfo.location.id || 0,
            google_map_json: googleMapJson,
          }
        })
      }
      setIsAutoComplete(true)
    });
  }, [onPlaceSelect, placeAutocomplete, modalEventInfo, setModalEventInfo]);

  return (
    <>
    <div className="autocomplete-container">
      <input
        className="map-autocomplete-input"
        ref={startRef}
        value={modalEventInfo?.location?.google_map_json?.name || null}
      />
    </div>

      <div className="autocomplete-container">
        <input
          className="map-autocomplete-input"
          ref={endRef}
          value={modalEventInfo?.location?.google_map_json?.name || null}
        />
      </div>
    </>
  );
};

export default PlaceAutocompleteForRoute
