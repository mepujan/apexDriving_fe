import axios from "axios";
import baseUrl from "../url.js";
const scheduleUrl = baseUrl + "/api/student/booking";
const UserInfo = JSON.parse(localStorage.getItem("loggedInUser"));

const schedule = async () => {
  const response = await axios.get(scheduleUrl,
    {
        headers:{
            Authorization: 'Bearer ' + UserInfo.token
        }
    }
    );
  return response.data;
};

export default {schedule} ;
