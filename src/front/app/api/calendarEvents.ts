import axios from '@/utils/api';
import { EventInfo } from '@/types'
import { TEST_EVENTS } from '@/const'

export const getCalenderEvents = async () => {
  // const response = await axios.get('/calenderEvents');
  // return response.data;
  return TEST_EVENTS
};

export const createCalenderEvents = async (newEntity: EventInfo) => {
  // const response = await axios.post('/calenderEvents', newEntity);
  // return response.data;
};

export const updateCalenderEventsById = async (id: number, updatedEntity: EventInfo) => {
  // const response = await axios.put(`/calenderEvents/${id}`, updatedEntity);
  // return response.data;
};

export const deleteCalenderEventsById = async (id: number) => {
  // const response = await axios.delete(`/calenderEvents/${id}`);
  // return response.data;
};