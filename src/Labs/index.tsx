import Assignment3 from "./a3";
import Assignment4 from "./a4";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "../Nav";

function Labs() {
return (
<div className = "container-fluid">
    <h1>Labs</h1>
   <Nav />
   <Routes>
    <Route path = "/a3/*" element = {<Assignment3 />} />
    <Route path = "/a4" element = {<Assignment4 />} />
   </Routes>

</div>)
}

export default Labs;