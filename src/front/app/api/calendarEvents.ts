"use client"
import axios from '@/utils/api';
import { EventInfo } from '@/types'
import { TEST_EVENTS } from '@/const'

export const getCalenderEvents = async () => {
  // const response = await axios.get('/calenderEvents');
  // return response.data;
  return TEST_EVENTS
};

export const createCalenderEvents = async (calendarEvent: EventInfo) => {
  // const response = await axios.post('/calenderEvents', newEntity);
  // return response.data;
  return calendarEvent;
};

export const updateCalenderEventsById = async (id: number, calendarEvent: EventInfo) => {
  // const response = await axios.put(`/calenderEvents/${id}`, updatedEntity);
  // return response.data;
  return {id: id, calendarEvent: calendarEvent}
};

export const deleteCalenderEventsById = async (id: number) => {
  // const response = await axios.delete(`/calenderEvents/${id}`);
  // return response.data;
  return id
};