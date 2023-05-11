import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import MainPage from './page/Main/MainPage';
import SignUpPage from './page/Register/SignUpPage';
import LoginPage from './page/Login/LoginPage';
import TrainerSignUpPage from './page/Register/TrainerSignUpPage';
import TrainerLoginPage from './page/Login/TrainerLoginPage';
import TrainerList from './page/Trainer/TrainerList';
import Trainerdetail from './page/Trainer/Trainerdetail';
import Ptrequest from './page/Trainer/Ptrequest';
import UserEdit from './page/myPage/UserInfoEdit';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Tabs from './page/myPage/myPageTabs';
import CustomerList from './page/Trainer/CustomerList';
import CustomerDetail from './page/Trainer/CustomerDetail';
import WithdrawPage from './page/myPage/UserDeletePage';
import CalendarPart from './page/Main/CalenderPart';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App" style={{ marginBottom: '45px' }}>
      <TopNav />
      <BottomNav />
      <Routes history={history}>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/trainer-signup" element={<TrainerSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trainer-login" element={<TrainerLoginPage />} />
        <Route path="/trainer-list" element={<TrainerList />} />
        <Route path="/trainer-info/:id" element={<Trainerdetail />} />
        <Route path="/mypage/*" element={<Tabs />} />
        <Route path="/mypage/withdraw" element={<WithdrawPage />} />
        <Route path="/ptrequest" element={<Ptrequest />} />
        <Route path="/mypage/edit" element={<UserEdit />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer-management/:id" element={<CustomerDetail />} />
        <Route path="/calendar" element={<CalendarPart />} />
      </Routes>
    </div>
  );
}

export default App;
