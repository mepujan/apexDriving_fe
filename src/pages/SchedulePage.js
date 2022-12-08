import * as React from "react";
import { Box, Container } from "@mui/system";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Link, useNavigate } from "react-router-dom";
import scheduleService from "../services/schedule";
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
      <Link color="inherit" href="https://mui.com/">
        apexDriving
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const testSchedule = [
  {
    _id: "6381463bf703c3d2b8085024",
    instructor: {
      full_name: "John Doe",
      user_name: "jdoe",
      email: "jdoe@apexdriving.com",
      mobile_number: "9278955560",
    },
    booked_schedule: {
      start_time: "2022-11-25T11:51:50.417Z",
      end_time: "2022-11-25T12:51:50.417Z",
    },
  },
  {
    _id: "63814644f703c3d2b8085026",
    instructor: {
      full_name: "John Doe",
      user_name: "jdoe",
      email: "jdoe@apexdriving.com",
      mobile_number: "9278955560",
    },
    booked_schedule: {
      start_time: "2022-11-25T13:00:50.417Z",
      end_time: "2022-11-25T14:00:50.417Z",
    },
  },
  {
    _id: "63814648f703c3d2b8085028",
    instructor: {
      full_name: "John Doe",
      user_name: "jdoe",
      email: "jdoe@apexdriving.com",
      mobile_number: "9278955560",
    },
    booked_schedule: {
      start_time: "2022-11-25T15:00:50.417Z",
      end_time: "2022-11-25T16:00:50.417Z",
    },
  },
  {
    _id: "6389455ebfd41d455d7b74e5",
    instructor: {
      full_name: "Mary Jane",
      user_name: "mjane",
      email: "mjane@apexdriving.com",
      mobile_number: "9278955560",
    },
    booked_schedule: {
      start_time: "2012-01-26T20:51:50.417Z",
      end_time: "2012-01-26T21:51:50.417Z",
    },
  },
];

const SchedulePage = () => {
  const [schedule, setSchedule] = React.useState([]);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        //const {schedule} = await scheduleService.schedule();
        const schedule = testSchedule;
        console.log(schedule);
        setSchedule(schedule);
      } catch (error) {
        console.log(error["message"]);
        setError(
          "Cannot get the booking schedule. Something went wrong. Try Again..."
        );
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    })();
  }, []);

  return (
    <>
      {error && <Notification message={error} />}
      <ThemeProvider theme={theme}>
        <Container component="main">
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
              Booked Appointments
            </Typography>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              style={{
                paddingTop: "50px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              {schedule.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={schedule.indexOf(item)}>
                  <Card>
                    <CardContent>
                      <Typography>
                        <b>{item.instructor.full_name}</b>
                      </Typography>
                      <Typography>
                        <b>Email:</b> {item.instructor.email}
                      </Typography>
                      <Typography>
                        <b>Contact No.:</b> {item.instructor.mobile_number}
                      </Typography>
                      <Typography>
                        <b>Appointment Start Time:</b>{" "}
                        {item.booked_schedule.start_time}
                      </Typography>
                      <Typography>
                        <b>Appointment End Time:</b>{" "}
                        {item.booked_schedule.end_time}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SchedulePage;
