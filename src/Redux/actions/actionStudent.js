import { SET_DATA_STUDENT, SET_STUDENT } from "../constant/constantStudent.js";
import { studentServ } from "../../Services/studentService.js";

// const setStudentSuccess = (successValue) => {
//   return {
//     type: SET_Student,
//     payload: successValue,
//   };
// };

const setDataListStudentSuccess = (successValue) => {
  return {
    type: SET_DATA_STUDENT,
    payload: successValue,
  };
};
export const setDataListStudent = () => {
  return (dispatch) => {
    studentServ
      .getDataStudent()
      .then((res) => {
        // Giả sử res là mảng dữ liệu bạn cần
        dispatch(setDataListStudentSuccess(res)); // Nếu cần, sửa thành res.data hoặc tương tự tùy thuộc vào cấu trúc dữ liệu API
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const searchStudent = (values) => {
  return (dispatch) => {
    if (!values) {
      studentServ
        .getDataStudent()
        .then((res) => {
          dispatch(setDataListStudentSuccess(res.data)); // Và cập nhật tại đây
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      studentServ
        .searchStudent(values)
        .then((res) => {
          dispatch(setDataListStudentSuccess(res.data)); // Cũng cập nhật tại đây nếu cần
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
export const importStudents = (data) => {
  return (dispatch) => {
    studentServ.importStudents(data)
      .then((response) => {
        console.log('Import successful', response);
        dispatch(setDataListStudent()); // Gọi lại action để lấy dữ liệu mới nhất sau khi import
      })
      .catch((error) => {
        console.error('Import failed', error);
        // Xử lý lỗi tại đây, ví dụ: thông báo cho người dùng
      });
  };
  
};

