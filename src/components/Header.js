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
    <div>
      <h1>Apex Driving</h1>
      {user ? (
        <>
          <span>Welcome {user}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Header;
