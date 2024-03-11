import { SET_DATA_USER } from "../constant/constantUser";
import { userServ } from "../../Services/userService";



const setDataListUserSuccess = (users) => {
  return {
    type: SET_DATA_USER,
    payload: users,
  };
};

export const fetchDataUsers = () => (dispatch) => {
  userServ.getDataUser()
    .then(res => {
      dispatch(setDataListUserSuccess(res.data)); // Sử dụng dữ liệu trực tiếp từ phản hồi
    })
    .catch(error => {
      console.error('fetchDataUsers error:', error);
    });
};

export const setDataListUser = () => {
  return (dispatch) => {
    userServ.getDataUser()
      .then((res) => {
        dispatch(setDataListUserSuccess(res.data)); // Sử dụng dữ liệu trực tiếp từ phản hồi
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const searchUser = (values) => {
  return (dispatch) => {
    const fetchAction = values ? userServ.searchUser(values) : userServ.getDataUser();
    fetchAction.then((res) => {
        dispatch(setDataListUserSuccess(res.data)); // Sử dụng dữ liệu trực tiếp từ phản hồi cho cả tìm kiếm và lấy toàn bộ danh sách
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
