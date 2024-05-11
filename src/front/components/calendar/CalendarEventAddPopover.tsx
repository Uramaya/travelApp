import { useCallback } from "react"
import { EventInfo } from '@/types'
import '@/styles/calendar/CalendarEventPopover.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHotel, faXmark, faLocationPin, faClock, faLocationDot, faUsers, faCopy, faPen, faTrashCan, faCircleDot, faMapLocationDot, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { numDigits, getCalendarEventPopoverTimeLabel } from '@/utils/utils'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconDefaultUser from '@/components/icon/IconDefaultUser'

const CalendarEventAddPopover = ({ className, eventInfo }: { className: string, eventInfo: EventInfo }) => {
  // // dynamic class name of the event-number
  // const iconLocationClass = (): string => {
  //   if (!eventInfo || !eventInfo.index) return 'none'
  //   if (numDigits(eventInfo.index) === 1) return 'digit1'
  //   else if (numDigits(eventInfo.index) === 2) return 'digit2'
  //   else if (numDigits(eventInfo.index) === 3) return 'digit3'
  //   else return 'none'
  // }

  // // create dynamic location pic icon jsx element
  // const iconLocationPin = useCallback((): JSX.Element => {
  //   return <div className='icon-wrapper-location-pin'>
  //     <FontAwesomeIcon icon={faLocationPin} className={`icon-location-pin ${iconLocationClass()}`} color="#39635E" />
  //     <div className={`event-number ${iconLocationClass()}`}>{eventInfo.index}</div>
  //   </div>
  // }, [eventInfo])

  // const title = useCallback((): JSX.Element => {
  //   return <div className='title-wrapper'>
  //     <div className='title-icon-wrapper'>
  //       <FontAwesomeIcon icon={faHotel} className="icon" color="#39635E" />
  //     </div>
  //     <div className='title'>{eventInfo.title}</div>
  //   </div>
  // }, [eventInfo])

  // const timeLabel = useCallback((): JSX.Element => {
  //   if (eventInfo.allDay) return <div>
  //     <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.allDay)}`}</div>
  //   </div>
  //   else return <div>
  //     <div className='title-content'>{`${getCalendarEventPopoverTimeLabel(eventInfo.start, eventInfo.allDay)} - `}</div>
  //     <div className='title-content'>{getCalendarEventPopoverTimeLabel(eventInfo.end, eventInfo.allDay)}</div>
  //   </div>
  // }, [eventInfo])

  // const users = useCallback((): JSX.Element => {
  //   if (!eventInfo.users.length) return <></>
  //   if (eventInfo.users.length < 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
  //     <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
  //     <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} className="" >
  //       {eventInfo.users.map((user) => {
  //         return <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
  //           <IconDefaultUser width="25px" height="25px" iconSize="14px" />
  //           <div className='title-content title-user-content'>{user.name}</div>
  //         </Box>
  //       })}
  //     </Box>
  //   </Box>
  //   if (eventInfo.users.length >= 4) return <Box sx={{ display: 'flex', width: '100%' }} className="content-user" >
  //     <FontAwesomeIcon icon={faUsers} className="icon-content" color="#A2A2A2" />
  //     <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column' }} className="" >
  //       {eventInfo.users.slice(0, 3).map((user) => {
  //         return <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className='title-content-wrapper title-user-content-wrapper' >
  //           <IconDefaultUser width="25px" height="25px" iconSize="14px" />
  //           <div className='title-content title-user-content'>{user.name}</div>
  //         </Box>
  //       })}
  //       <IconButton className='tool-bar-icon-btn'>
  //         <FontAwesomeIcon icon={faEllipsis} className="icon-more-user" color="#A2A2A2" />
  //       </IconButton>
  //     </Box>
  //   </Box>
  // }, [eventInfo])

  // const content = useCallback((): JSX.Element => {
  //   return <>
  //     {/* time */}
  //     <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
  //       <FontAwesomeIcon icon={faClock} className="icon-content" color="#A2A2A2" />
  //       {timeLabel()}
  //     </Box>

  //     {/* location */}
  //     <Box className="" >
  //       <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }} className="" >
  //         <FontAwesomeIcon icon={faLocationDot} className="icon-content" color="#A2A2A2" />
  //         <div className='title-content'>{eventInfo.location}</div>
  //       </Box>
  //       {/* location button */}
  //       <Box sx={{ mt: '10px', display: 'flex', width: '100%', justifyContent: 'flex-end' }} className="" >
  //         <Button className='map-location-btn mui-customize' variant="contained" size="small">
  //           <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }} className="" >
  //             <FontAwesomeIcon icon={faMapLocationDot} className="icon-map-location" color="#A2A2A2" />
  //             <div className='title-map-location'>Open Google Map</div>
  //           </Box>
  //         </Button>
  //       </Box>
  //     </Box>

  //     {/* users */}
  //     {users()}
  //   </>
  // }, [eventInfo])

  // const closeBtn = useCallback((): JSX.Element => {
  //   return <div>
  //     <div className='icon-wrapper-x-mark'>
  //       <IconButton className='icon-x-mark-btn'>
  //         <FontAwesomeIcon icon={faXmark} className='icon-x-mark' color="#39635E" />
  //       </IconButton>
  //     </div>
  //   </div>
  // }, [eventInfo])

  // const toolBar = useCallback((): JSX.Element => {
  //   return <div className='tool-bar-wrapper'>
  //     <IconButton className='tool-bar-icon-btn'>
  //       <FontAwesomeIcon icon={faTrashCan} className="icon-tool-bar" color="#A2A2A2" />
  //     </IconButton>
  //     <IconButton className='tool-bar-icon-btn'>
  //       <FontAwesomeIcon icon={faCopy} className="icon-tool-bar" color="#A2A2A2" />
  //     </IconButton>
  //     <IconButton className='tool-bar-icon-btn'>
  //       <FontAwesomeIcon icon={faPen} className="icon-tool-bar" color="#A2A2A2" />
  //     </IconButton>
  //   </div>
  // }, [eventInfo])

  const Popover = useCallback((): JSX.Element => {
    return <>
      {/* {iconLocationPin()}
      <div className={`calendar-event-popover ${className}`}>
        <div className="content">
          {title()}
          <div className="content-outer-wrapper">
            {content()}
          </div>
          {toolBar()}
        </div>

      </div>
      {closeBtn()} */}
      add popover test
    </>

  }, [className])
  return (
    <Popover />
  )
}

export default CalendarEventAddPopover