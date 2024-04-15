import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector


import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} from "./reducer";
import { KanbasState } from "../../store"; 

function Assignments() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch(); // Use if you need to dispatch actions

 
  const assignmentList = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments.filter(assignment => assignment.course === courseId));

  


  return (
    <>
      {/* Existing JSX */}
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          {/* Existing header and icons */}
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <Link to={`/Kanbas/Courses/${courseId}/Assignments/Editor`}>
                <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
              </Link>
            </span>
          </div>
          
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item" key={assignment._id}>
                <FaEllipsisV className="me-2" />
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                  {assignment.title}
                </Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
