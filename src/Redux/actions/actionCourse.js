import { SET_DATA_COURSE, SET_COURSE } from "../constant/constantCourse";
import { courseServ } from "../../Services/courseService";

// const setCourseSuccess = (successValue) => {
//   return {
//     type: SET_COURSE,
//     payload: successValue,
//   };
// };

const setDataListCourseSuccess = (successValue) => {
  return {
    type: SET_DATA_COURSE,
    payload: successValue,
  };
};
export const setDataListCourse = () => {
  return (dispatch) => {
    courseServ
      .getDataCourse()
      .then((res) => {
        // Giả sử res là mảng dữ liệu bạn cần
        dispatch(setDataListCourseSuccess(res)); // Nếu cần, sửa thành res.data hoặc tương tự tùy thuộc vào cấu trúc dữ liệu API
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const searchCourse = (values) => {
  return (dispatch) => {
    if (!values) {
      courseServ
        .getDataCourse()
        .then((res) => {
          dispatch(setDataListCourseSuccess(res.data)); // Và cập nhật tại đây
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      courseServ
        .searchCourse(values)
        .then((res) => {
          dispatch(setDataListCourseSuccess(res.data)); // Cũng cập nhật tại đây nếu cần
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
export const importCourses = (data) => {
  return (dispatch) => {
    courseServ.importCourses(data)
      .then((response) => {
        console.log('Import successful', response);
        dispatch(setDataListCourse()); // Gọi lại action để lấy dữ liệu mới nhất sau khi import
      })
      .catch((error) => {
        console.error('Import failed', error);
        // Xử lý lỗi tại đây, ví dụ: thông báo cho người dùng
      });
  };
  
};

export const importExamTeams = (examTeamsData) => {
  return {
    type: 'IMPORT_EXAM_TEAMS',
    payload: examTeamsData,
  };
};

// redux/actions.js
export const updateExamTeams = (data) => {
  return {
    type: 'UPDATE_EXAM_TEAMS',
    payload: data,
  };
};
