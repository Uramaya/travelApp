import { useCallback } from "react"
import { EventInfo, UserInfo } from '@/types'
import '@/styles/calendar/CalendarEventPopover.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHotel, faXmark, faLocationPin, faClock, faLocationDot, faUsers, faCopy, faPen, faTrashCan, faCircleDot, faMapLocationDot, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel, getUSerInfoById } from '@/utils/utils'
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

const CalendarEventPopover = ({ 
  eventInfo,
  onEditPopover,
  onCopyPopover,
  onDeletePopover,
  onClosePopover,
}: { 
  eventInfo: EventInfo,
  onEditPopover: any,
  onCopyPopover: any,
  onDeletePopover: any,
  onClosePopover: any
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
    onDeletePopover(eventInfo)
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
      <div className='title-icon-wrapper' style={{ border: `1.5px solid ${eventInfo?.eventType?.color}` }}>
        <FontAwesomeIcon icon={eventInfo?.eventType?.icon} className="icon" color={eventInfo?.eventType?.color} />
      </div>
      <div className='title' style={{ color: `${eventInfo?.eventType?.color}` }}>{eventInfo.title}</div>
    </div>
  }, [eventInfo])

  const timeLabel = useCallback((): JSX.Element => {
    if (eventInfo.allDay) return <div>
      <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.allDay)}`}</div>
    </div>
    else return <div>
      <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.allDay)} - `}</div>
      <div className='title-content'>{getCalendarEventPopoverTimeLabel(eventInfo.end, eventInfo.allDay)}</div>
    </div>
  }, [eventInfo])

  const getModalUserInfo = (userId: number): UserInfo | undefined => {
    return getUSerInfoById(userId, All_USERS)
  }

  const userChip = useCallback((userId: number): JSX.Element => {
    const userInfo = getModalUserInfo(userId)
    if(!userInfo) return
    const userIcon = userInfo?.icon
    if (!userIcon) return <Chip
      className="mui-customize"
      key={userId}
      label={userInfo?.name}
      icon={<IconDefaultUser width="25px" height="25px" iconSize="14px" />}
      onMouseDown={(e) => e.stopPropagation()}
    /> 
    else return <Chip
      className="mui-customize"
      key={userId}
      label={userInfo?.name}
      avatar={<Avatar alt={userInfo?.name}
        src={userInfo?.icon}
      />}
      onMouseDown={(e) => e.stopPropagation()}
    />
  }, [eventInfo])

  const users = useCallback((): JSX.Element => {
    if (!eventInfo.userIds.length) return <></>
    if (eventInfo.userIds.length < 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} >
        {eventInfo.userIds.map((userId) => {
          return <Box key={userId} sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
            {userChip(userId)}
          </Box>
        })}
      </Box>
    </Box>
    if (eventInfo.userIds.length >= 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
      <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} >
        {eventInfo.userIds.slice(0, 3).map((userId) => {
          return <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
            {userChip(userId)}
          </Box>
        })}
        <IconButton className='tool-bar-icon-btn'>
          <FontAwesomeIcon icon={faEllipsis} className="icon-more-user" color="#A2A2A2" />
        </IconButton>
      </Box>
    </Box>
  }, [eventInfo])

  const content = useCallback((): JSX.Element => {
    return <>
      {/* time */}
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
        <FontAwesomeIcon icon={faClock} className="icon-content" color="#A2A2A2" />
        {timeLabel()}
      </Box>

      {/* location */}
      <Box>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
          <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
          <div className='title-content'>{eventInfo.location}</div>
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