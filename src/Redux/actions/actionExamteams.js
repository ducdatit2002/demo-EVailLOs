// actionExamteams
import {
  SET_DATA_EXAMTEAMS,
  UPDATE_EXAM_TEAMS_SCORES,
} from "../constant/constantExamteams";
import { examteamsServ } from "../../Services/examteamsService";

export const setDataListExamteamsSuccess = (successValue) => ({
    type: SET_DATA_EXAMTEAMS,
    payload: successValue,
});
const initialState = {
  dataListExamteams: [],
  examteams: null,
};



export const setDataListExamteams = () => (dispatch) => {
  examteamsServ
      .getDataExamteams()
      .then((res) => {
          // Assuming res is the array of data you need
          dispatch(setDataListExamteamsSuccess(res)); // Use res.data if the data is nested within a 'data' key
      })
      .catch((err) => {
          console.error("Error fetching exam teams:", err);
      });
};



export const searchExamteams = (values) => {
  return (dispatch) => {
    if (!values) {
      examteamsServ
        .getDataExamteams()
        .then((res) => {
          dispatch(setDataListExamteamsSuccess(res.data)); // Và cập nhật tại đây
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      examteamsServ
        .searchCourse(values)
        .then((res) => {
          dispatch(setDataListExamteamsSuccess(res.data)); // Cũng cập nhật tại đây nếu cần
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

// redux/actions.js
export const updateExamTeams = (data) => {
  return {
    type: "UPDATE_EXAM_TEAMS",
    payload: data,
  };
};

export const importExamTeams = (examTeamsData) => {
  return (dispatch) => {
    examteamsServ
      .importExamTeams(examTeamsData) // Use the correct service method
      .then((response) => {
        console.log("Import successful", response);
        dispatch(setDataListExamteams()); // Fetch the updated list
      })
      .catch((error) => {
        console.error("Import failed", error);
      });
  };
};

// Trong actionExamteams
// Trong actionExamteams
export const importExamTeamsScores = (id, scoresData) => {
  return async (dispatch) => {
    try {
      const response = await examteamsServ.importExamTeamsScore(id, { examScore: scoresData });
      console.log("Scores import successful", response);
      dispatch(setDataListExamteams()); // Cập nhật danh sách sau khi import nếu cần
    } catch (error) {
      console.error("Scores import failed", error);
    }
  };
};


// Trong actions.js hoặc actionExamteams.js
export const updateExamTeamsScores = (scoresData) => ({
  type: UPDATE_EXAM_TEAMS_SCORES, // Đảm bảo type này phù hợp với reducer
  payload: scoresData,
});



