import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import instructorService from "../services/instructor";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  //const [setAvailability, setAvailability] = useState("")

  useEffect(() => {
    (async () => {
      const returnedInstructor = await instructorService.getInstructor();
      setInstructors(returnedInstructor);
      setSelectValue(instructors[0]._id);
    })();
  }, []);

  const handleDropdown = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="instructorslist">Choose a instructor:</label>
      <select
        name="instructorlist"
        id="instructorslist"
        value={selectValue}
        onChange={handleDropdown}
      >
        {instructors.map((elem) => (
          <option value={elem._id}>{elem.full_name}</option>
        ))}
      </select>
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
