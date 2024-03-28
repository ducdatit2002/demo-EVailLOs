import { https } from "./configURL";

export const examteamsServ = {
  editExamteams: (id, data) => {
    console.log(`Editing Examteams with ID: ${id}`, data);
    return https
      .put(`/api/examteams/${id}`, data)
      .then((response) => {
        console.log("Edit response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Edit error:", error);
        throw error;
      });
  },

  getExamteams: (id) => {
    console.log(`Getting Examteams with ID: ${id}`);
    return https
      .get(`/api/examteams/${id}`)
      .then((response) => {
        console.log("Get response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Get error:", error);
        throw error;
      });
  },

  getDataExamteams: () => {
    console.log("Getting all Examteams");
    return https
      .get("/api/examteams")
      .then((response) => {
        console.log("Get all Examteams response:", response.data);
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          console.error("Unexpected response structure", response.data);
          throw new Error(
            "Unexpected response structure: " +
              JSON.stringify(response.data, null, 2)
          );
        }
      })
      .catch((error) => {
        console.error(
          "API call failed",
          error.response || error.message || error
        );
        throw error;
      });
  },

  deleteExamTeam: (id) => {
    console.log(`Deleting Examteam with ID: ${id}`);
    return https
      .delete(`/api/examteams/${id}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete error:", error);
        throw error;
      });
  },
  importExamTeams: (data) => {
    return https
      .post("/api/examteams/", data) // Make sure the endpoint matches your API
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  // Trong hàm importExamTeamsScore của examteamsService
  importExamTeamsScore: (id, data) => {
    return https
      .put(`/api/examteams/${id}`, data) // Thay đổi endpoint này để phản ánh cập nhật điểm
      .then((response) => {
        console.log("Import Exam Teams Score response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Import Exam Teams Score error:", error);
        throw error;
      });
  },
};
