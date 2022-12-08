import axios from "axios";
import baseUrl from "../url.js";
const signupUrl = baseUrl + "/api/signup";

const signup = async (credentials) => {
  const response = await axios.post(signupUrl, credentials);
  return response.data;
};

export default { signup };
