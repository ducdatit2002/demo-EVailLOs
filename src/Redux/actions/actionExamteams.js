import { SET_DATA_EXAMTEAMS, SET_TEAMS } from "../constant/constantExamteams";
import { examteamsServ } from "../../Services/examteamsService";


const setDataListExamteamsSuccess = (successValue) => {
  return {
    type: SET_DATA_EXAMTEAMS,
    payload: successValue,
  };
};
export const setDataListExamteams = () => {
  return (dispatch) => {
    examteamsServ
      .getDataExamteams()
      .then((res) => {
        // Giả sử res là mảng dữ liệu bạn cần
        dispatch(setDataListExamteamsSuccess(res)); // Nếu cần, sửa thành res.data hoặc tương tự tùy thuộc vào cấu trúc dữ liệu API
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const searchExamteams = (values) => {
  return (dispatch) => {
    if (!values) {
      examteamsServ
        .getDataExamteams()
        .then((res) => {
          dispatch(setDataListExamteamsSuccess(res.data)); // Và cập nhật tại đây
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      examteamsServ
        .searchExamteams(values)
        .then((res) => {
          dispatch(setDataListExamteamsSuccess(res.data)); // Cũng cập nhật tại đây nếu cần
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
export const importExamteams = (data) => {
  return (dispatch) => {
    examteamsServ.importExamteams(data)
      .then((response) => {
        console.log('Import successful', response);
        dispatch(setDataListExamteams()); // Gọi lại action để lấy dữ liệu mới nhất sau khi import
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
