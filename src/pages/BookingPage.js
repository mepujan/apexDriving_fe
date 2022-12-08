import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import bookingService from "../services/booking";
import Notification from "../components/Notification";
import baseUrl from "../url.js";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        apexDriving
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const BookingPage = () => {
  const [allInstructors, setAllInstructors] = React.useState([]);
  const [instructor, setInstructor] = React.useState([]);
  const [allAvailability, setAllAvailability] = React.useState([]);
  const [bookedDay, setBookedDay] = React.useState([]);
  const [allStartTime, setAllStartTime] = React.useState([]);
  const [startTime, setStartTime] = React.useState([]);
  //const [bookedSchedule, setBookedSchedule] = React.useState([]);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const getAllInstructors = async () => {
      try {
        const data = await axios.get(baseUrl + "/api/instructor/all");
        console.log(data.data);
        setAllInstructors(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllInstructors();
  }, []);

  React.useEffect(() => {
    const getAllAvailability = async () => {
      try {
        const data = await axios.post(
          baseUrl + "/api/instructor/availability",
          { id: instructor }
        );
        console.log(data.data);
        setAllAvailability(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllAvailability();
  }, [instructor]);

  React.useEffect(() => {
    const getAllStartTime = () => {
      try {
        let index = allAvailability.findIndex((a) => a.weekday === bookedDay);
        console.log("index:", index);
        const times = allAvailability[index].timeslot;
        console.log("time:", times);
        setAllStartTime(times);
      } catch (e) {
        console.log(e);
      }
    };

    getAllStartTime();
  }, [allAvailability, bookedDay]);

  const handleBooking = async (event) => {
    event.preventDefault();
    const data = {
      instructor: instructor,
      bookedDay: bookedDay,
      startTime: startTime,
    };
    try {
      console.log("instructor = ", instructor);
      console.log("bookedDay = ", bookedDay);
      console.log("startTime = ", startTime);
      await bookingService.booking(data);
      navigate("/index");
    } catch (error) {
      console.log(error["message"]);
      setError("Cannot Book Appointment. Something went wrong. Try Again...");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <>
      {error && <Notification message={error} />}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ScheduleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Book An Appointment
            </Typography>
            <Box component="form" onSubmit={handleBooking} sx={{ mt: 1 }}>
              <FormControl sx={{ m: 1, width: 350 }}>
                <InputLabel id="instructor-label">Instructor</InputLabel>
                <Select
                  labelId="instructor-label"
                  id="instructor"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  input={<OutlinedInput label="Instructor" />}
                >
                  {allInstructors.map((i) => (
                    <MenuItem key={i._id} value={i._id}>
                      {i.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 350 }}>
                <InputLabel id="availability-label">Availability</InputLabel>
                <Select
                  labelId="availability-label"
                  id="availability"
                  value={bookedDay}
                  onChange={(e) => setBookedDay(e.target.value)}
                  input={<OutlinedInput label="Availability" />}
                >
                  {allAvailability.map((a) => (
                    <MenuItem key={a.weekday} value={a.weekday}>
                      {a.weekday}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 350 }}>
                <InputLabel id="time-label">Time</InputLabel>
                <Select
                  labelId="time-label"
                  id="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  input={<OutlinedInput label="Time" />}
                >
                  {allStartTime.map((t) => (
                    <MenuItem key={t} value={t}>
                      {String(t).slice(0, 2)}:{String(t).slice(-2)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Book Appointment
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default BookingPage;
