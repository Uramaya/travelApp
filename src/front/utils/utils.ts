import { COUNTRIES } from '@/const/country'
import { COUNTRY_FLAGS } from "@/const/countryFlogEmoji"
import { UserInfo, LocationInfo, LocationType, EventList, EventListItem, ImageInfo } from "@/types"
import moment from 'moment'
/**
 * Returns the digits of the number
 * @param { number | null | undefined } num
 * @returns { number }
 */
export const numDigits = (num: number | null | undefined): number => {
    if (!num) return 0
    return num.toString().length
}

/**
* Returns the capitalized string
* @param { string | null | undefined } str
* @returns { string }
*/
export const capitalized = (str: string | null | undefined): string => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
* Returns the country flag svg by time zone name
* @param { string | null | undefined } timeZoneName
* @returns { string }
*/
export const getCountryFlagSVGByTimeZoneName = (timeZoneName: string | null | undefined): string => {
    if (!timeZoneName) return ''
    let countryName = ''
    let flagEmoji = ''
    COUNTRIES.forEach((country) => {
        if (country.zones.includes(timeZoneName) || country.name === timeZoneName) countryName = country.abbr
    })
    if (!countryName) return ''
    COUNTRY_FLAGS.forEach((flag) => {
        if (flag.code === countryName) flagEmoji = flag.emoji
    })
    return flagEmoji
}


/**
* Returns the time label shown on the week event card
* @param { Date | null | undefined } start // start date time
* @param { Date | null | undefined } end // end date time
* @returns { string } // H:mm -H:mm
*/
export const getCalendarEventTimeLabel = ({ start, end }:
    { start: Date | null | undefined, end: Date | null | undefined }
): string => {
    if (!start || !end) return ''
    return `${moment(start).format('H:mm')}- ${moment(end).format('H:mm')}`
}

/**
* Returns the time label shown on the popover
* @param { Date | null | undefined } date // date time
* @param { number | boolean | null | undefined } allDay // allDay flag
* @returns { string } // if allDay=true => D MMM YYYY(ddd) ; if allDay=false => D MMM YYYY(ddd) H:mm
*/
export const getCalendarEventPopoverTimeLabel = (date: Date | null | undefined, allDay: number | boolean | null | undefined): string => {
    if (!date) return ''
    if (allDay) return `${moment(date).format('D MMM YYYY(ddd)')}`
    else return `${moment(date).format('D MMM YYYY(ddd) H:mm')}`
}

/**
* Returns the date time label shown on the event edit modal
* @param { Date | null | undefined } date // date time
* @param { boolean | null | undefined } allDay // allDay flag
* @returns { string } // if allDay=true => D MMM YYYY(ddd) ; if allDay=false => D MMM YYYY(ddd) H:mm
*/
export const getCalendarEventDateTimeModalLabel = (date: Date | null | undefined, allDay: boolean | null | undefined): string => {
    if (!date) return ''
    if (allDay) return `${moment(date).format('D MMM YYYY(ddd)')}`
    else return `${moment(date).format('D MMM YYYY(ddd) H:mm')}`
}


/**
* Returns the user info by use id
* @param { number | null | undefined } userId // user id
* @param { UserInfo[] | null | undefined } allUsers // all users info
* @returns { UserInfo | undefined } // return user info
*/
export const getUSerInfoById = (userId: number | null | undefined, allUsers: UserInfo[] | null | undefined): UserInfo | undefined => {
    if (!userId || !allUsers) return undefined
    return allUsers.find(user => user.id === userId)
}

/**
* Returns the date label shown on the event card
* @param { Date | null | undefined } startDate // date
* @param { Date | null | undefined } endDate // date
* @returns { string } //  D MMM YYYY ;
*/
export const getEventCardDateLabel = (startDate: Date | null | undefined, endDate: Date | null | undefined): string => {
    if (!startDate) return ''
    if (!endDate) return `${moment(startDate).format('D MMM YYYY')}`
    return `${moment(startDate).format('D MMM YYYY')} - ${moment(endDate).format('D MMM YYYY')}`
}

