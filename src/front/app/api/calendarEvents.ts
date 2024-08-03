"use client"
import axios from '@/utils/api';
import { EventInfo } from '@/types'
import { TEST_EVENTS } from '@/const'

export const getCalenderEvents = async () => {
  // const response = await axios.get('/calenderEvents');
  // return response.data;
  return TEST_EVENTS
};

export const createOrUpdateCalenderEvents = async (calendarEvent: EventInfo) => {
  const response = await axios.post('http://localhost:13000/api/calendarEvents', calendarEvent);
  console.log('response', response)
  return response.data;
};

export const deleteCalenderEventsById = async (id: number) => {
  // const response = await axios.delete(`/calenderEvents/${id}`);
  // return response.data;
  return id
};