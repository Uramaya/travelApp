import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventList, EventListItem } from '@/types'
import { EVENT_DETAIL } from '@/const/calendarEventList'

// the calendar event modal control hook
const useCalendarEventList = () => {

  // basic calendar event list setting

  const [eventItem, setEventItem] = useState<EventListItem | null>(null)

  return {
    eventItem,
    setEventItem,
  }
}

export default useCalendarEventList