import { useState } from "react";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginService);
    try {
      const { user } = await loginService.login({
        email,
        password,
      });
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
          {/* redirect to index */}
        </div>
      )}
    </div>
  );
};

export default App;
