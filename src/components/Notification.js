import { Alert,AlertTitle } from "@mui/material";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <Alert variant = "filled" severity="error">
  <AlertTitle>Error</AlertTitle>
   <strong align= "center">{message}</strong>
</Alert>

};

export default Notification;
