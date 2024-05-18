import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventInfo, CalendarView, CalendarInfo } from '@/types'
import moment from 'moment'

// the calendar event modal control hook
const calendarEventModal = (initCalendarInfo: CalendarInfo) => {
  // basic calendar event add modal setting
  const [openCalendarEventModal, setOpenCalendarEventModal] = useState<boolean>(false)
  const [modalEventInfo, setModalEventInfo] = useState<EventInfo | null>(null)
  const [modalEventTimeZoneName, setModalEventTimeZoneName] = useState(initCalendarInfo.timeZoneName)

  // click today button
  const onOpenModal = (eventInfo: EventInfo | null = null) => {
    if (eventInfo) setModalEventInfo(eventInfo)
  }

  // when click add photo btn
  const onClickAddPhoto = () => {

  }

  // when upload the photo
  const onUploadPhoto = () => {

  }

  // click next button
  const onSave = () => {
    // to call the save event info api

    // to call the save photo api
  }
  return {
    openCalendarEventModal,
    setOpenCalendarEventModal,
    modalEventInfo,
    setModalEventInfo,
    onOpenModal,
    onClickAddPhoto,
    onUploadPhoto,
    onSave,
    modalEventTimeZoneName,
    setModalEventTimeZoneName,
  }
}

export default calendarEventModal