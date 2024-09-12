import { Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { EventInfo, CalendarView, CalendarInfo } from '@/types'
const userTimeZone = moment.tz.guess(true)
// default calendar info
export const INIT_CALENDAR: CalendarInfo = {
  date: new Date(),
  view: Views.MONTH,
  timeZoneName: userTimeZone, // Guessing user zone
}

// default calendar modal event info
export const INIT_CALENDAR_MODAL_EVENT_INFO: EventInfo = {
  id: 0,
  title: '',
  start: new Date(moment().format('YYYY-M-DD HH:mm:ss')),
  end: new Date(moment().add(1, 'h').format('YYYY-M-DD HH:mm:ss')),
  is_all_day: 0,
  index: 10,
  users: [],
  authors: [],
  event_type: {
    id: 1,
    title: 'Stay',
    icon: 'hotel',
    type: 'stay',
    color: '#39635E',
    background_color: 'E9F5F5',
  },
  location: {
    id: 0,
    google_map_json: {
      lat: null,
      lng: null,
      name: null,
      formatted_address: null,
    }
  },
  location_from: {
    id: 0,
    google_map_json: {
      lat: null,
      lng: null,
      name: null,
      formatted_address: null,
      travel_mode: null,
    }
  },
  location_to: {
    id: 0,
    google_map_json: {
      lat: null,
      lng: null,
      name: null,
      formatted_address: null,
      travel_mode: null,
    }
  },
  images: [],
  time_zone_name: userTimeZone, // Guessing user zone
  description: '',
  emails: [],
  pdfs: [],
  marker: null,
  watch: 0,
  like: 0,
  event_id: 0,
}

// Quill toolbar options
export const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['link', 'formula'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
];