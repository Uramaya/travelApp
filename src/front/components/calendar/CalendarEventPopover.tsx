import { useCallback } from "react"
import { EventInfo, UserInfo } from '@/types'
import '@/styles/calendar/CalendarEventPopover.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHotel, faXmark, faLocationPin, faClock, faLocationDot, faUsers, faCopy, faPen, faTrashCan, faCircleDot, faMapLocationDot, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel, getUserInfoById } from '@/utils/utils'
import { All_USERS } from '@/const'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconDefaultUser from '@/components/icon/IconDefaultUser'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { getPopOverLocationLabel } from '@/utils/utils'
import GoogleMapsLink from "@/components/googleMap/GoogleMapsLink"
import GoogleMapsLinkRoute from "@/components/googleMap/GoogleMapsLinkRoute"

const CalendarEventPopover = ({ 
  eventInfo,
  onEditPopover,
  onCopyPopover,
  onDeletePopover,
  onClosePopover,
  isCommerce,
}: { 
  eventInfo: EventInfo,
  onEditPopover: any,
  onCopyPopover: any,
  onDeletePopover: any,
  onClosePopover: any,
  isCommerce: boolean,
}) => {
  library.add(fas, fab)

  const onEdit = (): void => {
    onClosePopover()
    onEditPopover(eventInfo)
  }

  const onCopy = (): void => {
    onClosePopover()
    onCopyPopover(eventInfo)
  }

  const onDelete = (): void => {
    onDeletePopover(eventInfo.id)
  }

  // dynamic class name of the event-number
  const iconLocationClass = (): string => {
    if (!eventInfo || !eventInfo.index) return 'none'
    if (numDigits(eventInfo.index) === 1) return 'digit1'
    else if (numDigits(eventInfo.index) === 2) return 'digit2'
    else if (numDigits(eventInfo.index) === 3) return 'digit3'
    else return 'none'
  }

  // create dynamic location pic icon jsx element
  const iconLocationPin = useCallback((): JSX.Element => {
    return <div className='icon-wrapper-location-pin'>
      <FontAwesomeIcon icon={faLocationPin} className={`icon-location-pin ${iconLocationClass()}`} color="#39635E" />
      <div className={`event-number ${iconLocationClass()}`}>{eventInfo.index}</div>
    </div>
  }, [eventInfo])

  const title = useCallback((): JSX.Element => {
    return <div className='title-wrapper'>
      <div className='title-icon-wrapper' style={{ border: `1.5px solid ${eventInfo?.event_type?.color}` }}>
        <FontAwesomeIcon icon={eventInfo?.event_type?.icon} className="icon" color={eventInfo?.event_type?.color} />
      </div>
      <div className='title' style={{ color: `${eventInfo?.event_type?.color}` }}>{eventInfo.title}</div>
    </div>
  }, [eventInfo])

  const timeLabel = useCallback((): JSX.Element => {
    if (eventInfo.is_all_day) return <div>
      <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.is_all_day)}`}</div>
    </div>
    else return <div>
      <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.is_all_day)} - `}</div>
      <div className='title-content'>{getCalendarEventPopoverTimeLabel(eventInfo.end, eventInfo.is_all_day)}</div>
    </div>
  }, [eventInfo])

  const userChip = useCallback((user: UserInfo): JSX.Element => {
    if (!user) {
      return <></>
    }
    const userIcon = user.icon_url
    if (!userIcon) return <Chip
      className="mui-customize"
      key={user.id}
      label={user.name}
      icon={<IconDefaultUser width="25px" height="25px" iconSize="14px" />}
      onMouseDown={(e) => e.stopPropagation()}
    /> 
    else return <Chip
      className="mui-customize"
      key={user.id}
      label={user.name}
      avatar={<Avatar alt={user.name}
        src={user.icon_url}
      />}
      onMouseDown={(e) => e.stopPropagation()}
    />
  }, [eventInfo])

  const users = useCallback((): JSX.Element => {
    if (!eventInfo.users.length) return <></>
    if (eventInfo.users.length < 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} >
        {eventInfo.users.map((user) => {
          return <Box key={user.id} sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
            {userChip(user)}
          </Box>
        })}
      </Box>
    </Box>
    if (eventInfo.users.length >= 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} >
        {eventInfo.users.slice(0, 3).map((user) => {
          return <Box key={user.id} sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
            {userChip(user)}
          </Box>
        })}
        <IconButton className='tool-bar-icon-btn'>
          <FontAwesomeIcon icon={faEllipsis} className="icon-more-user" color="#A2A2A2" />
        </IconButton>
      </Box>
    </Box>
  }, [eventInfo])

  const googleMapBtn = useCallback((): JSX.Element => {
    if (eventInfo?.event_type.type === 'commute') {
      const position = {
        from: {
          lat: eventInfo?.location_from?.google_map_json?.lat,
          lng: eventInfo?.location_from?.google_map_json?.lng,
        },
        to: {
          lat: eventInfo?.location_to?.google_map_json?.lat,
          lng: eventInfo?.location_to?.google_map_json?.lng,
        },
      }
      return <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
      <GoogleMapsLinkRoute
        position={position}
        travelMode={eventInfo?.location_from?.google_map_json.travel_mode  || window.google.maps.TravelMode.DRIVING}
        departureTime={eventInfo?.start}
      />
    </Box>
    } else {
      return <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
      <GoogleMapsLink
        lat={eventInfo?.location?.google_map_json?.lat || null}
        lng={eventInfo?.location?.google_map_json?.lng || null}
        departureTime={eventInfo?.start}
      />
    </Box>
    }

  }, [eventInfo])

  const locationLabel = useCallback((): JSX.Element => {
    if (eventInfo?.event_type.type === 'commute') {
      return <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
          <FontAwesomeIcon icon={faCircleDot} className="icon-content icon-circle-dot" color="#EBE8E8" />
          <div className='title-content'>{getPopOverLocationLabel(eventInfo.location_from)}</div>
        </Box>
        <FontAwesomeIcon icon={faEllipsis} className="icon-content icon-ellipses icon-route-ellipses" color="#A2A2A2" />
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
          <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
          <div className='title-content'>{getPopOverLocationLabel(eventInfo.location_to)}</div>
        </Box>
      </>
    } else {
      return <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
      <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
      <div className='title-content'>{getPopOverLocationLabel(eventInfo.location)}</div>
    </Box>
    }
  }, [eventInfo, getPopOverLocationLabel])

  const content = useCallback((): JSX.Element => {
    return <>
      {/* time */}
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
        <FontAwesomeIcon icon={faClock} className="icon-content" color="#A2A2A2" />
        {timeLabel()}
      </Box>

      {/* location */}
      <Box>
        {locationLabel()}
        {/* location button */}
        <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
        {googleMapBtn()}
        </Box>
      </Box>

      {/* users */}
      {users()}
    </>
  }, [eventInfo])

  const closeBtn = useCallback((): JSX.Element => {
    return <div>
      <div className='icon-wrapper-x-mark'>
        <IconButton className='icon-x-mark-btn' onClick={onClosePopover}>
          <FontAwesomeIcon icon={faXmark} className='icon-x-mark' color="#39635E"/>
        </IconButton>
      </div>
    </div>
  }, [eventInfo])

  const toolBar = useCallback((): JSX.Element => {
    return <div className='tool-bar-wrapper'>
      <IconButton className='tool-bar-icon-btn' onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashCan} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
      <IconButton className='tool-bar-icon-btn' onClick={onCopy}>
        <FontAwesomeIcon icon={faCopy} className="icon-tool-bar" color="#A2A2A2" />
      </IconButton>
      <IconButton className='tool-bar-icon-btn' onClick={onEdit}>
        <FontAwesomeIcon icon={faPen} className="icon-tool-bar" color="#A2A2A2"/>
      </IconButton>
    </div>
  }, [eventInfo])

  const Popover = useCallback((): JSX.Element => {
    return <>
      {iconLocationPin()}
      <div className='calendar-event-popover'>
        <div className="content">
          {title()}
          <div className="content-outer-wrapper">
            {content()}
          </div>
          {toolBar()}
        </div>

      </div>
      {closeBtn()}
    </>

  }, [eventInfo])
  return (
    <Popover />
  )
}

export default CalendarEventPopover