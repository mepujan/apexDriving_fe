import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";


import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {
  return(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<HomePage/>}/>
    <Route path = "/login" element = {<LoginPage />} />
    <Route path = "/signup" element = {<SignUpPage />} />
    <Route path = "*" element = {<NotFoundPage />} />
  </Routes>
  </BrowserRouter>
  )
}
