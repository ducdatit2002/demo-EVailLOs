import { combineReducers } from "redux";
import { courseReducer } from "./reducerCourse";
import { spinerReducer } from "./reducerSpiner";
import  examteamsReducer  from "./reducerExamTeams";
export let rootReducer = combineReducers({
  courseReducer,
  examteamsReducer,
  spinerReducer
});
