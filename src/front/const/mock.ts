import { EventInfo } from '@/types'

// sample calendar event list
export const TEST_EVENTS: EventInfo[] = [
    {
        id: 1,
        title: 'Long Event1111111111111111',
        start: new Date(),
        end: new Date(),
        allDay: true,
        isShowPopup: false,
        index: 12,
      },
      {
        id: 2,
        title: 'Long Event2',
        start: new Date(),
        end: new Date(),
        allDay: true,
        isShowPopup: false,
        index: 234,
      },
      {
        id: 3,
        title: 'Long Event2',
        start: new Date(),
        end: new Date(),
        allDay: true,
        isShowPopup: false,
        index: 3,
      },
      {
        id: 4,
        title: 'Long Event2',
        start: new Date(),
        end: new Date(),
        allDay: true,
        isShowPopup: false,
        index: 0,
      },
      {
        id: 5,
        title: 'Long Event2',
        start: new Date(),
        end: new Date(),
        allDay: true,
        isShowPopup: false,
        index: 5,
      },
      {
        id: 6,
        title: 'Long Event3',
        start: new Date('3 May 2024 00:00:00 +0900'), // UTCの2019/5/28 0時0分
        end: new Date('3 May 2024 4:00:00 +0900'),
        isShowPopup: false,
        index: 6,
      },
      {
        id: 65,
        title: 'Long Event3',
        start: new Date('3 May 2024 05:00:00 +0900'), // UTCの2019/5/28 0時0分
        end: new Date('3 May 2024 06:00:00 +0900'),
        isShowPopup: false,
        index: 6,
      },
      {
        id: 157,
        title: 'Long Event3',
        start: new Date('3 May 2024 07:00:00 +0900'), // UTCの2019/5/28 0時0分
        end: new Date('3 May 2024 10:00:00 +0900'),
        isShowPopup: false,
        index: 6,
      },
      {
        id: 0,
        title: 'Long Event3',
        start: new Date('3 May 2024 00:00:00 +0900'), // UTCの2019/5/28 0時0分
        end: new Date('3 May 2024 10:00:00 +0900'),
        isShowPopup: false,
        index: 6,
      },
]