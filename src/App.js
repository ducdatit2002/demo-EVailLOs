import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import Admin from "./Admin/Admin";
import Spiner from "./Components/Spiner/Spiner";
import Course from "./Admin/Course/Course";
import CourseEdit from "./Admin/Course/CourseEdit";
import ExamTeams from "./Admin/ExamTeams/ExamTeams";
import ExamTeamsEdit from "./Admin/ExamTeams/ExamTeamsEdit";
import ExamTeamsScore from "./Admin/ExamTeams/ExamTeamsScore";
import User from "./Admin/User/User";
import UserEdit from "./Admin/User/UserEdit";
import UserAddNew from "./Admin/User/UserAddNew";
import Students from "./Admin/Students/Students";
import AlwaysTop from "./Components/ScrollTop/AlwaysTop";
import AnswerStructureEdit from "./Admin/AnswerStructure/AnswerStructureEdit";
import LoginPage from "./LoginPage/LoginPage";

// Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
const isAuthenticated = () => {
  const userInfo = sessionStorage.getItem("USER_INFO");
  return !!userInfo;
};

function App() {
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
        <AlwaysTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              isAuthenticated() ? (
                <Admin Component={Course} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/user"
            element={
              isAuthenticated() ? (
                <Admin Component={User} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/user/edit/:id"
            element={
              isAuthenticated() ? (
                <Admin Component={UserEdit} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/user/addnew"
            element={
              isAuthenticated() ? (
                <Admin Component={UserAddNew} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/course"
            element={
              isAuthenticated() ? (
                <Admin Component={Course} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/course/edit/:id"
            element={
              isAuthenticated() ? (
                <Admin Component={CourseEdit} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/examteams"
            element={
              isAuthenticated() ? (
                <Admin Component={ExamTeams} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/examteams/edit/:id"
            element={
              isAuthenticated() ? (
                <Admin Component={ExamTeamsEdit} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/examteams/examteamsscore/:id"
            element={
              isAuthenticated() ? (
                <Admin Component={ExamTeamsScore} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/students"
            element={
              isAuthenticated() ? (
                <Admin Component={Students} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/answerStructure/:id"
            element={
              isAuthenticated() ? (
                <Admin Component={AnswerStructureEdit} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
