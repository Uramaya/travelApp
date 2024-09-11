import { useCallback, useState, useRef, useEffect } from "react"
import { EventInfo, EventInfoKeys, UserInfo, EventTypeInfo, LocationsComponent } from '@/types'
import '@/styles/calendar/CalendarEventModal.scss'
import '@/styles/Quill.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationPin, faClock, faLocationDot, faUsers, faAlignLeft, faCircleDot, faMapLocationDot, faEnvelope, faLightbulb, faTrashCan, faCopy, faPlus, faCar, faTrain, faWalking , faBicycle, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel, getUserInfoById } from '@/utils/utils'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconDefaultUser from '@/components/icon/IconDefaultUser'
import Switch from '@/components/mui/Switch'
import Textarea from '@/components/mui/Textarea'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { All_USERS, GMT_OPTIONS, toolbarOptions } from '@/const'
import { getCountryFlagSVGByTimeZoneName, getCalendarEventDateTimeModalLabel } from '@/utils/utils'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import IconChevronDownForMuiSelect from '@/components/icon/IconChevronDownForMuiSelect'
import GoogleMapAutoComplete from "@/components/googleMap/GoogleMapAutoComplete"
import Menu from '@mui/material/Menu'
import Popover from '@mui/material/Popover'
import CalendarEventTypeMenu from '@/components/calendar/CalendarEventTypeMenu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import dayjs, { Dayjs } from 'dayjs'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PlaceAutocomplete from "@/components/googleMap/PlaceAutocomplete"
import MapHandler from '@/components/googleMap/MapHandler'
import MapDirection from '@/components/googleMap/MapDirection'
import GoogleMapsLink from "@/components/googleMap/GoogleMapsLink"
import GoogleMapsLinkRoute from "@/components/googleMap/GoogleMapsLinkRoute"
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
  ControlPosition,
  MapControl,
  // GoogleMap,
  // useLoadScript,
} from '@vis.gl/react-google-maps'
import {
  Autocomplete,
  GoogleMap,
  useLoadScript,
} from '@react-google-maps/api'
import '@/styles/googleMap/GoogleMap.scss'

