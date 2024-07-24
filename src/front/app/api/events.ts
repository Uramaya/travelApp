"use"
import axios from '@/utils/api';
import { EventList, EventListItem } from '@/types'
import { EVENTLIST } from '@/const'
import { getEventDetail } from '@/utils/utils'

export const getEvents = async () => {
  const response = await axios.get('http://localhost:13000/api/events/');
  return response.data;
};

export const getEventById = async (id: number | string ) => {
  const response = await axios.get(`http://localhost:13000/api/events/${id}`);
  return response.data;
};

export const createEvents = async (eventItem: EventListItem) => {
  // const response = await axios.post('/events', newEntity);
  // return response.data;
  return eventItem
};

export const updateEventsById = async (id: number | string, event: EventListItem) => {
  // const response = await axios.put(`/events/${id}`, updatedEntity);
  // return response.data;
  return {id: Number(id), event: event}
};

export const deleteEventsById = async (id: number | string) => {
  // const response = await axios.delete(`/events/${id}`);
  // return response.data;
  return Number(id)
};