import axios from "axios";

export const api = axios.create({
  baseURL: "https://nodedeploy-api-2l4x.onrender.com",
});
