import axios from "axios";
import baseUrl from "../url.js";
const scheduleUrl = baseUrl + "/api/student/booking";
const token = localStorage.getItem("token");

const schedule = async () => {
  const response = await axios.get(scheduleUrl,
    {
        headers:{
            Authorization: 'Bearer' + token
        }
    });
  console.log(response.data);
  return response.data;
};

export default {schedule} ;
