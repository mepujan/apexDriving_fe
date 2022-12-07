import axios from "axios";
import baseUrl from "../url.js";
const bookingUrl = baseUrl + "/api/booking";

const booking = async (credentials) => {
  const response = await axios.post(bookingUrl, credentials);
  console.log(response.data);
  return response.data;
};

export default { booking };
