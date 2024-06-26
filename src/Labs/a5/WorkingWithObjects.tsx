import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: 1, name: "Module 1", description: "Learning about NodeJS",
    course: "Web Dev",
  });
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);



  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"
  const MODULE_URL = "http://localhost:4000/a5/module"

  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <br />
      <a href="http://localhost:4000/a5/module">
        Get Module
      </a>
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>
    </div>
  );
}
export default WorkingWithObjects;