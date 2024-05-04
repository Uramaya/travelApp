import { Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

export const INIT_CALENDAR = {
    date: new Date(),
    view: Views.MONTH,
    timeZoneName: moment.tz.guess(true), // Guessing user zone
}