import { useMemo, useCallback, useEffect, useState } from 'react'
import axios from '@/utils/api';
import { EventTypeInfo } from '@/types'

// the calendar event modal control hook
const useCalendarEventTypeListHook = () => {

  // basic calendar event add modal setting
  const [calendarEventTypeMenuList, setCalendarEventTypeMenuList] = useState<EventTypeInfo[]>([])
  
  const getCalendarEventTypeMenuList = async () => {
    const response = await axios.get('http://localhost:13000/api/eventTypes');
    return response.data;
  };
  
  useEffect(() => {
    getCalendarEventTypeMenuList().then((result) => {
      if(result) {
        setCalendarEventTypeMenuList(result);
      }
  })
    
  }, [])

  
  return {
    calendarEventTypeMenuList,
  }
}

export default useCalendarEventTypeListHook