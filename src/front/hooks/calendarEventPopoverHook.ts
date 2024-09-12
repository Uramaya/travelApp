import { useCallback, useState } from 'react'

// the calendar event modal control hook
const useCalendarEventPopoverHook = () => {

  // basic calendar event add modal setting
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null)
  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'calendar-popover' : undefined;

  const onClickPopoverBtn = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(event.currentTarget)
  }, [setPopoverAnchorEl])

  const onClosePopover = useCallback(() => {
    setPopoverAnchorEl(null)
  }, [setPopoverAnchorEl])

  
  return {
    popoverId,
    popoverAnchorEl,
    setPopoverAnchorEl,
    popoverOpen,
    onClickPopoverBtn,
    onClosePopover,
  }
}

export default useCalendarEventPopoverHook