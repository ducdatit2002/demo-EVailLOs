import { https } from "./configURL";

export const courseServ = {
  editCourse: (id, data) => {
    console.log(`Editing course with ID: ${id}`, data);
    return https
      .put(`/api/course/${id}`, data)
      .then((response) => {
        console.log("Edit response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Edit error:", error);
        throw error;
      });
  },

  getCourse: (id) => {
    console.log(`Getting course with ID: ${id}`);
    return https
      .get(`/api/course/${id}`)
      .then((response) => {
        console.log("Get response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Get error:", error);
        throw error;
      });
  },

  getDataCourse: () => {
    console.log("Getting all courses");
    return https
      .get("/api/course")
      .then((response) => {
        console.log("Get all courses response:", response.data);
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

  deleteCourse: (id) => {
    console.log(`Deleting course with ID: ${id}`);
    return https
      .delete(`/api/course/${id}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete error:", error);
        throw error;
      });
  },
  importCourses: (data) => {
    console.log("Importing courses", data);
    return Promise.all(data.map((item) => https.post("/api/course", item)))
      .then((responses) => {
        console.log("Import responses:", responses);
        return responses.map((res) => res.data);
      })
      .catch((error) => {
        console.error("Import error:", error);
        throw error;
      });
  },
  // Add to courseService.js
  importExamTeams: (data) => {
    console.log("Importing exam teams", data);
    return https
      .post("/api/course", data) // Adjust the endpoint as necessary
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

//searchCourse: (name) => https.get(`/course/search/${name}`),
