import { EventTypeInfo } from '@/types'

// sample calendar event type list
export const CALENDAR_EVENT_TYPE_MENU: EventTypeInfo[] = [
  {
    id: 101,
    title: 'Stay',
    icon: 'bed',
    type: 'main',
    color: '#2D2D2D',
    background_color: '',
    childMenus: [
      {
        id: 1,
        title: 'Stay',
        icon: 'hotel',
        type: 'stay',
        color: '#39635E',
        background_color: 'E9F5F5',
      },
      {
        id: 2,
        title: 'Guest House',
        icon: 'shop',
        type: 'stay',
        color: '#39635E',
        background_color: 'E9F5F5',
      },
      {
        id: 3,
        title: 'Airbnb',
        icon: ['fab', 'airbnb'],
        type: 'stay',
        color: '#39635E',
        background_color: 'E9F5F5',
      },
      {
        id: 4,
        title: 'Hostel',
        icon: 'bed',
        type: 'stay',
        color: '#39635E',
        background_color: 'E9F5F5',
      },
    ]
  },
  {
    id: 102,
    title: 'Commute',
    icon: 'plane',
    type: 'main',
    color: '#2D2D2D',
    background_color: '',
    childMenus: [
      {
        id: 5,
        title: 'Flight',
        icon: 'plane',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 6,
        title: 'Train',
        icon: 'train',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 7,
        title: 'MRT',
        icon: 'train-subway',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 8,
        title: 'Bus',
        icon: 'bus',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 81,
        title: 'Bike',
        icon: 'motorcycle',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 9,
        title: 'Bicycle',
        icon: 'bicycle',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 10,
        title: 'Car',
        icon: 'car-side',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 11,
        title: 'Rental Car',
        icon: 'car',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 12,
        title: 'Walk',
        icon: 'person-walking',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 13,
        title: 'Taxi',
        icon: 'taxi',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 14,
        title: 'Boat',
        icon: 'ship',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
      {
        id: 15,
        title: 'Ferry',
        icon: 'ferry',
        type: 'commute',
        color: '#F88029',
        background_color: '#FFEED5',
      },
    ]
  },
  {
    id: 103,
    title: 'Activity',
    icon: 'archway',
    type: 'main',
    color: '#2D2D2D',
    background_color: '',
    childMenus: [
      {
        id: 16,
        title: 'Tourist Attraction',
        icon: 'archway',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',

      },
      {
        id: 17,
        title: 'Airport',
        icon: 'plane-departure',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 18,
        title: 'Shopping',
        icon: 'cart-shopping',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 19,
        title: 'Outdoor Activity',
        icon: 'tree',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 20,
        title: 'Mountain Climbing',
        icon: 'mountain',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 21,
        title: 'Beach',
        icon: 'umbrella-beach',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 22,
        title: 'Photo',
        icon: 'camera-retro',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 23,
        title: 'Work',
        icon: 'briefcase',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 24,
        title: 'Rest',
        icon: 'heart',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 25,
        title: 'Rest Room',
        icon: 'restroom',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 26,
        title: 'Swimming',
        icon: 'person-swimming',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 27,
        title: 'Sports',
        icon: 'futbol',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 28,
        title: 'Skiing',
        icon: 'person-skiing',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 29,
        title: 'Concert',
        icon: 'fa-music',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 30,
        title: 'Net Surfing',
        icon: 'laptop',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 31,
        title: 'Study',
        icon: 'book-open-reader',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 33,
        title: 'Smoking',
        icon: 'smoking',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
      {
        id: 34,
        title: 'Pray',
        icon: 'person-praying',
        type: 'activity',
        color: '#D84949',
        background_color: '#FFEBE8',
      },
    ]
  },
  {
    id: 104,
    title: 'Eat',
    icon: 'utensils',
    type: 'main',
    color: '#2D2D2D',
    background_color: '',
    childMenus: [
      {
        id: 35,
        title: 'Cafe',
        icon: 'mug-saucer',
        type: 'eat',
        color: '#7C3823',
        background_color: '#EEDECB',
      },
      {
        id: 36,
        title: 'Restaurant',
        icon: 'utensils',
        type: 'eat',
        color: '#7C3823',
        background_color: '#EEDECB',
      },
      {
        id: 37,
        title: 'Bar',
        icon: 'martini-glass-citrus',
        type: 'eat',
        color: '#7C3823',
        background_color: '#EEDECB',
      },
      {
        id: 38,
        title: 'Food Stand',
        icon: 'store',
        type: 'eat',
        color: '#7C3823',
        background_color: '#EEDECB',
      },
    ]
  },
  {
    id: 105,
    title: 'Other',
    icon: 'angles-right',
    type: 'main',
    color: '#2D2D2D',
    background_color: '',
    childMenus: []
  },
]