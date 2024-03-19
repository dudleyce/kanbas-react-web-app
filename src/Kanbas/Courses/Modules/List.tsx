import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./reducer";
import { KanbasState } from "../../store";

// Define ModuleType inline
interface ModuleType {
  _id: string;
  name: string;
  description: string;
  course: string;
}

// ModuleItem component for rendering individual module items
const ModuleItem = ({ module }: { module: ModuleType }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModule(module));
  };

  const handleDelete = () => {
    dispatch(deleteModule(module._id));
  };

  return (
    <li className="list-group-item">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <h3>{module.name}</h3>
      <p>{module.description}</p>
    </li>
  );
};

// ModuleList component for rendering the list of modules
const ModuleList = () => {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules);
  const module: ModuleType = useSelector((state: KanbasState) => state.modulesReducer.module);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    dispatch(addModule({ ...module, course: courseId }));
  };

  const handleUpdateModule = () => {
    dispatch(updateModule(module));
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button onClick={handleAddModule}>Add</button>
        <button onClick={handleUpdateModule}>Update</button>
        <input
          value={module.name}
          onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
        />
        <textarea
          value={module.description}
          onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
        />
      </li>
      {moduleList
        .filter((module) => module.course === courseId)
        .map((module, index) => (
          <ModuleItem key={index} module={module} />
        ))}
    </ul>
  );
};

export default ModuleList;