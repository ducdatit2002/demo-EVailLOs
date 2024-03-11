import { combineReducers } from "redux";
import { userReducer } from "./reducerUser";
import { courseReducer } from "./reducerCourse";
import { spinerReducer } from "./reducerSpiner";
import { examteamsReducer } from "./reducerExamteam";
import { studentReducer } from "./reducerStudent";

export let rootReducer = combineReducers({
  courseReducer,
  examteamsReducer,
  spinerReducer,
  userReducer,
  studentReducer
});
