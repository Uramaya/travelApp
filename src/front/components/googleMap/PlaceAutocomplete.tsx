import React, {useRef, useEffect, useState} from 'react'
import {useMapsLibrary} from '@vis.gl/react-google-maps'
import { EventInfo } from '@/types'

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
  modalEventInfo: EventInfo
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo>>
  setIsAutoComplete: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceAutocomplete = ({
  onPlaceSelect,
  modalEventInfo,
  setModalEventInfo,
  setIsAutoComplete
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
            ...modalEventInfo.location,
            google_map_json: googleMapJson,
          }
        })
      }
      setIsAutoComplete(true)
    });
  }, [onPlaceSelect, placeAutocomplete, modalEventInfo, setModalEventInfo]);

  return (
    <div className="autocomplete-container">
      <input className="map-autocomplete-input" ref={inputRef} value={modalEventInfo.location.google_map_json.name}/>
    </div>
  );
};

export default PlaceAutocomplete
