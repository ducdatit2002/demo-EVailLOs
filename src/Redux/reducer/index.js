import { combineReducers } from "redux";
import { courseReducer } from "./reducerCourse";
import { spinerReducer } from "./reducerSpiner";
export let rootReducer = combineReducers({
  courseReducer,
  spinerReducer
});
