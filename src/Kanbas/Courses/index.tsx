import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
// import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import ModuleList from "./Modules/List";


function Courses() {
  
  const { courseId } = useParams();
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  return (
    <>
    <h1><HiMiniBars3 /> Course {course?.name}</h1>
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <CourseNavigation />
      <div>
        <div
        className="overflow-y-scroll position-fixed bottom-0 end-0">
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
