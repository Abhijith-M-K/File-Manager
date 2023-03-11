import axios from "axios";

export const BaseUrl = "http://localhost:5000";

const API = axios.create({ baseURL: BaseUrl });

export const formSubmit = async (values) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/api/user/uploadfile", values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response);
};

export const deleteFile = async (id, userId) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/api/user/deleteFile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response, "hiiiiiiii");
  // return API.delete(`/api/user/deleteFile/${id}/${userId}`)
};
