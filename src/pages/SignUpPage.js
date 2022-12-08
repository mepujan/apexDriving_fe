import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import signupService from "../services/signup";
import Notification from "../components/Notification";
import Header from "../components/Header";

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

const theme = createTheme();

const SignupPage = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = {
      full_name: fullName,
      user_name: username,
      email: email,
      password: password,
      mobile_number: mobileNumber,
    };
    if (password !== confirmPassword) {
      setError("Password Doesnot Match. Try Again");
    } else {
      try {
        const { token, user } = await signupService.signup(data);
        navigate("/login");
        console.log("token = ", token);
        window.localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ token: token, user: user })
        );
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
      } catch (error) {
        console.log(error["message"]);
        setError("Cannot Create Account. Something went wrong. Try Again...");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <>
      <Header />
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
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create An Account
            </Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="full_name"
                label="Full Name"
                name="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="full_name"
                autoFocus
                variant="outlined"
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="userName"
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Re-Enter Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="mobile_number"
                label="Mobile Number"
                name="mobile_number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                autoComplete="mobileNumber"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default SignupPage;
