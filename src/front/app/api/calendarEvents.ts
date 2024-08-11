"use client"
import axios from '@/utils/api';
import { EventInfo } from '@/types'
import { TEST_EVENTS } from '@/const'
import dayjs from "dayjs"

export const getCalenderEvents = async () => {
  // const response = await axios.get('/calenderEvents');
  // return response.data;
  return TEST_EVENTS
};

export const createOrUpdateCalenderEvents = async (calendarEvent: EventInfo) => {
  const param = {
    ... calendarEvent,
    is_all_day: Number(calendarEvent.is_all_day),
    start: dayjs(calendarEvent.start).format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    end: dayjs(calendarEvent.end).format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
  }
  const response = await axios.post('http://localhost:13000/api/calendarEvents', param);
  return response.data;
};

export const deleteCalenderEventsById = async (id: number) => {
  const response = await axios.delete(`http://localhost:13000/api/calendarEvents/${id}`);
  return response.data;
};