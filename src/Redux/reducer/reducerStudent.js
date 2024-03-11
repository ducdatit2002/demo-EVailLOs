import { SET_DATA_STUDENT, SET_STUDENT } from "../constant/constantStudent";

let initialState = {
  dataListStudent: [],
  student: null, // Đảm bảo initialState phản ánh tất cả dữ liệu bạn muốn lưu
};

export const studentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_STUDENT:
      return { ...state, student: payload };
    case SET_DATA_STUDENT:
      return { ...state, dataListStudent: payload };
    default:
      return state; // Không cần phải làm gì, chỉ trả về state hiện tại
  }
};
