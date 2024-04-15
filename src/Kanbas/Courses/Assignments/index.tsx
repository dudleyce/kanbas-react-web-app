import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector


import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} from "./reducer.js";
import { KanbasState } from "../../store"; 

function Assignments() {
  const { courseId } = useParams<{ courseId: string }>();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
  const dispatch = useDispatch(); // Use if you need to dispatch actions

  
  const handleDelete = (assignmentID: string) => {
    if (window.confirm("Do you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentID));
    }
  };
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
            {assignmentList.filter((assignment) =>
              assignment.course === courseId).map((assignment) => (
                <li className="list-group-item">
                  <div className="d-flex">
                    <div className="wd-assignment-item-padding">
                      <FaEllipsisV className="me-2" />
                    </div>
                    <div className="wd-assignment-item-padding">
                      <FaEllipsisV className="me-2"  />
                    </div>
                    <div className="flex-fill wd-assignment-text-padding">
                      <h4><Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="wd-assignment-title-link" onClick={() => dispatch(selectAssignment(assignment))}>{assignment.title}</Link></h4>
                      <span className="wd-red-link">Multiple Modules</span> | Week starting on {assignment.start} |<br />
                      Due {assignment.due} at 11:59 PM | {assignment.points} pts
                    </div>
                    <div className="wd-assignment-item-padding">
                      <button className="wd-red-button" onClick={() => handleDelete(assignment._id)}>Delete</button>
                      <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></div>
                  </div>
                </li>))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
