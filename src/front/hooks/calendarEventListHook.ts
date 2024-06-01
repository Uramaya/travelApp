import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventList } from '@/types'

// the calendar event modal control hook
const useCalendarEventList = (initEventList: EventList = null) => {

  // basic calendar event list setting
  const [eventList, setEventList] = useState<EventList | null>(initEventList)

  return {
    eventList,
    setEventList,
  }
}

export default useCalendarEventList