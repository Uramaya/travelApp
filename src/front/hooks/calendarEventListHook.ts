import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventList, EventListItem } from '@/types'
import { EVENT_DETAIL } from '@/const/calendarEventList'

// the calendar event modal control hook
const useCalendarEventList = ({initEventList = null, eventId = null}: {initEventList?: EventList, eventId?: string | string[]}) => {

  // basic calendar event list setting
  const [eventList, setEventList] = useState<EventList | null>(initEventList)
  const [eventItem, setEventItem] = useState<EventListItem | null>(EVENT_DETAIL(eventId))

  return {
    eventList,
    setEventList,
    eventItem,
    setEventItem,
  }
}

export default useCalendarEventList