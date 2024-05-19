import { useCallback, useState, useRef } from "react"
import { EventInfo } from '@/types'
import '@/styles/calendar/CalendarEventModal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHotel, faXmark, faLocationPin, faClock, faLocationDot, faUsers, faAlignLeft, faCircleDot, faMapLocationDot, faEnvelope, faLightbulb, faTrashCan, faCopy, faPlus } from "@fortawesome/free-solid-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel } from '@/utils/utils'
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
import { GMT_OPTIONS } from '@/const'
import { getCountryFlagSVGByTimeZoneName } from '@/utils/utils'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import IconChevronDownForMuiSelect from '@/components/icon/IconChevronDownForMuiSelect'
import GoogleMap from "@/components/googleMap/GoogleMap"
import Menu from '@mui/material/Menu'
import Popover from '@mui/material/Popover'
import CalendarEventTypeMenu from '@/components/calendar/CalendarEventTypeMenu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const CalendarEventModal = ({
  eventInfo,
  openCalendarEventModal,
  setOpenCalendarEventModal,
  modalEventTimeZoneName,
  setModalEventTimeZoneName,
  setModalEventInfo,
}: {
  eventInfo: EventInfo,
  openCalendarEventModal: boolean,
  setOpenCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>,
  modalEventTimeZoneName: string,
  setModalEventTimeZoneName: React.Dispatch<React.SetStateAction<string>>,
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>,
}) => {
  library.add(fas, fab)
  const handleOpen = () => setOpenCalendarEventModal(true)
  const handleClose = () => setOpenCalendarEventModal(false)
  const onSaveClick = () => {
    // when click the save button
  }

  // control event type menu
  const [openEventTypeMenu, setOpenEventTypeMenu] = useState<boolean>(false)

  const onClickEventTypeBtn = useCallback(() => {
    console.log('onClickEventTypeBtn')
    setOpenEventTypeMenu(true)
  }, [openEventTypeMenu, setOpenEventTypeMenu])

  const onCloseEventTypeMenu = useCallback(() => {
    setOpenEventTypeMenu(false)
  }, [openEventTypeMenu, setOpenEventTypeMenu])

  const onChangeTimeZone = useCallback((event: SelectChangeEvent): void => {
    setModalEventTimeZoneName(event.target.value as string)
  }, [setModalEventTimeZoneName])

  // dynamic class name of the event-number
  const iconLocationClass = (): string => {
    return 'digit1'
    // if (!eventInfo || !eventInfo.index) return 'none'
    // if (numDigits(eventInfo.index) === 1) return 'digit1'
    // else if (numDigits(eventInfo.index) === 2) return 'digit2'
    // else if (numDigits(eventInfo.index) === 3) return 'digit3'
    // else return 'none'
  }

  // create dynamic location pic icon jsx element
  const iconLocationPin = useCallback((): JSX.Element => {
    return <div className='icon-wrapper-location-pin'>
      <FontAwesomeIcon icon={faLocationPin} className={`icon-location-pin ${iconLocationClass()}`} color="#39635E" />
      <div className={`event-number ${iconLocationClass()}`}>3</div>
    </div>
  }, [eventInfo])

  const toolBar = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', marginBottom: '-50px', alignItems: 'center', justifyContent: 'flex-end' }} className="content-user" >
      <IconButton className='tool-bar-icon-btn'>
        <FontAwesomeIcon icon={faTrashCan} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
      <IconButton className='tool-bar-icon-btn'>
        <FontAwesomeIcon icon={faCopy} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
    </Box>
  }, [eventInfo])

  // event menu control

  const title = useCallback((): JSX.Element => {
    return <div className='title-wrapper'>
      {iconLocationPin()}
      <Box sx={{ display: 'flex', alignItems: 'center' }} className='title-icon-outer-wrapper'>
        <Button onClick={onClickEventTypeBtn} >
          <div className='title-icon-wrapper'>
            <FontAwesomeIcon icon={faHotel} className="icon" color="#39635E" />
          </div>
          <FontAwesomeIcon icon={['fas', 'chevron-down']} className="icon-chevron-down" color="#A2A2A2" />
        </Button>
      </Box>
      <CalendarEventTypeMenu
        eventInfo={eventInfo}
        setModalEventInfo={setModalEventInfo}
        openEventTypeMenu={openEventTypeMenu}
        setOpenEventTypeMenu={setOpenEventTypeMenu}
      />
      <FormControl sx={{ m: 1, width: '100%' }}>
        <TextField className="title-input" label="Title" variant="standard" placeholder="Add title" />
      </FormControl>
    </div>
  }, [eventInfo,
    setModalEventInfo,
    openEventTypeMenu,
    setOpenEventTypeMenu,
    onClickEventTypeBtn
  ])

  const timeLabel = useCallback((): JSX.Element => {
    return <Box sx={{ width: '100%' }}>
      <FormControl sx={{ m: 1, width: '50%' }}><Switch label='All-day' /></FormControl>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }} className="content-user" >
        <FormControl sx={{ m: 1, width: '100%' }}>
          <TextField id="outlined-basic" label="Search Plan" className="mui-customize" size="small" />
        </FormControl>
        <span>-</span>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <TextField id="outlined-basic" label="Search Plan" className="mui-customize" size="small" />
        </FormControl>
      </Box>
      <FormControl sx={{ m: 1, width: '50%' }}>
        <InputLabel id="modal-time-zone-select-label" className="mui-customize"></InputLabel>
        <Select
          labelId="modal-time-zone-select-label"
          id="modal-time-zone-select"
          className="mui-customize select-box modal-select-box-timezone"
          value={modalEventTimeZoneName}
          label="time zone"
          size="small"
          IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
          onChange={onChangeTimeZone}
        >
          <MenuItem disabled value="">
            <em>time zone</em>
          </MenuItem>
          {GMT_OPTIONS().map((option) => {
            return (<MenuItem key={option.id} value={option.value}>{`${getCountryFlagSVGByTimeZoneName(option.text)} ${option.text}`}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginLeft: '2px', marginTop: '5px' }} className="modal-explain time-zone-datetime-explain" >
        <div className="title-content">In Turkey: 1 Jan 2024 (Mon) 22:00  -  2 Jan 2024 (Mon) 04:00</div>
      </Box>
    </Box>
  }, [eventInfo])

  const description = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="content-user" >
      <FontAwesomeIcon icon={faAlignLeft} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} className="" >
        <FormControl sx={{ m: 1, width: '100%' }}>
          <Textarea label='Description' placeholder='Add Description' />
        </FormControl>
      </Box>
    </Box>
  }, [eventInfo])

  const mail = useCallback((): JSX.Element => {
    return <Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
        <FontAwesomeIcon icon={faEnvelope} className="icon-content" color="#A2A2A2" />
        <FormControl sx={{ m: 1, width: '100%' }}>
          <TextField id="outlined-basic" label="Add Mail Link" className="mui-customize" size="small" />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginLeft: '28px', marginTop: '5px' }} className="modal-explain" >
        <FontAwesomeIcon icon={faLightbulb} className="icon-content" color="#A2A2A2" size="6x" />
        <div className="text-explain">You can add the reservation mail</div>
      </Box>
    </Box>

  }, [eventInfo])

  const users = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} className="" >
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="modal-users-select-label" className="mui-customize"></InputLabel>
          <Select
            labelId="modal-users-select-label"
            id="modal-users-select"
            className="mui-customize select-box modal-select-box"
            value={modalEventTimeZoneName}
            label="users"
            size="small"
            IconComponent={(props) => (<IconChevronDownForMuiSelect props={props} />)}
            onChange={onChangeTimeZone}
          >
            <MenuItem disabled value="">
              <em>users</em>
            </MenuItem>
            {GMT_OPTIONS().map((option) => {
              return (<MenuItem key={option.id} value={option.value}>{`${option.text}`}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  }, [eventInfo])

  const photo = useCallback((): JSX.Element => {
    return <Box className="photo" >
      <h3 className="photo-title">Photo</h3>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: '10px' }} className="" >
        <FontAwesomeIcon icon={faLightbulb} className="icon-content" color="#A2A2A2" size="6x" />
        <div className="text-explain">You upload Maximum 5 photos</div>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }} className="photo-list" >
        <Box
          component="img"
          sx={{
            height: '220px',
            width: '48%',
            maxWidth: '500px',
          }}
          alt="The house from the offer."
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
  }, [eventInfo])

  const content = useCallback((): JSX.Element => {
    return <>
      {toolBar()}
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
        <FontAwesomeIcon icon={faClock} className="icon-content" color="#A2A2A2" />
        {timeLabel()}
      </Box>

      {/* location */}
      <Box className="" >
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
          <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
          <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField id="outlined-basic" label="Search Place" className="mui-customize" size="small" />
          </FormControl>
        </Box>
        {/* location button */}
        <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
          <Button className='map-location-btn mui-customize' variant="contained" size="small">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className="" >
              <FontAwesomeIcon icon={faMapLocationDot} className="icon-map-location" color="#A2A2A2" />
              <div className='title-map-location'>Open Google Map</div>
            </Box>
          </Button>
        </Box>
      </Box>

      {description()}
      {mail()}
      {users()}
      {photo()}
    </>
  }, [eventInfo])

  const closeBtn = useCallback((): JSX.Element => {
    return <div>
      <div className='icon-wrapper-x-mark'>
        <IconButton className='icon-x-mark-btn' onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} className='icon-x-mark' color="#39635E" />
        </IconButton>
      </div>
    </div>
  }, [eventInfo])

  const saveBtn = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="save-btn-wrapper" >
      <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
        <Button variant="contained" size="small" className="mui-customize color-primary" onClick={onSaveClick}>
          Save
        </Button>
      </FormControl>
    </Box>
  }, [eventInfo])

  const EventModal = useCallback((): JSX.Element => {
    return <>
      <Modal
        open={openCalendarEventModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='calendar-event-modal'
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          <div className='calendar-event-modal-content'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '65%' }}>
              <div className="content">
                {title()}
                <div className="content-outer-wrapper">
                  {content()}
                </div>
                {saveBtn()}
              </div>
              {closeBtn()}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '35%' }}>
              <GoogleMap />
            </Box>
          </div>
        </Box>
      </Modal>
    </>

  }, [eventInfo, openCalendarEventModal, handleClose, openEventTypeMenu])
  return (
    <EventModal />
  )
}

export default CalendarEventModal