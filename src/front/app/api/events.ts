import axios from '@/utils/api';
import { EventInfo } from '@/types'
import { EVENTLIST } from '@/const'

export const getEvents = async () => {
  // const response = await axios.get('/events');
  // return response.data;
  return EVENTLIST
};

export const getEventById = async (id: string | string[] | null ) => {
  // const response = await axios.get('/events');
  // return response.data;
  const id_ = Number(id)
    if(!id_ && id_ !== 0) return
    // TODO: to get event detail from api
    const eventFindInOngoing = EVENTLIST.ongoing.find(eventItem => eventItem.id === id_)
    if(eventFindInOngoing) {
      return eventFindInOngoing
    }
    const eventFindInRecent = EVENTLIST.recent.find(eventItem => eventItem.id === id_)
    if(eventFindInRecent) {
      return eventFindInRecent
    }
    const eventFindInExplore = EVENTLIST.explore.find(eventItem => eventItem.id === id_)
    if(eventFindInExplore) {
      return eventFindInExplore
    }
};

export const createEvents = async (newEntity: EventInfo) => {
  // const response = await axios.post('/events', newEntity);
  // return response.data;
};

export const updateEventsById = async (id: number, updatedEntity: EventInfo) => {
  // const response = await axios.put(`/events/${id}`, updatedEntity);
  // return response.data;
};

export const deleteEventsById = async (id: number) => {
  // const response = await axios.delete(`/events/${id}`);
  // return response.data;
};