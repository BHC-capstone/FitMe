import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { useSelector } from 'react-redux';

import { Routes, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import MainPage from './Page/Main/MainPage';
import SignUpPage from './Page/Register/SignUpPage';
import LoginPage from './Page/Login/LoginPage';
import TrainerSignUpPage from './Page/Register/TrainerSignUpPage';
import TrainerLoginPage from './Page/Login/TrainerLoginPage';
import TrainerList from './Page/Trainer/TrainerList';
import Trainerdetail from './Page/Trainer/Trainerdetail';
import BottomNav from './components/BottomNav';

const history = createBrowserHistory();

function App() {
  const user = useSelector(state => state.user);

  return (
    <div className="App">
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
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/trainer-signup" element={<TrainerSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trainer-login" element={<TrainerLoginPage />} />
        <Route path="/trainer-list" element={<TrainerList />} />
        <Route path="/trainer-info/:id" element={<Trainerdetail />} />
      </Routes>
    </div>
  );
}

export default App;
