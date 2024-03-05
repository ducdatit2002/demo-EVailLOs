import { SET_DATA_COURSE, SET_COURSE } from "../constant/constantCourse";

let initialState = {
  dataListCourse: [],
  course: null, // Đảm bảo initialState phản ánh tất cả dữ liệu bạn muốn lưu
};

export const courseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COURSE:
      return { ...state, course: payload };
    case SET_DATA_COURSE:
      return { ...state, dataListCourse: payload };
    default:
      return state; // Không cần phải làm gì, chỉ trả về state hiện tại
  }
};
