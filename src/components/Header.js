import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      setUser(userInfo.user.user_name);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const handleLogin = () => navigate("/login");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Apex Driving
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
              Welcome {user}
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outlined" color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
    // <div>
    //   <h1>Apex Driving</h1>
    //   {user ? (
    //     <>
    //       <span>Welcome {user}</span>
    //       <button onClick={handleLogout}>Logout</button>
    //     </>
    //   ) : (
    //     <button onClick={handleLogin}>Login</button>
    //   )}
    // </div>
  );
};

export default Header;
