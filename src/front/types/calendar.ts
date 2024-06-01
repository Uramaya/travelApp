import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import { Views } from 'react-big-calendar'
type CalendarViewKeys = keyof typeof Views;
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
    author: UserInfo
    watch: number
    like: number
    address: AddressComponent[]
    users: UserInfo[]
    mainImage: string
}
export type EventInfo =  {
    id: number
    title: string
    start: Date
    end: Date
    allDay: boolean | null
    index: number | null
    userIds: number[]
    eventType: EventTypeInfo
    location: string
    commute: CommuteInfo | null
    googleMapUrl: string | null
    images: string[]
    timeZoneName: string
    description: string
    mail: string
}

export type EventInfoKeys = keyof EventInfo;

export type UserInfo =  {
    id: number
    name: string
    mail: string | null
    language: string | null
    icon: string | null
    timeZoneName: string | null
}

export type AddressComponent = {
    long_name: string
    short_name: string
    types: AddressType[]
}

export type AddressType = 'political' | 'street_number' | 'route' | 'locality' | 'administrative_area_level_2' | 'administrative_area_level_1' | 'country' | 'postal_code'

export type CommuteInfo =  {
    from: string
    to: string
}

export type EventType = 'main' | 'stay' | 'commute' | 'activity' | 'eat' | 'other'

export type EventTypeInfo =  {
    id: number
    title: string
    icon: any
    type: EventType
    color: string
    backgroundColor: string
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
    onOpenModal: () => void
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
}


