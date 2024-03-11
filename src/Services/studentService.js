import { https } from "./configURL";

export const studentServ = {
  editStudent: (id, data) => {
    console.log(`Editing student with ID: ${id}`, data);
    return https
      .put(`/api/student/${id}`, data)
      .then((response) => {
        console.log("Edit response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Edit error:", error);
        throw error;
      });
  },

  getStudent: (id) => {
    console.log(`Getting student with ID: ${id}`);
    return https
      .get(`/api/student/${id}`)
      .then((response) => {
        console.log("Get response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Get error:", error);
        throw error;
      });
  },

  getDataStudent: () => {
    console.log("Getting all students");
    return https
      .get("/api/student")
      .then((response) => {
        console.log("Get all students response:", response.data);
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

  deleteStudent: (id) => {
    console.log(`Deleting student with ID: ${id}`);
    return https
      .delete(`/api/student/${id}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete error:", error);
        throw error;
      });
  },
  importStudents: (data) => {
    console.log("Importing students", data);
    return Promise.all(data.map((item) => https.post("/api/student", item)))
      .then((responses) => {
        console.log("Import responses:", responses);
        return responses.map((res) => res.data);
      })
      .catch((error) => {
        console.error("Import error:", error);
        throw error;
      });
  },
};

//searchStudent: (name) => https.get(`/student/search/${name}`),
