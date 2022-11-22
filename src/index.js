import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const users = [
  {
    id: 1,
    email: "test@test.com",
    user_name: "user_test",
    mobile_number: "1234567890",
  },
  {
    id: 2,
    email: "test2@test2.com",
    user_name: "user_test2",
    mobile_number: "2234567890",
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App users={users} />);
