import { useEffect, useState } from "react";
import loginService from "./services/login";
import Notification from "./components/Notification";
import setToken from "./services/appointmentServices";

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      console.log(window.localStorage.getItem("loggedInUser"));
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

  const handleLogout = () => window.localStorage.clear();

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        email:
        <input
          type="email"
          required
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          required
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
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
