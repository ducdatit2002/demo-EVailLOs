// Inside your examTeamsReducer.js or wherever your reducer is defined
const initialState = {
    examTeamsList: [], // Ensure this is included
  };
  
  const examTeamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IMPORT_EXAM_TEAMS':
            return {
              ...state,
              examTeamsList: action.payload,
            };      default:
        return state;
    }
  };
  
  export default examTeamsReducer;
  

