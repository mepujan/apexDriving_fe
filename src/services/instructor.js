import axios from "axios";
import baseUrl from "../url.js";
const instructorUrl = baseUrl + "/api/instructor/all";
const availabilityUrl = baseUrl + "/api/instructor/availability";

const getInstructor = async () => {
  const response = await axios.get(instructorUrl);
  return response.data;
};

const getAvailability = async (body) => {
  const response = await axios.post(availabilityUrl, body);
  console.log(response.data);
  return response.data;
};

export default { getInstructor, getAvailability };
