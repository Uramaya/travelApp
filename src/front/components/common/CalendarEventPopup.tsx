import React from "react"


const CalendarEventPopup = ({ isShowPopup = false }: {isShowPopup:boolean}) => {
  const Popup = () => {
    if(isShowPopup) return   (
        <div >CalendarEventPopup</div>
    )
  }
  return (
    <Popup />
  )
}

export default CalendarEventPopup