import { useCallback } from "react"

import '@/styles/CalendarEventPopover.scss'

const CalendarEventPopover = ({ className }: { className: string}) => {
  const Popup = useCallback((): JSX.Element => {
        return <div className={`calendar-event-popover ${className}`}>
          <div className="content">CalendarEventPopup</div>
        </div>  
}, [className])
  return (
    <Popup />
  )
}

export default CalendarEventPopover