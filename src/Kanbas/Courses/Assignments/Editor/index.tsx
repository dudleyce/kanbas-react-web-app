import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaTrash } from "react-icons/fa";
//import { assignments } from "../../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} from "../reducer";
import { KanbasState } from "../../../store";

function AssignmentEditor() {
  const dispatch = useDispatch();
  const { assignmentId } = useParams();
  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments.find((a) => a._id === assignmentId)
  );
  //const assignment = assignments.find(
  //  (assignment) => assignment._id === assignmentId);
  const { cid } = useParams<{ cid: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState(assignment?.title || "");

  useEffect(() => {
    // Update title state when assignment changes
    setTitle(assignment?.title || "");
  }, [assignment]);

  const [assignmentDetails, setAssignmentDetails] = useState({
    title: assignment?.title || "",
    course: assignment?.course || cid,
  });

  const handleSave = () => {
    dispatch(updateAssignment({
      _id: assignmentId,
      title: title, // Update with the current input field value
      course: cid,
    }));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddAssignment = () => {
    dispatch(addAssignment({
      _id: `A${Math.random().toString().substr(2, 4)}`, // Example ID generation
      title,
      course: cid, // Use course ID from URL
    }));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAssignment(deleteId));
    setShowConfirmation(false);
    navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to assignments page
};

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Add confirmation dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
        <p>Are you sure you want to delete this assignment?</p>
        <button onClick={handleConfirmDelete}>Yes</button>
        <button onClick={handleCancelDelete}>No</button>
        <button onClick={() => setShowConfirmation(false)}>Cancel</button>
      </div>
      )}
    <div>
      <h2>Assignment Name</h2>
      <input value={title}
            onChange={(e) => setTitle(e.target.value)}
             className="form-control mb-2"
             placeholder = "Title" />
      <input
      placeholder = "Name"
      className = "form-control mb-2"
      />
      <br />
      <textarea
      placeholder = "Description"
      className = "form-control mb-2"
      />
      <br />
      <input 
        placeholder="Points" 
        type="number"
        className="form-control mb-2" 
      />
      <br />
      <label htmlFor="dueDate" className="form-label">Due Date</label>
      <input 
        placeholder="Due Date" 
        type="date"
        className="form-control mb-2" 
      />
      <br />
      <label htmlFor="availableFromDate" className="form-label">Available From Date</label>
  
      <input 
        placeholder="Available From Date" 
        type="date"
        className="form-control mb-2" 
      />
      <br />
      <label htmlFor="availableUntilDate" className="form-label">Available Until Date</label>
      <input 
        placeholder="Available Until Date" 
        type="date"
        className="form-control mb-2" 
      />
      <br />
      <button onClick={handleAddAssignment} className="btn btn-success ms-2 float-end">
        Add
      </button>
      <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
      </button>
      <button onClick={handleCancel} className="btn btn-danger float-end">
        Cancel
      </button>
      <button onClick={() => handleDelete(assignment._id)} className="btn btn-danger float-end">
          <FaTrash />
        </button>
    </div>
    </>
  );
}
export default AssignmentEditor;