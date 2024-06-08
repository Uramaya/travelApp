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
  allDay: false,
  index: 10,
  userIds: [1,2],
  eventType: {
    id: 1,
    title: 'Stay',
    icon: 'hotel',
    type: 'stay',
    color: '#39635E',
    backgroundColor: 'E9F5F5',
  },
  location: '',
  commute: null,
  googleMapUrl: null,
  images: [],
  timeZoneName: userTimeZone, // Guessing user zone
  description: '',
  mail: '',
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