const CalendarEventModal = ({
  modalEventInfo,
  openCalendarEventModal,
  setOpenCalendarEventModal,
  setModalEventInfo,
  onSave,
  allUsers,
  onOpenModal,
  onCloseModal,
  calendarEventTypeMenuList,
  onDeleteModal,
  events,
  isCommerce,
  setIsCommerce,
}: {
  modalEventInfo: EventInfo,
  openCalendarEventModal: boolean,
  setOpenCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>,
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>,
  onSave: () => void,
  allUsers: UserInfo[]
  onOpenModal: (eventInfo?: EventInfo) => void,
  onCloseModal: () => void,
  calendarEventTypeMenuList: EventTypeInfo[],
  onDeleteModal: (id: number) => void,
  events: EventInfo[],
  isCommerce: boolean,
  setIsCommerce: (status: boolean) => void,
}) => {
  library.add(fas, fab)
  const onSaveClick = () => {
    // when click the save button
    onSave()
  }

  // control event type menu
  const [openEventTypeMenu, setOpenEventTypeMenu] = useState<boolean>(false)
  const [allModalUsers, setAllModalUsers] = useState<UserInfo[]>(allUsers)

  // google map
  const [routeIndex, setRouteIndex] = useState<number>(0)
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>()

  useEffect(() => {
    if (!modalEventInfo) {
      return
    }
    const modalUsers = modalEventInfo.users.concat(modalEventInfo.authors)
    setAllModalUsers(Array.from(new Set(allUsers.concat(modalUsers))))
  }, [
    modalEventInfo,
    allUsers,
    setAllModalUsers
  ])

  // on change input, select box
  const onChangeForm = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
      SelectChangeEvent<string> |
      SelectChangeEvent<number[]>,
    fromName: string): void => {
      console.log("event.target.value", event.target.value)
    const eventInfo: EventInfo = { ...modalEventInfo }
    eventInfo[fromName] = event.target.value
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change switch
  const onChangeFormSwitch = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventInfo: EventInfo = { ...modalEventInfo }
    const isAllDay = event.target.checked ? 1 : 0;

    setModalEventInfo({
      ...eventInfo,
      is_all_day: isAllDay,
      end: isAllDay ? eventInfo.end : eventInfo.start,
    })
  }, [modalEventInfo, setModalEventInfo])

  // on change date
  const onChangeFormDate = useCallback((datetime: React.ChangeEvent<Dayjs> | Dayjs, formName: string): void => {
    const eventInfo: EventInfo = { ...modalEventInfo }
    if (!eventInfo.is_all_day && formName === 'start') {
      eventInfo.start = (datetime as Dayjs).toDate()
      const startDate = dayjs(eventInfo.start).format('YYYY-MM-DD')
      const endTime = dayjs(eventInfo.end).format('HH:mm:ss')
      eventInfo.end = dayjs(`${startDate} ${endTime}`).toDate()
    } else {
      eventInfo[formName] = (datetime as Dayjs).toDate()
    }

    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change description
  const onChangeFormDescription = useCallback((description: string): void => {
    const eventInfo: EventInfo = { ...modalEventInfo }
    eventInfo['description'] = description
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change users
  const onChangeFormUsers = useCallback((event: SelectChangeEvent<UserInfo[]>): void => {
    const eventInfo: EventInfo = { ...modalEventInfo }
    const userIds = event.target.value as UserInfo[]
    const addUsers = allModalUsers.filter(user => userIds.includes(user.id))
    const users = Array.from(new Set(eventInfo.users.concat(addUsers)))
    setModalEventInfo({
      ...eventInfo,
      users: users
    })
  }, [modalEventInfo, setModalEventInfo, allModalUsers, allUsers, setAllModalUsers])

  // on change users
  const onDeleteFormUsers = useCallback((userId: number): void => {
    const eventInfo: EventInfo = { ...modalEventInfo }
    const users = modalEventInfo.users.filter((user) => user.id !== userId)
    setModalEventInfo({
      ...eventInfo,
      users: users
    })
  }, [modalEventInfo])


  const onClickEventTypeBtn = useCallback(() => {
    setOpenEventTypeMenu(true)
  }, [openEventTypeMenu, setOpenEventTypeMenu])

  const onCloseEventTypeMenu = useCallback(() => {
    setOpenEventTypeMenu(false)
  }, [openEventTypeMenu, setOpenEventTypeMenu])

  // dynamic class name of the event-number
  const iconLocationClass = (): string => {
    if (!modalEventInfo || typeof modalEventInfo.index !== 'number') return 'none'
    if (numDigits(modalEventInfo.index) === 1) return 'digit1'
    else if (numDigits(modalEventInfo.index) === 2) return 'digit2'
    else if (numDigits(modalEventInfo.index) === 3) return 'digit3'
    else return 'none'
  }

  // create dynamic location pic icon jsx element
  const iconLocationPin = useCallback((): JSX.Element => {
    return <div className='icon-wrapper-location-pin'>
      <FontAwesomeIcon icon={faLocationPin} className={`icon-location-pin ${iconLocationClass()}`} color="#39635E" />
      <div className={`event-number ${iconLocationClass()}`}>{modalEventInfo.index}</div>
    </div>
  }, [modalEventInfo, setModalEventInfo])

  const toolBar = useCallback((): JSX.Element => {
    if (modalEventInfo.id) {
      return <Box sx={{ display: 'flex', width: '100%', marginBottom: '-50px', alignItems: 'center', justifyContent: 'flex-end' }} className="content-user" >
        <IconButton className='tool-bar-icon-btn' onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} className="icon-tool-bar" color="#A2A2A2" />
        </IconButton>
        <IconButton className='tool-bar-icon-btn' onClick={onCopy}>
          <FontAwesomeIcon icon={faCopy} className="icon-tool-bar" color="#A2A2A2" />
        </IconButton>
      </Box>
    }
  }, [modalEventInfo.id, setModalEventInfo])

  const dateFrom = useCallback((): JSX.Element => {
    if (modalEventInfo?.is_all_day) return <DatePicker
      label="From"
      className="mui-customize mui-customize-datetime-picker"
      value={dayjs(modalEventInfo?.start)}
      maxDate={dayjs(modalEventInfo?.end).add(1, 'day')}
      format='D MMM YYYY(ddd)'
      onChange={(datetime) => { onChangeFormDate(datetime, 'start') }}
    />
    else return <DateTimePicker
      label="From"
      className="mui-customize mui-customize-datetime-picker"
      value={dayjs(modalEventInfo?.start)}
      maxDateTime={dayjs(modalEventInfo?.end).add(1, 'day')}
      format='D MMM YYYY(ddd) H:mm'
      onAccept={(datetime) => { onChangeFormDate(datetime, 'start') }}
    />
  }, [modalEventInfo.start, modalEventInfo.end, onChangeFormSwitch, setModalEventInfo])

  const dateTo = useCallback((): JSX.Element => {
    if (modalEventInfo?.is_all_day) return <DatePicker
      label="To"
      value={dayjs(modalEventInfo?.end)}
      minDate={dayjs(modalEventInfo?.start)}
      className="mui-customize mui-customize-datetime-picker"
      format='D MMM YYYY(ddd)'
      onChange={(datetime) => { onChangeFormDate(datetime, 'end') }}
    />
    else return <DateTimePicker
      label="To"
      className="mui-customize mui-customize-datetime-picker"
      value={dayjs(modalEventInfo?.end)}
      minDateTime={dayjs(modalEventInfo?.start)}
      maxDateTime={dayjs(modalEventInfo?.start).endOf('day')}
      format='D MMM YYYY(ddd) H:mm'
      onAccept={(datetime) => { onChangeFormDate(datetime, 'end') }}
    />
  }, [modalEventInfo.start, modalEventInfo.end, onChangeFormSwitch, setModalEventInfo])

  // date time setting area
  const timeLabel = useCallback((): JSX.Element => {
    return <Box sx={{ width: '100%' }}>
      <FormControl sx={{ m: 1, width: '50%' }}>
        <Switch label='All-day' value={Boolean(modalEventInfo?.is_all_day)} name='allDay' onChangeForm={onChangeFormSwitch} />
      </FormControl>
      <Box sx={{ width: '100%' }} className="content-time-label" >
        <FormControl sx={{ m: 1, width: '100%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {dateFrom()}
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {dateTo()}
          </LocalizationProvider>
        </FormControl>
      </Box>
      <FormControl sx={{ m: 1, width: '50%' }}>
        <InputLabel id="modal-time-zone-select-label" className="mui-customize"></InputLabel>
        <Select
          labelId="modal-time-zone-select-label"
          id="modal-time-zone-select"
          className="mui-customize select-box modal-select-box-timezone"
          value={modalEventInfo?.time_zone_name}
          label="time zone"
          size="small"
          IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
          onChange={(e) => { onChangeForm(e, 'time_zone_name') }}
        >
          <MenuItem disabled value="">
            <em>time zone</em>
          </MenuItem>
          {GMT_OPTIONS().map((option) => {
            return (<MenuItem
              key={option.id}
              value={option.value}>
              {`${getCountryFlagSVGByTimeZoneName(option.text)} ${option.text}`}
            </MenuItem>)
          })}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginLeft: '2px', marginTop: '5px' }} className="modal-explain time-zone-datetime-explain" >
        <div className="title-content">In Turkey: 1 Jan 2024 (Mon) 22:00  -  2 Jan 2024 (Mon) 04:00</div>
      </Box>
    </Box>
  }, [modalEventInfo.time_zone_name, onChangeForm])

  const mail = useCallback((): JSX.Element => {
    return <Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
        <FontAwesomeIcon icon={faEnvelope} className="icon-content" color="#A2A2A2" />
        <FormControl sx={{ m: 1, width: '100%' }}>
          <input
            className="mui-customize input title-input"
            onChange={(e) => { onChangeForm(e, 'mail') }}
            placeholder="Add Mail Link"
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginLeft: '28px', marginTop: '5px' }} className="modal-explain" >
        <FontAwesomeIcon icon={faLightbulb} className="icon-content" color="#A2A2A2" size="6x" />
        <div className="text-explain">You can add the reservation mail</div>
      </Box>
    </Box>

  }, [modalEventInfo.emails, onChangeForm, setModalEventInfo])
  const userIcon = useCallback((user: UserInfo): JSX.Element => {
    if (!user.icon_url) return <IconDefaultUser width="25px" height="25px" iconSize="14px" />
    return <Box
      component="img"
      sx={{
        height: '25px',
        width: '25px',
        borderRadius: '50%',
        objectFit: "cover",
      }}
      src={user.icon_url}
    />
  }, [allModalUsers, allUsers, setAllModalUsers])


  const userItems = useCallback((): JSX.Element[] => {
    return allModalUsers.map((user) => {
      if (user) return <MenuItem value={user.id} key={user.id} className="user-select-box">
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }}
          className='title-content-wrapper title-user-content-wrapper'
        >
          {userIcon(user)}
          <div className='title-content title-user-content'>{user.name}</div>
        </Box>
      </MenuItem>
    })
  }, [allModalUsers, allUsers, setAllModalUsers, onChangeFormSwitch, setModalEventInfo])

  const userChip = useCallback((user: UserInfo | undefined): JSX.Element => {
    if (!user) return
    const userIcon = user?.icon_url
    if (!userIcon) return <Chip
      className="mui-customize"
      key={user.id}
      label={user?.name}
      icon={<IconDefaultUser width="25px" height="25px" iconSize="14px" />}
      onDelete={() => { onDeleteFormUsers(user.id) }}
      onMouseDown={(e) => e.stopPropagation()}
    />
    else return <Chip
      className="mui-customize"
      key={user.id}
      label={user?.name}
      avatar={<Avatar alt={user?.name}
        src={user?.icon_url}
      />}
      onDelete={() => { onDeleteFormUsers(user.id) }}
      onMouseDown={(e) => e.stopPropagation()}
    />
  }, [allModalUsers, allUsers, setAllModalUsers, setModalEventInfo])

  const users = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="modal-users-select-label" className="mui-customize"></InputLabel>
          <Select
            labelId="modal-users-select-label"
            id="modal-users-select"
            className="mui-customize select-box modal-select-box"
            value={modalEventInfo?.users}
            label="users"
            size="small"
            multiple
            renderValue={(selectedUser) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedUser.map((user) => (
                  userChip(user)
                ))}
              </Box>
            )}
            IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
            onChange={(e) => { onChangeFormUsers(e) }}
          >
            <MenuItem disabled value="">
              <em>users</em>
            </MenuItem>
            {userItems()}
          </Select>
        </FormControl>
      </Box>
    </Box>
  }, [modalEventInfo.users, allModalUsers, allUsers, setAllModalUsers, setModalEventInfo])

  const photo = useCallback((): JSX.Element => {
    return <Box className="photo" >
      <h3 className="photo-title">Photo</h3>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '10px' }} className="" >
        <FontAwesomeIcon icon={faLightbulb} className="icon-content" color="#A2A2A2" size="6x" />
        <div className="text-explain">You can upload Maximum 5 photos</div>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }} className="photo-list" >
        <Box
          component="img"
          sx={{
            height: '220px',
            width: '48%',
            maxWidth: '500px',
            objectFit: "cover",
          }}
          alt="The image of the travel event"
          src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
          className="photo-item"
        />
        <Box
          sx={{
            height: '220px',
            width: '48%',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="photo-item-add"
        >
          <FontAwesomeIcon icon={faPlus} className="icon-content" color="#A2A2A2" size="lg" />
        </Box>
      </Box>
    </Box>
  }, [setModalEventInfo])

  const closeBtn = useCallback((): JSX.Element => {
    return <div>
      <div className='icon-wrapper-x-mark'>
        <IconButton className='icon-x-mark-btn' onClick={onCloseModal}>
          <FontAwesomeIcon icon={faXmark} className='icon-x-mark' color="#39635E" />
        </IconButton>
      </div>
    </div>
  }, [onCloseModal])

  const saveBtn = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="save-btn-wrapper" >
      <FormControl sx={{ m: 1, maxWidth: '90px', minWidth: '60px' }}>
        <Button variant="contained" size="small" className="mui-customize color-primary" onClick={onSaveClick}>
          Save
        </Button>
      </FormControl>
    </Box>
  }, [onSaveClick])


  const titleInput = useCallback((): JSX.Element => {
    return <FormControl sx={{ m: 1, width: '100%' }}>
      <input
        className="mui-customize input title-input"
        value={modalEventInfo?.title}
        onChange={(e) => { onChangeForm(e, 'title') }}
        placeholder="Add title"
      />
    </FormControl>
  }, [modalEventInfo.title, onChangeForm])

  const googleMapBtn = useCallback((): JSX.Element => {
    if (isCommerce) {
      const position = {
        from: {
          lat: modalEventInfo?.location_from?.google_map_json?.lat,
          lng: modalEventInfo?.location_from?.google_map_json?.lng,
        },
        to: {
          lat: modalEventInfo?.location_to?.google_map_json?.lat,
          lng: modalEventInfo?.location_to?.google_map_json?.lng,
        },
      }
      return <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
      <GoogleMapsLinkRoute
        position={position}
        travelMode={modalEventInfo?.location_from?.google_map_json.travel_mode  || window.google.maps.TravelMode.DRIVING}
        departureTime={modalEventInfo?.start}
      />
    </Box>
    } else {
      return <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
      <GoogleMapsLink
        lat={modalEventInfo?.location?.google_map_json?.lat || null}
        lng={modalEventInfo?.location?.google_map_json?.lng || null}
        departureTime={modalEventInfo?.start}
      />
    </Box>
    }

  }, [
    modalEventInfo.start,
    modalEventInfo.location,
    modalEventInfo.location_from,
    modalEventInfo.location_to,
    setModalEventInfo
  ])

  const calendarEventTypeBtn = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', alignItems: 'center' }} className='title-icon-outer-wrapper'>
      <Button onClick={onClickEventTypeBtn} >
        <div className='title-icon-wrapper' style={{ border: `1.5px solid ${modalEventInfo?.event_type?.color}` }}>
          <FontAwesomeIcon icon={modalEventInfo?.event_type?.icon} className="icon" color={modalEventInfo?.event_type?.color} />
        </div>
        <FontAwesomeIcon icon={['fas', 'chevron-down']} className="icon-chevron-down" color="#A2A2A2" />
      </Button>
    </Box>
  }, [
    modalEventInfo.event_type,
    setModalEventInfo,
    openEventTypeMenu,
    setOpenEventTypeMenu,
    onClickEventTypeBtn,
    calendarEventTypeMenuList,
  ])

  const calendarEventTypeMenu = useCallback((): JSX.Element => {
    return <CalendarEventTypeMenu
      modalEventInfo={modalEventInfo}
      setModalEventInfo={setModalEventInfo}
      setIsCommerce={setIsCommerce}
      openEventTypeMenu={openEventTypeMenu}
      setOpenEventTypeMenu={setOpenEventTypeMenu}
      calendarEventTypeMenuList={calendarEventTypeMenuList}
      setTravelMode={setTravelMode}
    />
  }, [
    modalEventInfo.event_type,
    setModalEventInfo,
    openEventTypeMenu,
    setOpenEventTypeMenu,
    onClickEventTypeBtn,
    calendarEventTypeMenuList,
  ])

  const onCopy = useCallback((): void => {
    setModalEventInfo({
      ...modalEventInfo,
      id: 0,
      title: `${modalEventInfo.title}(2)`
    })
  }, [modalEventInfo, setModalEventInfo])

  const onDelete = useCallback((): void => {
    onDeleteModal(modalEventInfo.id)
  }, [modalEventInfo, setModalEventInfo])

  // Quill toolbar options
  const modules = {
    toolbar: toolbarOptions,
  }

  const defaultCenter = { lat: 35.658584, lng: 139.745433 }
  const [markerRef, marker] = useAdvancedMarkerRef();

  const onClickMarker = (e: google.maps.MapMouseEvent, eventInfo: EventInfo): void => {
    console.log('onClickMarker', e)
    console.log('onClickMarker info', eventInfo)
  }

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  const [selectedStartPlace, setSelectedStartPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  const [selectedEndPlace, setSelectedEndPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  const [isAutoComplete, setIsAutoComplete] =
    useState<boolean>(false)

  const calendarEventsAdvanceMarkers = useCallback((): JSX.Element => {
    return <>{events.map((event) => {
      const position = {
        lat: event.location?.google_map_json?.lat,
        lng: event.location?.google_map_json?.lng
      }
      if (!event.location?.google_map_json?.lat || !event.location?.google_map_json?.lng) {
        return
      }
      const title = event.location.google_map_json.name
      return <AdvancedMarker
        position={position}
        title={title}
        onClick={(e) => { onClickMarker(e, event) }}
        ref={markerRef}
      >
        <div className='google-map-pin'>
          <FontAwesomeIcon className='google-map-pin-icon' icon={faLocationPin} color="#D84949" />
          <div className='google-map-pin-num'>{event.index || 1}</div>
        </div>
      </AdvancedMarker>
    })}</>
  }, [modalEventInfo.location, onClickMarker])

  const advanceMarker = useCallback((): JSX.Element => {
    if (!isAutoComplete && modalEventInfo) {

      const position = {
        lat: modalEventInfo.location?.google_map_json?.lat,
        lng: modalEventInfo.location?.google_map_json?.lng
      }
      if (!modalEventInfo.location?.google_map_json?.lat || !modalEventInfo.location?.google_map_json?.lng) {
        return
      }
      const title = modalEventInfo.location.google_map_json.name
      return <AdvancedMarker
        position={position}
        title={title}
        onClick={(e) => { onClickMarker(e, modalEventInfo) }}
        ref={markerRef}
      >
        <div className='google-map-pin'>
          <FontAwesomeIcon className='google-map-pin-icon' icon={faLocationPin} color="#D84949" />
          <div className='google-map-pin-num'>{modalEventInfo.index || 1}</div>
        </div>
      </AdvancedMarker>
    }
  }, [isAutoComplete, modalEventInfo.location, setModalEventInfo])

  const onSelectTravelMode = useCallback((mode: google.maps.TravelMode) => {
    setTravelMode(mode || window.google.maps.TravelMode.DRIVING)
    const commuteMenuTypes = calendarEventTypeMenuList.find(menu => menu.title === 'Commute')?.childMenus
    let eventTypeItem = commuteMenuTypes.find(typeItem => typeItem.icon === 'car-side')
    switch (mode) {
      case window.google.maps.TravelMode.DRIVING:
        eventTypeItem = commuteMenuTypes.find(typeItem => typeItem.icon === 'car-side')
        break
      case window.google.maps.TravelMode.TRANSIT:
        eventTypeItem = commuteMenuTypes.find(typeItem => typeItem.icon === 'train')
        break
      case window.google.maps.TravelMode.WALKING:
        eventTypeItem = commuteMenuTypes.find(typeItem => typeItem.icon === 'person-walking')
        break
      case window.google.maps.TravelMode.BICYCLING:
        eventTypeItem = commuteMenuTypes.find(typeItem => typeItem.icon === 'bicycle')
        break
    }

    if (eventTypeItem) {
      const updateInfo = {
        ...modalEventInfo,
        event_type: eventTypeItem,
      }
      setModalEventInfo(updateInfo)
    }
  }, [calendarEventTypeMenuList, setModalEventInfo])

  const travelModel = useCallback((): JSX.Element => {
    if (isCommerce) {
      return <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-start' }} className="travel-mode-wrapper" gap={1.5}>
      <IconButton
        className={`travel-mode-icon-btn ${travelMode === google.maps.TravelMode.DRIVING ? 'active' : ''}`}
        onClick={() => onSelectTravelMode(google.maps.TravelMode.DRIVING)}
      >
        <FontAwesomeIcon icon={faCar} className="icon-travel-mode" />
      </IconButton>
      <IconButton
        className={`travel-mode-icon-btn ${travelMode === google.maps.TravelMode.TRANSIT ? 'active' : ''}`}
        onClick={() => onSelectTravelMode(google.maps.TravelMode.TRANSIT)}
      >
        <FontAwesomeIcon icon={faTrain} className="icon-travel-mode" />
      </IconButton>
      <IconButton
        className={`travel-mode-icon-btn ${travelMode === google.maps.TravelMode.WALKING ? 'active' : ''}`}
        onClick={() => onSelectTravelMode(google.maps.TravelMode.WALKING)}
      >
        <FontAwesomeIcon icon={faWalking} className="icon-travel-mode" />
      </IconButton>
      <IconButton
        className={`travel-mode-icon-btn ${travelMode === google.maps.TravelMode.BICYCLING ? 'active' : ''}`}
        onClick={() => onSelectTravelMode(google.maps.TravelMode.BICYCLING)}
      >
        <FontAwesomeIcon icon={faBicycle} className="icon-travel-mode" />
      </IconButton>
    </Box>
    }
  }, [modalEventInfo, onSelectTravelMode])

  const locationInput = useCallback((): JSX.Element => {
    if (isCommerce) {
      return <>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
          <FontAwesomeIcon icon={faCircleDot} className="icon-content icon-circle-dot" color="#EBE8E8" />
          <FormControl sx={{ m: 1, width: '100%' }}>
            <PlaceAutocomplete
              onPlaceSelect={setSelectedStartPlace}
              modalEventInfo={modalEventInfo}
              setModalEventInfo={setModalEventInfo}
              setIsAutoComplete={setIsAutoComplete}
              placeholder="Enter start location"
              type="location_from"
            />
          </FormControl>
        </Box>
        <FontAwesomeIcon icon={faEllipsis} className="icon-content icon-ellipses" color="#A2A2A2" />
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
          <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
          <FormControl sx={{ m: 1, width: '100%' }}>
            <PlaceAutocomplete
              onPlaceSelect={setSelectedEndPlace}
              modalEventInfo={modalEventInfo}
              setModalEventInfo={setModalEventInfo}
              setIsAutoComplete={setIsAutoComplete}
              placeholder="Enter destination"
              type="location_to"
            />
          </FormControl>
        </Box>
      </>
    } else {
      return <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
        <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
        <FormControl sx={{ m: 1, width: '100%' }}>
          <PlaceAutocomplete
            onPlaceSelect={setSelectedPlace}
            modalEventInfo={modalEventInfo}
            setModalEventInfo={setModalEventInfo}
            setIsAutoComplete={setIsAutoComplete}
            type="location"
          />
        </FormControl>
      </Box>
    }
  }, [
    isCommerce,
    modalEventInfo,
    setSelectedPlace,
    setModalEventInfo,
    setIsAutoComplete
  ])

  const description = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="content-user" >
    <FontAwesomeIcon icon={faAlignLeft} className="icon-content" color="#A2A2A2" />
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} >
      <FormControl sx={{ m: 1 }}>
        <ReactQuill
          theme="snow"
          value={modalEventInfo.description}
          onChange={onChangeFormDescription}
          modules={modules}
        />
      </FormControl>
    </Box>
  </Box>
  }, [modalEventInfo.description, modules])

  const mapDirection = useCallback((): JSX.Element => {
    return <MapDirection
      selectedStartPlace={selectedStartPlace}
      selectedEndPlace={selectedEndPlace}
      isCommerce={isCommerce}
      routeIndex={routeIndex}
      setRouteIndex={setRouteIndex}
      routes={routes}
      setRoutes={setRoutes}
      travelMode={travelMode}
      modalEventInfo={modalEventInfo}
      setModalEventInfo={setModalEventInfo}
    />
  }, [
    modalEventInfo.location,
    modalEventInfo.location_from,
    modalEventInfo.location_to,
    modalEventInfo.start,
    travelMode,
    routeIndex,
    isCommerce,
    selectedStartPlace,
    selectedEndPlace,
  ])

  if (openCalendarEventModal) return (
    <Box className='calendar-event-modal'>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div className='calendar-event-modal-content'>
          <div className='google-map-area'>
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
            >
              <Map
                defaultCenter={defaultCenter}
                defaultZoom={9}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
                disableDefaultUI={true}
              >
                {advanceMarker()}
                {calendarEventsAdvanceMarkers()}
                <AdvancedMarker ref={markerRef} position={null} />
                {mapDirection()}
              </Map>
              <MapControl position={ControlPosition.LEFT_TOP}>
                <div className="autocomplete-control">
                  <div className="content">
                    {/* Title Area */}
                    <div className='title-wrapper'>
                      {/* Location Icon*/}
                      {iconLocationPin()}

                      {/* Calendar Event Type Select Button */}
                      {calendarEventTypeBtn()}
                      {calendarEventTypeMenu()}

                      {/* Calendar Event Title Input */}
                      {titleInput()}
                    </div>

                    <div className="content-outer-wrapper">
                      {/* Tool Bar */}
                      {toolBar()}

                      {/* Time Label Area */}
                      {timeLabel()}

                      {/* Location Area*/}
                      <Box>
                        {locationInput()}
                        {travelModel()}

                        {/* Google Map Button */}
                        {googleMapBtn()}
                      </Box>

                      {/* Description Area */}
                      {description()}

                      {/* Mail Area */}
                      {mail()}

                      {/* User Area */}
                      {users()}

                      {/* Photo Area */}
                      {photo()}
                    </div>

                    {/* Save Button */}
                    {saveBtn()}
                  </div>

                </div>
              </MapControl>
              <MapHandler
                place={selectedPlace}
                marker={marker}
                isCommerce={isCommerce}
              />
              {/* Close Button */}
              {closeBtn()}
            </APIProvider>
          </div>
        </div>
      </Box>
    </Box >
  )
}

export default CalendarEventModal