import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import Admin from "./Admin/Admin";
import Spiner from "./Components/Spiner/Spiner";
import Course from "./Admin/Course/Course";
import CourseEdit from "./Admin/Course/CourseEdit";
import CourseEdit3 from "./Admin/Course/CourseEdit3";
import ExamTeams from "./Admin/ExamTeams/ExamTeams";
import ExamTeamsEdit from "./Admin/ExamTeams/ExamTeamsEdit";
import Students from "./Admin/Students/Students";
import AlwaysTop from "./Components/ScrollTop/AlwaysTop";
import AnswerStructureEdit from "./Admin/AnswerStructure/AnswerStructureEdit";
function App() {
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
        <AlwaysTop />
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
            path="/admin/course/edit3/:id"
            exact
            element={<Admin Component={CourseEdit3} />}
          />
          <Route
            path="/admin/examteams"
            exact
            element={<Admin Component={ExamTeams} />}
          />
          <Route
            path="/admin/examteams/edit/:id"
            exact
            element={<Admin Component={ExamTeamsEdit} />}
          />
          <Route
            path="/admin/students"
            exact
            element={<Admin Component={Students} />}
          />
           <Route
            path="/admin/answerStructure/:id"
            exact
            element={<Admin Component={AnswerStructureEdit} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
