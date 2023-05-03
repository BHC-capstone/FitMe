import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
// import MainPage from './Page/Main/MainPage';
import SignUpPage from './page/Register/SignUpPage';
import LoginPage from './page/Login/LoginPage';
import TrainerSignUpPage from './page/Register/TrainerSignUpPage';
import TrainerLoginPage from './page/Login/TrainerLoginPage';
import TrainerList from './page/Trainer/TrainerList';
import Trainerdetail from './page/Trainer/Trainerdetail';
import BottomNav from './components/bottomNav';
import Tabs from './components/myPageTabs';

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
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/trainer-signup" element={<TrainerSignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trainer-login" element={<TrainerLoginPage />} />
          <Route path="/trainer-list" element={<TrainerList />} />
          <Route path="/trainer-info/:id" element={<Trainerdetail />} />
          <Route path="/mypage/*" element={<Tabs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
