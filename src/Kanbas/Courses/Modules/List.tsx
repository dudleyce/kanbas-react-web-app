import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule, setModules } from "./reducer";
// import { findModulesForCourse, createModule } from "./client";
import { KanbasState } from "../../store";
import * as client from "./client";

interface ModuleType {
  _id: string;
  name: string;
  description: string;
  course: string;
}


const ModuleItem = ({ module }: { module: ModuleType }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModule(module));
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };


  return (
    <li className="list-group-item">
      <button onClick={handleEdit}>Edit</button>
      <button
              onClick={() => handleDeleteModule(module._id)} >
              Delete </button>
      <h3>{module.name}</h3>
      <p>{module.description}</p>
    </li>
  );
};

const ModuleList = () => {
  const { courseId } = useParams();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  
  const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules);
  const module: ModuleType = useSelector((state: KanbasState) => state.modulesReducer.module);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };


  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
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