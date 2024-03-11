// actionExamteams
import {
  SET_DATA_EXAMTEAMS,
} from "../constant/constantExamteams";
import { examteamsServ } from "../../Services/examteamsService";

export const setDataListExamteamsSuccess = (successValue) => ({
    type: SET_DATA_EXAMTEAMS,
    payload: successValue,
});

// In actionExamteams.js or wherever your actions are defined

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

export const importExamTeamsScores = (scoresData) => {
  return (dispatch) => {
    examteamsServ
      .importExamTeamsScore(scoresData) // Use the correct service method for importing scores
      .then((response) => {
        console.log("Scores import successful", response);
        dispatch(setDataListExamteams()); // Fetch the updated list if necessary
      })
      .catch((error) => {
        console.error("Scores import failed", error);
      });
  };
};
