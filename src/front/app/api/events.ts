"use"
import axios from '@/utils/api';
import { EventList, EventListItem } from '@/types'

export const getEvents = async () => {
  const response = await axios.get('http://localhost:13000/api/events/');
  return response.data;
};

export const getCurrentUserAllEvents = async () => {
  const response = await axios.get('http://localhost:13000/api/events/userEvents');
  return response.data;
};

export const getEventById = async (id: number | string ) => {
  const response = await axios.get(`http://localhost:13000/api/events/${id}`);
  return response.data;
};

export const createEvent = async (eventItem: EventListItem) => {
  const response = await axios.post('http://localhost:13000/api/events', eventItem);
  return response.data;
};

export const updateEventsById = async (id: number | string, event: EventListItem) => {
  // const response = await axios.put(`/events/${id}`, updatedEntity);
  // return response.data;
  return {id: Number(id), event: event}
};

export const updateEventTitleById = async (id: number | string, title: string) => {
  const response = await axios.post(`http://localhost:13000/api/events/updateTitle`, {id: Number(id), title: title});
  return response.data;
};

export const deleteEventsById = async (id: number | string) => {
  const response = await axios.delete(`http://localhost:13000/api/events/${id}`);
  return response.data;
};