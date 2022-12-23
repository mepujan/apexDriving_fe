import axios from "axios";
import baseUrl from "../url.js";
const bookingUrl = baseUrl + "/api/booking";
const UserInfo = JSON.parse(localStorage.getItem("loggedInUser"));

const booking = async (body) => {
  const response = await axios.post(bookingUrl, body, 
    {
      headers:{
          Authorization: 'Bearer ' + UserInfo.token
      }
    }
  );
  return response.data;
};

// eslint-disable-next-line
export default { booking };
