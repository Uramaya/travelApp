import axios from '@/utils/api';
import { Entity } from '@/types'

export const getEntities = async () => {
  const response = await axios.get('/entities');
  return response.data;
};

export const createEntity = async (newEntity: Entity) => {
  const response = await axios.post('/entities', newEntity);
  return response.data;
};

export const updateEntityById = async (id: number, updatedEntity: Entity) => {
  const response = await axios.put(`/entities/${id}`, updatedEntity);
  return response.data;
};

export const deleteEntityById = async (id: number) => {
  const response = await axios.delete(`/entities/${id}`);
  return response.data;
};