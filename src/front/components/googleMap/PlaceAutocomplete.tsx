import React, {useRef, useEffect, useState} from 'react'
import {useMapsLibrary} from '@vis.gl/react-google-maps'
import { EventInfo } from '@/types'

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
  modalEventInfo: EventInfo
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo>>
  setIsAutoComplete: React.Dispatch<React.SetStateAction<boolean>>
  type: 'location' | 'location_from' | 'location_to'
  placeholder?: string
}

const PlaceAutocomplete = ({
  onPlaceSelect,
  modalEventInfo,
  setModalEventInfo,
  setIsAutoComplete,
  type = 'location',
  placeholder,
}: Props) => {
  const [value, setValue] =
  useState<string | null>('')

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    const initLocation = modalEventInfo[type]?.google_map_json?.name || modalEventInfo[type]?.google_map_json?.formatted_address
    if (initLocation) {
      setValue(initLocation)
      // Set the default value
      inputRef.current.value = initLocation
    }
  }, [modalEventInfo, type, inputRef]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, inputRef]);

  const onChangeLocation = (e) => setValue(e.target.value)

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

        const modalInfo = { ...modalEventInfo }
        modalInfo[type] = {
          id: modalEventInfo.location.id || 0,
          google_map_json: googleMapJson,
        }
        setModalEventInfo({
          ...modalInfo
        })
      }
      setIsAutoComplete(true)
    });
  }, [onPlaceSelect, placeAutocomplete, modalEventInfo, setModalEventInfo, inputRef]);

  return (
    <div className="autocomplete-container">
      <input
        className="map-autocomplete-input"
        ref={inputRef}
        value={value}
        onChange={onChangeLocation}
        placeholder={placeholder || 'Search the location'}
      />
    </div>
  );
};

export default PlaceAutocomplete
