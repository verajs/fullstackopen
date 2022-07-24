import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (data) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, data, config);
  return request.then((response) => response.data);
};

const putBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${data.id}`, data, config);
  return request.then((response) => response.data);
};

const deleteBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${data.id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, postBlog, setToken, putBlog, deleteBlog };
