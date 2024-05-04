import { COUNTRIES } from '@/const/country'
import { COUNTRY_FLAGS } from "@/const/countryFlogEmoji"
import { LargeNumberLike } from 'crypto'
import moment from 'moment'
/**
 * Returns the digits of the number
 * @param { number | null | undefined } num
 * @returns { number }
 */
export const numDigits = (num: number | null | undefined): number => {
    if(!num) return 0
    return num.toString().length
}

/**
* Returns the capitalized string
* @param { string | null | undefined } str
* @returns { string }
*/
export const capitalized = (str: string | null | undefined): string => {
   if(!str) return ''
   return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
* Returns the country flag svg by time zone name
* @param { string | null | undefined } timeZoneName
* @returns { string }
*/
export const getCountryFlagSVGByTimeZoneName = (timeZoneName: string | null | undefined): string => {
    if(!timeZoneName) return ''
    let countryName = ''
    let flagEmoji = ''
    COUNTRIES.forEach((country) => {
        if(country.zones.includes(timeZoneName) || country.name === timeZoneName) countryName = country.abbr
    })
    if(!countryName) return ''
    COUNTRY_FLAGS.forEach((flag) => {
        if(flag.code === countryName) flagEmoji = flag.emoji
    })
    return flagEmoji
 }
 

 /**
* Returns the country flag svg by time zone name
* @param { string | null | undefined } timeZoneName
* @returns { string }
*/
export const getCalendarEventTimeLabel = ({start, end}: 
    {start: Date | null | undefined, end: Date | null | undefined}
): string => {
    if(!start || !end) return ''
    return `${moment(start).format('H:mm')}- ${moment(end).format('H:mm')}`
 }