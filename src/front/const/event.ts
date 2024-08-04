import moment from 'moment'
import 'moment-timezone'
const userTimeZone = moment.tz.guess(true)
import { EventListItem } from '@/types'

// default event info
export const INIT_EVENT_INFO: EventListItem = {
    id: 0,
    title: 'My Travel Itinerary',
    start: new Date(moment().format('YYYY-M-DD HH:mm:ss')),
    end: new Date(moment().add(1, 'h').format('YYYY-M-DD HH:mm:ss')),
    users: [],
    authors: [],
    locations: [],
    images: [
        {
            id: 1,
            image_url: 'https://as1.ftcdn.net/v2/jpg/03/04/88/18/1000_F_304881889_yJ1S3butl9gVs0kMptYTU2N1EVmEJbz8.jpg',
            image_key: 'key-123',
        },
    ],
    time_zone_name: userTimeZone, // Guessing user zone
    watch: 0,
    like: 0,
    description: '',
  }