import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import Admin from "./Admin/Admin";
import Spiner from "./Components/Spiner/Spiner";
import Course from "./Admin/Course/Course";
import CourseEdit from "./Admin/Course/CourseEdit";
import CourseAddNew from "./Admin/Course/CourseAddNew";
import AlwaysTop from "./Components/ScrollTop/AlwaysTop";
function App() {
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
      <AlwaysTop/>
        <Routes>
        <Route path="/" element={<Admin Component={Course} />} />
          <Route path="/admin" exact element={<Admin Component={Course} />} />
          <Route
            path="/admin/course"
            exact
            element={<Admin Component={Course} />}
          />
          <Route
            path="/admin/course/edit/:id"
            exact
            element={<Admin Component={CourseEdit} />}
          />
          <Route
            path="/admin/course/addnew"
            exact
            element={<Admin Component={CourseAddNew} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
