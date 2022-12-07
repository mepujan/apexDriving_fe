import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import instructorService from "../services/instructor";
import arrayService from "../services/transposeArray";
import Notification from "../components/Notification";

const Instructors = () => {
  const [error, setError] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [availability, setAvailability] = useState(null);
  const [availableTime, setAvailableTime] = useState([]);
  useEffect(() => {
    (async () => {
      const returnedInstructor = await instructorService.getInstructor();
      setInstructors(returnedInstructor);
    })();
  }, []);

  const handleDropdown = async (event) => {
    try {
      setSelectValue(event.target.value);
      const schedule = await instructorService.getAvailability({
        id: event.target.value,
      });
      setAvailability(schedule);
      if (schedule) {
        const result = schedule.map((days) =>
          availableTime.concat(days.timeslot)
        );
        setAvailableTime(arrayService.transpose(result));
      }
    } catch (error) {
      setError("No availablity Found");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <div>
        <Link to="/booking">
          <button type="button">Book an appointment</button>
        </Link>

        <select
          name="instructorlist"
          id="instructorslist"
          value={selectValue}
          onChange={handleDropdown}
        >
          <option value="#">Choose an instructor</option>
          {instructors.map((elem) => (
            <option value={elem._id}>{elem.full_name}</option>
          ))}
        </select>

        <Link to="/appointment">
          <button type="button">View my appointment</button>
        </Link>
      </div>

      <Notification message={error} />
      {availability && (
        <table>
          <tr>
            {availability.map((header) => (
              <th>{header.weekday}</th>
            ))}
          </tr>
          {availableTime.map((elements) => (
            <tr>
              {elements.map((time) => {
                const time1 = time.slice(0, 2);
                const time2 = time.slice(2);
                return <td>{time1 + ":" + time2}</td>;
              })}
            </tr>
          ))}
        </table>
      )}
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <Header />
      <Instructors />
    </>
  );
};

export default HomePage;
