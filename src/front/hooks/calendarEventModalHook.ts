import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventInfo, CalendarView, CalendarInfo } from '@/types'
import moment from 'moment'

// the calendar event modal control hook
const calendarEventModal = (initEventInfo: EventInfo) => {

  // basic calendar event add modal setting
  const [openCalendarEventModal, setOpenCalendarEventModal] = useState<boolean>(false)
  const [modalEventInfo, setModalEventInfo] = useState<EventInfo | null>(initEventInfo)

  // open modal
  const onOpenModal = useCallback((eventInfo: EventInfo | null = null): void => {
      setOpenCalendarEventModal(true)
      setModalEventInfo(eventInfo)
  }, [openCalendarEventModal])

  // close modal
  const onCloseModal = () => {
    setOpenCalendarEventModal(false)
    setModalEventInfo(initEventInfo)
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
    onCloseModal,
    onClickAddPhoto,
    onUploadPhoto,
    onSave,
  }
}

export default calendarEventModal