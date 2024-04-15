// assignmentService.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const ASSIGNMENTS_API = `${API_BASE}api/assignments`;
const COURSES_API = `${API_BASE}api/courses`;

export const getAssignmentById = async (assignmentId) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
}


export const createAssignment = async (courseId, assignment) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/assignments`,
  assignment);
  return response.data;
};

export const updateAssignment = async (assignmentId, assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
