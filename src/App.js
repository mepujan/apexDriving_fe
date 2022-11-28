import { useEffect, useState } from "react";
import loginService from "./services/login";
import Notification from "./components/Notification";
import setToken from "./services/appointmentServices";
import LoginForm from "./components/LoginForm";

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // check for user token when the page loags
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      setUser(userInfo.user);
      setToken(userInfo.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ token: token, user: user })
      );
      setToken(token);
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          email={email}
          password={password}
          handleEmailChange={({ target }) => setEmail(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <p>Welcome {user.user_name}!</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
