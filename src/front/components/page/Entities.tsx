import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from "@/stores/store"
import { setEntities, addEntity, updateEntity, deleteEntity } from "@/stores/entities";
import { getEntities, createEntity, updateEntityById, deleteEntityById } from "@/hooks/entities";
import { Entity } from '@/types'

// This is the sample code
const Entities = () => {
  const dispatch = useDispatch<AppDispatch>()
  const entities = useAppSelector((state) => state.entitiesReducer)

  useEffect(() => {
    // Fetch entities on component mount
    getEntities().then((data) => dispatch(setEntities(data)));
  }, [dispatch]);

  const handleCreateEntity = async () => {
    const newEntity: Entity = { id: 1, name: 'New Entity' };
    const createdEntity = await createEntity(newEntity);
    dispatch(addEntity(createdEntity));
  };

  const handleUpdateEntity = async (id: number, updatedName: string) => {
    const updatedEntity = { id: 1, name: updatedName };
    const updatedData = await updateEntityById(id, updatedEntity);
    dispatch(updateEntity({ id, updatedEntity: updatedData }));
  };

  const handleDeleteEntity = async (id: number) => {
    await deleteEntityById(id);
    dispatch(deleteEntity(id));
  };

  return (
    <div>
      <h1>Entity List</h1>
      {entities.map((entity: Entity) => (
        <div key={entity.id}>
          <span>{entity.name}</span>
          <button onClick={() => handleUpdateEntity(entity.id, entity.name)}>Update</button>
          <button onClick={() => handleDeleteEntity(entity.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleCreateEntity}>Create Entity</button>
    </div>
  );
};

export default Entities;