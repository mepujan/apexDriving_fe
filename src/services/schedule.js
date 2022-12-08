import axios from "axios";
import baseUrl from "../url.js";
const scheduleUrl = baseUrl + "/api/student/booking";
const token = localStorage.getItem("token");
console.log("token:", token)

const schedule = async () => {
  const response = await axios.get(scheduleUrl,
    {
        headers:{
            Authorization: 'Bearer ' + token
        }
    }
    );
  console.log("Called response: ", response);
  return response.data;
};

export default {schedule} ;
