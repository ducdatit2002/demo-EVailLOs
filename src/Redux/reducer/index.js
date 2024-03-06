import { combineReducers } from "redux";
import { courseReducer } from "./reducerCourse";
import { spinerReducer } from "./reducerSpiner";
import  examTeamsReducer  from "./reducerExamTeams";
export let rootReducer = combineReducers({
  courseReducer,
  examTeamsReducer,
  spinerReducer
});
