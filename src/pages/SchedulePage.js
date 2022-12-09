import * as React from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import { Box, Container } from "@mui/system";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  Avatar,
  Stack,
  Button
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Link } from "react-router-dom";

import Header from "../components/Header";
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

const SchedulePage = () => {
  const [schedule, setSchedule] = React.useState([]);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    (async () => {
      try {
        await scheduleService.schedule().then((res)=>{
            setSchedule(res);});
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
      <Header />
      <Stack
        marginTop={4}
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Back to Home</Button>
        </Link>
        <Link to="/booking" style={{ textDecoration: "none" }}>
          <Button variant="contained">Book an appointment</Button>
        </Link>
      </Stack>
      {error && <Notification message={error} />}
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
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
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {schedule.map((item) =>(
                <Grid item xs={12} sm={6} md={4} key={item._id}>
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
                      <Moment format="YYYY-MM-DD h:mm a" tz="Zulu" 
                        >{item.booked_schedule.start_time}</Moment>
                    </Typography>
                    <Typography>
                      <b>Appointment End Time:</b>{" "}
                      <Moment format="YYYY-MM-DD h:mm a" tz="Zulu">
                        {item.booked_schedule.end_time}</Moment>
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
