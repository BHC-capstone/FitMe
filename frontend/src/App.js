import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/index.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUpPage from "./page/register/signUpPage";
import TrainerSignUpPage from "./page/register/trainerSignUpPage";
import LoginPage from "./page/login/loginPage";
import BottomNav from "./components/bottomNav";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BottomNav />
        <nav>
          <ul>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes history={history}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/trainer-signup" element={<TrainerSignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
