import { useCallback } from "react"

import '@/styles/calendar/CalendarEventPopover.scss'

const CalendarEventPopover = ({ className }: { className: string }) => {
  const Popover = useCallback((): JSX.Element => {
    return <div className={`calendar-event-popover ${className}`}>
      <div className="content">CalendarEventPopup</div>
    </div>
  }, [className])
  return (
    <Popover />
  )
}

export default CalendarEventPopover