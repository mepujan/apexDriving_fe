import axios from "axios";
import baseUrl from "../url.js";
const signupUrl = baseUrl + "/signup";

const signup = async (credentials) => {
  const response = await axios.post(signupUrl, credentials);
  console.log(response.data);
  return response.data;
};

export default { signup };