/**
* Returns the date label shown on the event card
* @param { ImageInfo[] | null | undefined } images
* @returns { string }
*/
export const getEventCardMainImage = (images: ImageInfo[] | null | undefined): string => {
    if (!images || !images.length) return ''
    return images[0].image_url
}

/**
* Returns the date label shown on the event card
* @param { ImageInfo[] | null | undefined } images
* @returns { string }
*/
export const getEventCardMainAuthors = (images: ImageInfo[] | null | undefined): string => {
    if (!images || !images.length) return ''
    return images[0].image_url
}

/**
* Returns the location label shown on the event card
* @param { LocationInfo[] | null | undefined } locations // date
* @returns { string } //  D MMM YYYY ;
*/
export const getEventCardLocationLabel = (locations: LocationInfo[] | null | undefined): string => {
    if (!locations || !locations.length) return ''
    const result = locations.map(location => {
        const googleMapJson = location.google_map_json    
        return [
            googleMapJson.find(address => address.types.includes('country'))?.long_name,
            googleMapJson.find(address => address.types.includes('administrative_area_level_2'))?.long_name,
        ].join(', ')
    }).join('/ ')
    return result
}

/**
* Returns the location label shown on the calendar event pop over
* @param { LocationInfo | null | undefined } location // date
* @returns { string } //  D MMM YYYY ;
*/
export const getPopOverLocationLabel = (location: LocationInfo | null | undefined): string => {
    if (!location) return ''
        const googleMapJson = location.google_map_json    
        return [
            googleMapJson.find(address => address.types.includes('country'))?.long_name,
            googleMapJson.find(address => address.types.includes('administrative_area_level_2'))?.long_name,
        ].join(', ')
}

// /**
// * Returns the event list item by event id
// * @param { EventList | null | undefined } eventList // event list obj
// * @param { number | null | undefined } id // event id
// * @returns { {ongoing: EventListItem | undefined, recent: EventListItem | undefined, explore: EventListItem | undefined} } //  return event list item ;
// */
// export const getEventById = (eventList: EventList | null | undefined, id: number | null | undefined): 
// {
//     ongoing: EventListItem | undefined,
//     recent: EventListItem | undefined, 
//     explore: EventListItem | undefined
// } => {
//     const id_ = Number(id)
//     if(!id_ && id_ !== 0 || !eventList) return
//     const result = {
//         ongoing: null,
//         recent: null,
//         explore: null, 
//     }
//     // TODO: to get event detail from api
//     const eventFindInOngoing = eventList.ongoing.find(eventItem => eventItem.id === id_)
//     if(eventFindInOngoing) {
//         result.ongoing = {...eventFindInOngoing}
//     }
//     const eventFindInRecent = eventList.recent.find(eventItem => eventItem.id === id_)
//     if(eventFindInRecent) {
//         result.recent = {...eventFindInRecent}
//     }
//     const eventFindInExplore = eventList.explore.find(eventItem => eventItem.id === id_)
//     if(eventFindInExplore) {
//         result.explore = {...eventFindInExplore}
//     }
//     return result
// }

/**
* Returns the event list item by event id
* @param { EventList | null | undefined } eventList // event list obj
* @param { number | null | undefined } id // event id
* @returns { {ongoing: EventListItem | undefined, recent: EventListItem | undefined, explore: EventListItem | undefined} } //  return event list item ;
*/
export const getEventDetail = (eventList: EventList | null | undefined, id: number | null | undefined): EventListItem | undefined => {
    const id_ = Number(id)
    if(!id_ && id_ !== 0 || !eventList) return
    const result = {
        ongoing: null,
        recent: null,
        explore: null, 
    }
    // TODO: to get event detail from api
    const eventFindInOngoing = eventList.ongoing.find(eventItem => eventItem.id === id_)
    if(eventFindInOngoing) {
        return eventFindInOngoing
    }
    const eventFindInRecent = eventList.recent.find(eventItem => eventItem.id === id_)
    if(eventFindInRecent) {
        return eventFindInRecent
    }
    const eventFindInExplore = eventList.explore.find(eventItem => eventItem.id === id_)
    if(eventFindInExplore) {
        return eventFindInExplore
    }
}