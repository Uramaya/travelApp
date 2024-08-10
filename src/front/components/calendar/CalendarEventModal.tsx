import { useCallback, useState, useRef, useEffect } from "react"
import { EventInfo, EventInfoKeys, UserInfo, EventTypeInfo } from '@/types'
import '@/styles/calendar/CalendarEventModal.scss'
import '@/styles/Quill.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationPin, faClock, faLocationDot, faUsers, faAlignLeft, faCircleDot, faMapLocationDot, faEnvelope, faLightbulb, faTrashCan, faCopy, faPlus } from "@fortawesome/free-solid-svg-icons"
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
import GoogleMap from "@/components/googleMap/GoogleMap"
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
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import 'react-quill/dist/quill.snow.css'

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
}) => {
  library.add(fas, fab)
  const onSaveClick = () => {
    // when click the save button
    onSave()
  }

  // control event type menu
  const [openEventTypeMenu, setOpenEventTypeMenu] = useState<boolean>(false)

  // on change input, select box
  const onChangeForm = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
      SelectChangeEvent<string> |
      SelectChangeEvent<number[]>,
    fromName: string): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
    eventInfo[fromName] = event.target.value
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change switch
  const onChangeFormSwitch = useCallback((event: React.ChangeEvent<HTMLInputElement>, fromName: string): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
    eventInfo[fromName] = event.target.checked
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change date
  const onChangeFormDate = useCallback((datetime: React.ChangeEvent<Dayjs> | Dayjs, fromName: string): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
    eventInfo[fromName] = (datetime as Dayjs).toDate()
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change description
  const onChangeFormDescription = useCallback((description: string): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
    eventInfo['description'] = description
    setModalEventInfo({ ...eventInfo })
  }, [modalEventInfo, setModalEventInfo])

  // on change users
  const onChangeFormUsers = useCallback((event: SelectChangeEvent<UserInfo[]>): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
    const users = event.target.value as UserInfo[]
    setModalEventInfo({
      ...eventInfo,
      users: users
    })
  }, [modalEventInfo, setModalEventInfo])

  // on change users
  const onDeleteFormUsers = useCallback((userId: number): void => {
    const eventInfo: EventInfo = {...modalEventInfo}
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
  }, [modalEventInfo])

  const toolBar = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', marginBottom: '-50px', alignItems: 'center', justifyContent: 'flex-end' }} className="content-user" >
      <IconButton className='tool-bar-icon-btn'>
        <FontAwesomeIcon icon={faTrashCan} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
      <IconButton className='tool-bar-icon-btn'>
        <FontAwesomeIcon icon={faCopy} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
    </Box>
  }, [modalEventInfo])

  const dateFrom = useCallback((): JSX.Element => {
    if (modalEventInfo?.is_all_day) return <DatePicker
      label="From"
      className="mui-customize mui-customize-datetime-picker"
      value={dayjs(modalEventInfo?.start)}
      maxDate={dayjs(modalEventInfo?.end)}
      format='D MMM YYYY(ddd)'
      onChange={(datetime) => { onChangeFormDate(datetime, 'start') }}
    />
    else return <DateTimePicker
      label="From"
      className="mui-customize mui-customize-datetime-picker"
      value={dayjs(modalEventInfo?.start)}
      maxDateTime={dayjs(modalEventInfo?.end)}
      format='D MMM YYYY(ddd) H:mm'
      onAccept={(datetime) => { onChangeFormDate(datetime, 'start') }}
    />
  }, [modalEventInfo, onChangeFormSwitch, setModalEventInfo])

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
      format='D MMM YYYY(ddd) H:mm'
      onAccept={(datetime) => { onChangeFormDate(datetime, 'end') }}
    />
  }, [modalEventInfo, onChangeFormSwitch, setModalEventInfo])

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
          onChange={(e) => { onChangeForm(e, 'timeZoneName') }}
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
  }, [modalEventInfo, onChangeFormSwitch, setModalEventInfo])

  const mail = useCallback((): JSX.Element => {
    return <Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
        <FontAwesomeIcon icon={faEnvelope} className="icon-content" color="#A2A2A2" />
        <FormControl sx={{ m: 1, width: '100%' }}>
          <TextField
            label="Add Mail Link"
            className="mui-customize"
            size="small"
            onChange={(e) => { onChangeForm(e, 'mail') }}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', marginLeft: '28px', marginTop: '5px' }} className="modal-explain" >
        <FontAwesomeIcon icon={faLightbulb} className="icon-content" color="#A2A2A2" size="6x" />
        <div className="text-explain">You can add the reservation mail</div>
      </Box>
    </Box>

  }, [modalEventInfo])
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
  }, [modalEventInfo])

  const userItems = useCallback((): JSX.Element[] => {
    if (!allUsers) return
    return allUsers.map((user) => {
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
  }, [modalEventInfo])

  const userChip = useCallback((user: UserInfo | undefined): JSX.Element => {
    if(!user) return
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
  }, [modalEventInfo])

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
  }, [modalEventInfo])

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
  }, [modalEventInfo])

  const closeBtn = useCallback((): JSX.Element => {
    return <div>
      <div className='icon-wrapper-x-mark'>
        <IconButton className='icon-x-mark-btn' onClick={onCloseModal}>
          <FontAwesomeIcon icon={faXmark} className='icon-x-mark' color="#39635E" />
        </IconButton>
      </div>
    </div>
  }, [modalEventInfo])

  const saveBtn = useCallback((): JSX.Element => {
    return <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="save-btn-wrapper" >
      <FormControl sx={{ m: 1, width: '10%', maxWidth: '90px', minWidth: '60px' }}>
        <Button variant="contained" size="small" className="mui-customize color-primary" onClick={onSaveClick}>
          Save
        </Button>
      </FormControl>
    </Box>
  }, [modalEventInfo])

  // Quill toolbar options
  const modules = {
    toolbar: toolbarOptions,
  }

  if (openCalendarEventModal) return (
    <Box className='calendar-event-modal'>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div className='calendar-event-modal-content'>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '65%' }}>
            <div className="content">

              {/* Title Area */}
              <div className='title-wrapper'>
                {/* Location Icon*/}
                {iconLocationPin()}

                {/* Calendar Event Type Select Button */}
                <Box sx={{ display: 'flex', alignItems: 'center' }} className='title-icon-outer-wrapper'>
                  <Button onClick={onClickEventTypeBtn} >
                    <div className='title-icon-wrapper' style={{ border: `1.5px solid ${modalEventInfo?.event_type?.color}` }}>
                      <FontAwesomeIcon icon={modalEventInfo?.event_type?.icon} className="icon" color={modalEventInfo?.event_type?.color} />
                    </div>
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} className="icon-chevron-down" color="#A2A2A2" />
                  </Button>
                </Box>

                {/* Calendar Event Type Select Menu */}
                <CalendarEventTypeMenu
                  modalEventInfo={modalEventInfo}
                  setModalEventInfo={setModalEventInfo}
                  openEventTypeMenu={openEventTypeMenu}
                  setOpenEventTypeMenu={setOpenEventTypeMenu}
                  calendarEventTypeMenuList={calendarEventTypeMenuList}
                />
                {/* Calendar Event Title Input */}
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <TextField
                    className="title-input"
                    label="Title"
                    variant="standard"
                    placeholder="Add title"
                    value={modalEventInfo?.title}
                    onChange={(e) => { onChangeForm(e, 'title') }}
                  />
                </FormControl>
              </div>


              <div className="content-outer-wrapper">
                {/* Tool Bar */}
                {toolBar()}

                {/* Time Label Area */}
                {timeLabel()}

                {/* Location Area*/}
                <Box>
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="" >
                    <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
                    <FormControl sx={{ m: 1, width: '100%' }}>
                      <TextField
                        label="Search Place"
                        className="mui-customize"
                        size="small"
                        value={modalEventInfo?.location}
                        onChange={(e) => { onChangeForm(e, 'location') }}
                      />
                    </FormControl>
                  </Box>


                  {/* Google Map Button */}
                  <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
                    <Button className='map-location-btn mui-customize' variant="contained" size="small">
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className="" >
                        <FontAwesomeIcon icon={faMapLocationDot} className="icon-map-location" color="#A2A2A2" />
                        <div className='title-map-location'>Open Google Map</div>
                      </Box>
                    </Button>
                  </Box>
                </Box>

                {/* Description Area */}
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'baseline' }} className="content-user" >
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

            {/* Close Button */}
            {closeBtn()}
          </Box>

          {/* Google Map Area */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '35%' }}>
            <GoogleMap />
          </Box>
        </div>
      </Box>
    </Box>
  )
}

export default CalendarEventModal