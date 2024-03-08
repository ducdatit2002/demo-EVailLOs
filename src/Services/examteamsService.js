import { https } from "./configURL";

export const examteamsServ = {
  editExamteams: (id, data) => {
    console.log(`Editing examteams with ID: ${id}`, data);
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
    console.log(`Getting examteams with ID: ${id}`);
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
    console.log("Getting all examteams");
    return https
      .get("/api/examteams")
      .then((response) => {
        console.log("Get all examteams response:", response.data);
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

  deleteExamteams: (id) => {
    console.log(`Deleting examteams with ID: ${id}`);
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
  importExamteams: (data) => {
    console.log("Importing examteams", data);
    return Promise.all(data.map((item) => https.post("/api/examteams", item)))
      .then((responses) => {
        console.log("Import responses:", responses);
        return responses.map((res) => res.data);
      })
      .catch((error) => {
        console.error("Import error:", error);
        throw error;
      });
  },
  importExamTeams: (data) => {
    console.log("Importing exam teams", data);
    return https
      .post("/api/examteams", data) // Adjust the endpoint as necessary
      .then((response) => {
        console.log("Import exam teams response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Import exam teams error:", error);
        throw error;
      });
  },
};

