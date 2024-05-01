import React from 'react'

import CalendarEventPopup from '@/components/common/CalendarEventPopup'

const CalendarEvent = ({eventInfo}: {eventInfo: any}) => {

    return (
        <>
            <div>CalendarEvent</div>
            <CalendarEventPopup isShowPopup={eventInfo?.isShowPopup}/>
        </>
    )
}

export default CalendarEvent