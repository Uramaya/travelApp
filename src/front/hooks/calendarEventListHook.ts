import { useState } from 'react'
import { EventListItem } from '@/types'

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