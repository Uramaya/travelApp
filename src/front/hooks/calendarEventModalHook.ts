import { useMemo, useCallback, useEffect, useState } from 'react'
import { EventInfo, CalendarView, CalendarInfo } from '@/types'
import moment from 'moment'

// the calendar event modal control hook
const calendarEventModal = (initEventInfo: EventInfo) => {

  // basic calendar event add modal setting
  const [openCalendarEventModal, setOpenCalendarEventModal] = useState<Boolean>(false)
  const [modalEventInfo, setModalEventInfo] = useState<EventInfo | null>(initEventInfo)
  // const [isCommerce, setIsCommerce] = useState<Boolean>(modalEventInfo?.event_type?.type === 'commute')
  const [isCommerce, setIsCommerce] = useState<Boolean>(true)

  // open modal
  const onOpenModal = useCallback((eventInfo: EventInfo | null = null): void => {
      setOpenCalendarEventModal(true)
      setModalEventInfo(eventInfo)
      // setIsCommerce(eventInfo?.event_type?.type === 'commute')
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
    isCommerce,
    setIsCommerce,
  }
}

export default calendarEventModal