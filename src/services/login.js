import axios from "axios";
import baseUrl from "../url.js";
const loginUrl = baseUrl + "/login";

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

export default { login };
