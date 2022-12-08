import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import instructorService from "../services/instructor";
import arrayService from "../services/transposeArray";
import Notification from "../components/Notification";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://apexdriving.fly.dev/">
        ApexDriving
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Stack
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Link to="/booking" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Book an appointment</Button>
          </Link>

          <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Choose an instructor
            </InputLabel>
            <Select
              id="instructorslist"
              value={selectValue}
              onChange={handleDropdown}
            >
              {instructors.map((elem) => (
                <MenuItem value={elem._id}>{elem.full_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <Button variant="contained">View my appointment</Button>
          </Link>
        </Stack>
        <br />
        <Notification message={error} />
        {availability && (
          <Box>
            <Toolbar />
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <StyledTableRow>
                    {availability.map((header) => (
                      <StyledTableCell key={header.weekday}>
                        {header.weekday}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {availableTime.map((elements) => (
                    <StyledTableRow>
                      {elements.map((time, index) => {
                        const time1 = time.slice(0, 2);
                        const time2 = time.slice(2);
                        return (
                          <StyledTableCell key={index}>
                            {time1 + ":" + time2}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Copyright sx={{ mt: 3, mb: 2 }} />
      </Box>
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
