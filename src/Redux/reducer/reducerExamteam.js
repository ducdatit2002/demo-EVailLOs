// reducerExamteam
import {
  SET_DATA_EXAMTEAMS,
  SET_EXAMTEAMS,
} from "../constant/constantExamteams";

const initialState = {
  dataListExamteams: [],
  examteams: null,
};

export const examteamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXAMTEAMS:
      return { ...state, examteams: action.payload };
    case SET_DATA_EXAMTEAMS:
      return { ...state, dataListExamteams: action.payload };
    default:
      return state;
  }
};
