import { useState, useCallback, ReactNode, useRef, useEffect } from 'react'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import CalendarEventModal from '@/components/calendar/CalendarEventModal'
import '@/styles/calendar/CalendarEventAddBtn.scss'
import { INIT_CALENDAR_MODAL_EVENT_INFO } from '@/const'
import { EventInfo, CalendarView, UserInfo } from '@/types'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CalendarEventAddBtn = ({
    openCalendarEventModal,
    setOpenCalendarEventModal,
    setModalEventInfo,
    onSave,
    allUsers,
    onOpenModal,
    onCloseModal,
}: {
    openCalendarEventModal: boolean,
    setOpenCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>,
    onSave: () => void,
    allUsers: UserInfo[],
    onOpenModal: (eventInfo?: EventInfo) => void,
    onCloseModal: () => void,
}) => {
    const onClick = useCallback(() => {
        setOpenCalendarEventModal(true)
    }, [openCalendarEventModal, setOpenCalendarEventModal])

    const onClose = useCallback(() => {
        setOpenCalendarEventModal(false)
    }, [openCalendarEventModal, setOpenCalendarEventModal])

    return (
        <div className='calendar-event-add-btn'>
            <Button
                variant="text"
                size="small"
                className='calendar-event-btn'
                onClick={onClick}
            >
                <div className='icon-plus-btn'>
                    <div className='icon-wrapper'>
                        <FontAwesomeIcon icon={faPlus} className="icon" color="#53A9DB" />
                    </div>
                </div>
            </Button>
            <CalendarEventModal
                modalEventInfo={INIT_CALENDAR_MODAL_EVENT_INFO}
                openCalendarEventModal={openCalendarEventModal}
                setOpenCalendarEventModal={setOpenCalendarEventModal}
                setModalEventInfo={setModalEventInfo}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal}
                onSave={onSave}
                allUsers={allUsers}
            />
        </div>
    )
}

export default CalendarEventAddBtn