import { Dispatch } from '@reduxjs/toolkit'
import { SetStateAction } from 'react'
import { Views } from 'react-big-calendar'
type CalendarViewKeys = keyof typeof Views
export type CalendarView = typeof Views[CalendarViewKeys]

export type EventList =  {
    ongoing: EventListItem[]
    recent: EventListItem[]
    explore: EventListItem[]
}

export type EventListItem =  {
    id: number
    title: string
    start: Date
    end: Date
    authors: UserInfo[]
    watch: number
    like: number
    locations: LocationInfo[]
    time_zone_name: string
    users: UserInfo[]
    images: ImageInfo[]
    description: string
}

export type ImageInfo =  {
    id: number
    image_url: string
    image_key: string
}

export type LocationInfo =  {
    id: number
    google_map_json: LocationsComponent
}

export type EventInfo =  {
    id: number
    title: string
    marker: MarkerInfo[] | null
    time_zone_name: string
    start: Date
    end: Date
    is_all_day: number | boolean | null
    watch: number
    like: number
    location: LocationInfo
    location_from: LocationInfo
    location_to: LocationInfo
    event_type: EventTypeInfo
    users: UserInfo[]
    authors: UserInfo[]
    images: ImageInfo[]
    description: string
    emails: EmailInfo[]
    pdfs: PdfInfo[]
    index?: number
    event_id: number
}

export type MarkerInfo =  {
    color: string
    background_color: string
}

export type EmailInfo =  {
    id: number
    subject: string
    from_name: string
    from_mail: string
    to_name: string
    to_mail: string
    body: string
    created_at: string
    updated_at: string
}

export type PdfInfo =  {
    id: number
    pdf_url: string
    pdf_key: string
    created_at: string
    updated_at: string
}

export type EventInfoKeys = keyof EventInfo;

export type UserInfo =  {
    id: number
    name: string
    mail: string | null
    language: string | null
    icon_url: string | null
    time_zone_name: string | null
}

export type LocationsComponent = {
    lat: number | null
    lng: number | null
    name: string | null
    formatted_address: string | null
}

export type LocationType = 'political' | 'street_number' | 'route' | 'locality' | 'administrative_area_level_2' | 'administrative_area_level_1' | 'country' | 'postal_code'

export type EventType = 'main' | 'stay' | 'commute' | 'activity' | 'eat' | 'other'

export type EventTypeInfo =  {
    id: number
    title: string
    icon: any
    type: EventType
    color: string
    background_color: string
    childMenus?: EventTypeInfo[]
}

export type CalendarInfo =  {
    date: Date
    view: CalendarView
    timeZoneName: string
}

export type CalendarProps =  {
    date: Date
    view: CalendarView
    events: EventInfo[]
    height: string
    width: string
    screenWidth: number
    screenHeight: number
    timeZoneName: string
    setDate: React.Dispatch<React.SetStateAction<Date>>
    setView: React.Dispatch<React.SetStateAction<CalendarView>>
    onNavigate: (newDate: Date) => void
    onView: (newView: CalendarView) => void
    onTodayClick: () => void
    onNextClick: () => void
    onPrevClick: () => void
    setTimeZoneName: React.Dispatch<React.SetStateAction<string>>
    openCalendarEventModal: boolean
    setOpenCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>
    modalEventInfo: EventInfo | null
    setModalEventInfo: React.Dispatch<React.SetStateAction<EventInfo | null>>
    onOpenModal: (event: EventInfo | null) => void
    onCloseModal: () => void
    onClickAddPhoto: () => void
    onUploadPhoto: () => void
    onSave: () => void
    allUsers: UserInfo[]
    popoverId: string | null
    popoverAnchorEl: HTMLButtonElement | null
    setPopoverAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
    popoverOpen: boolean
    onClickPopoverBtn: any
    onClosePopover: () => void
    eventItem: EventListItem
    onDeletePopover: (id: number) => void
    calendarEventTypeMenuList: EventTypeInfo[]
    onDeleteModal: (id: number) => void
}



export type ConfirmModalObj =  {
    modalTitle: string
    modalContent: string
    saveBtnTitle: string
    type: string
    data: any
}
