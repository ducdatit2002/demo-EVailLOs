import { SET_DATA_EXAMTEAMS, SET_EXAMTEAMS } from "../constant/constantExamteams";

const initialState = {
  examTeamsList: [], // Ensure this is included
  examteams: null,
};

const examteamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IMPORT_EXAM_TEAMS':
      return {
        ...state,
        examTeamsList: action.payload,
      };
    case SET_EXAMTEAMS:
      return {
        ...state,
        examteams: action.payload,
      };
    case SET_DATA_EXAMTEAMS:
      return {
        ...state,
        examTeamsList: action.payload,
      };
    default:
      return state; // No need to do anything, just return the current state
  }
};

export default examteamsReducer;
