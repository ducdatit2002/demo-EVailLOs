import { https } from "./configURL";

export const userServ = {
  editUser: (id, data) =>
    https
      .put(`/api/user/${id}`, data)
      .then((response) => {
        console.log("editUser success:", response);
        return response;
      })
      .catch((error) => {
        console.error("editUser error:", error);
        throw error; // Re-throw để có thể xử lý lỗi ở nơi gọi hàm này nếu cần
      }),

  getInfo: (id) =>
    https
      .get(`/api/user/${id}`)
      .then((response) => {
        console.log("getInfo success:", response);
        return response;
      })
      .catch((error) => {
        console.error("getInfo error:", error);
        throw error;
      }),

  getDataUser: () =>
    https
      .get("/api/user")
      .then((response) => {
        console.log("getDataUser success:", response);
        return response;
      })
      .catch((error) => {
        console.error("getDataUser error:", error);
        throw error;
      }),

  searchUser: (name) =>
    https
      .get(`/api/user/search/${name}`)
      .then((response) => {
        console.log("searchUser success:", response);
        return response;
      })
      .catch((error) => {
        console.error("searchUser error:", error);
        throw error;
      }),

  deleteUser: (id) =>
    https
      .delete(`/api/user/${id}`)
      .then((response) => {
        console.log("deleteUser success:", response);
        return response;
      })
      .catch((error) => {
        console.error("deleteUser error:", error);
        throw error;
      }),
  postSign: (data) =>
    https.post(`/api/user`, data).then((response) => {
      console.log("postSign success:", response);
      return response;
    }),
};
