//import { courses } from "../Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import ModuleList from "./Modules/List";
import { useState, useEffect } from "react";
import axios from "axios";


function Courses() {
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
const COURSES_API = `${API_BASE}/api/courses`;
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

console.log(`Requesting course with ID: ${courseId}`);
console.log(`Constructed URL: ${COURSES_API}/${courseId}`);


 useEffect(() => {
  if (courseId) {
    findCourseById(courseId);
  }
}, [courseId]);

  return (
    <>
    <h1><HiMiniBars3 /> Course {course?.name}</h1>
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <CourseNavigation />
      <div>
        <div
        className="overflow-y-scroll position-fixed bottom-0 end-0"
        style={{ left: "320px", top: "50px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<ModuleList/>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
    </>
);}

export default Courses;
