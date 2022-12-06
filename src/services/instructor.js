import axios from "axios";
import baseUrl from "../url.js";
const instructorUrl = baseUrl + "/instructor/all";
const availabilityUrl = baseUrl + "/instructor/availability";

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
