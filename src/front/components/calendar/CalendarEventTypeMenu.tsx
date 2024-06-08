import { useCallback, useState } from "react"
import { EventInfo, EventTypeInfo } from '@/types'
import '@/styles/calendar/CalendarEventTypeMenu.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { } from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { CALENDAR_EVENT_TYPE_MENU } from '@/const/calendarEventTypeMenu'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'


const CalendarEventTypeMenu = ({
  modalEventInfo,
  setModalEventInfo,
  openEventTypeMenu,
  setOpenEventTypeMenu,
}: {
  modalEventInfo: EventInfo,
  setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>,
  openEventTypeMenu: boolean,
  setOpenEventTypeMenu: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  library.add(fas, fab)
  // control child event type menu
  const [openChildEventTypeMenu, setOpenChildEventTypeMenu] = useState<boolean>(false)
  const [selectedMainEventId, setSelectedMainEventId] = useState<number | null>(null)

  const onClickMainMenuItem = useCallback((eventTypeItem: EventTypeInfo) => {
    setSelectedMainEventId(eventTypeItem.id)
    // open child event type menu
    setOpenChildEventTypeMenu(true)
  }, [CALENDAR_EVENT_TYPE_MENU,
    modalEventInfo,
    openEventTypeMenu,
    selectedMainEventId,
    setSelectedMainEventId,
    setOpenChildEventTypeMenu,
    openChildEventTypeMenu
  ])

  const onClickChildMenuItem = useCallback((eventTypeItem: EventTypeInfo) => {
    const updateInfo = {
      ...modalEventInfo,
      eventType: eventTypeItem
    }
    // update event info
    setModalEventInfo(updateInfo)

    // close all event type menu
    setOpenEventTypeMenu(false)
    setOpenChildEventTypeMenu(false)
  }, [CALENDAR_EVENT_TYPE_MENU,
    modalEventInfo,
    openEventTypeMenu,
    setModalEventInfo,
    setOpenEventTypeMenu,
    setOpenChildEventTypeMenu,
    selectedMainEventId
  ])

  const ChildMenu = useCallback((): JSX.Element => {
    const childMenus = CALENDAR_EVENT_TYPE_MENU.filter(menu => menu.id === selectedMainEventId)[0]?.childMenus
    if (openChildEventTypeMenu && childMenus && childMenus.length) return <Box className='calendar-event-type-child-menu'>
      {childMenus.map((eventTypeItem) => {
        return (<Button
          className='calendar-event-type-child-menu-item'
          style={{ color: `${eventTypeItem.color}`, width: '100%', justifyContent: 'flex-start' }}
          key={eventTypeItem.id}
          onClick={() => { onClickChildMenuItem(eventTypeItem) }}
        >
          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <div className='title-icon-wrapper' style={{ border: `1px solid ${eventTypeItem.color}` }}>
              <FontAwesomeIcon icon={eventTypeItem.icon} className="icon" color={eventTypeItem.color} />
            </div>
            <span>{eventTypeItem.title}</span>
          </Box>
        </Button>)
      })}
    </Box>

  }, [onClickMainMenuItem, modalEventInfo, openEventTypeMenu, selectedMainEventId, setOpenEventTypeMenu, setSelectedMainEventId])

  const onClickAway = useCallback(() => {
    setOpenEventTypeMenu(false);
  }, [onClickMainMenuItem, modalEventInfo, openEventTypeMenu, selectedMainEventId, setOpenEventTypeMenu, setSelectedMainEventId])

  const MainMenu = useCallback((): JSX.Element => {
    if (openEventTypeMenu) return <ClickAwayListener onClickAway={onClickAway}>
      <Box className='calendar-event-type-main-menu'>
        <div className="calendar-event-type-main-menu-title">
          <i>Itinerary Ticket Type</i>
        </div>
        {CALENDAR_EVENT_TYPE_MENU.map((eventTypeItem) => {
          return (<Button
            className='calendar-event-type-main-menu-item'
            style={{ color: `${eventTypeItem.color}`, width: '100%', justifyContent: 'flex-start' }}
            key={eventTypeItem.id}
            onClick={() => { onClickMainMenuItem(eventTypeItem) }}
          >
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
              <FontAwesomeIcon icon={eventTypeItem.icon} className="icon" color={eventTypeItem.color} />
              <span>{eventTypeItem.title}</span>
            </Box>
          </Button>)
        })}
        <ChildMenu />
      </Box>
    </ClickAwayListener>

  }, [onClickMainMenuItem, modalEventInfo, openEventTypeMenu, selectedMainEventId, setOpenEventTypeMenu])
  return (
    <MainMenu />
  )
}

export default CalendarEventTypeMenu