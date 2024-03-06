import { https } from "./configURL";

export const answerStructureServ = {
  editAnswerStructure: (id, data) => {
    console.log(`Editing answer structure with ID: ${id}`, data);
    return https.put(`/api/answerStructure/${id}`, data)
      .then(response => {
        console.log('Edit response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Edit error:', error);
        throw error;
      });
  },

  getAnswerStructure: (id) => {
    console.log(`Getting answer structure with ID: ${id}`);
    return https.get(`/api/answerStructure/${id}`)
      .then(response => {
        console.log('Get response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Get error:', error);
        throw error;
      });
  },

  getDataAnswerStructure: () => {
    console.log('Getting all answer structure data');
    return https
    .get("/api/course")
    .then((response) => {
      console.log('Get all answer structure response:', response.data);
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

  deleteAnswerStructure: (id) => {
    console.log(`Deleting answerstructure with ID: ${id}`);
    return https.delete(`/api/answerStructure/${id}`)
      .then(response => {
        console.log('Delete response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Delete error:', error);
        throw error;
      });
  },
  importAnswerStrutures: (data) => {
    console.log('Importing answer structures', data);
    return Promise.all(data.map(item => 
      https.post('/api/answerStructure', item)
    ))
    .then(responses => {
      console.log('Import responses:', responses);
      return responses.map(res => res.data);
    })
    .catch(error => {
      console.error('Import error:', error);
      throw error;
    });
  },

};



