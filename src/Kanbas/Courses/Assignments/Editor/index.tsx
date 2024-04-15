import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios"; // Import AxiosError for typing errors
import * as assignmentService from "../service"; // Adjust the path as necessary

interface AssignmentDetails {
  _id?: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

function AssignmentEditor() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
    title: "",
    course: courseId as string,
    description: "",
    points: 0,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
  });

  console.log(`Fetching assignment with ID: ${assignmentId}`);

  useEffect(() => {
    if (assignmentId) {
      assignmentService.getAssignmentById(assignmentId)
        .then(setAssignmentDetails)
        .catch((error: AxiosError) => console.error("Failed to fetch assignment", error));
    }
  }, [assignmentId]);

  const handleSave = async () => {
    try {
      const data = assignmentId
        ? await assignmentService.updateAssignment(assignmentId, assignmentDetails)
        : await assignmentService.createAssignment(assignmentDetails);
      console.log("Operation successful", data);
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    } catch (error) {
      console.error("Failed to save the assignment", error);
    }
  };

  // Include other UI logic and handlers as needed...

  return (
    <div>
      {/* UI for editing/adding assignment */}
      <h2>Assignment Editor</h2>
      <input
        name="title"
        value={assignmentDetails.title}
        onChange={e => setAssignmentDetails({...assignmentDetails, title: e.target.value})}
        className="form-control mb-2"
        placeholder="Title"
      />
      {/* Add more input fields for other properties */}
      <button onClick={handleSave} className="btn btn-success">
  Save
</button>
      <button onClick={() => navigate(-1)} className="btn btn-danger">
        Cancel
      </button>
    </div>
  );
}

export default AssignmentEditor;
