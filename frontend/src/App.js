import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import SignUpPage from './page/Register/SignUpPage';
import UserSignUpPage from './page/Register/UserSignUpPage';
import TrainerSignUpPage from './page/Register/TrainerSignUpPage';
import LoginPage from './page/Login/LoginPage';
import UserLoginPage from './page/Login/UserLoginPage';
import TrainerLoginPage from './page/Login/TrainerLoginPage';
import TrainerList from './page/Trainer/TrainerList';
import Trainerdetail from './page/Trainer/Trainerdetail';
import Ptrequest from './page/Trainer/Ptrequest';
import UserEdit from './page/myPage/UserInfoEdit';
import TopNav from './components/TopNav';
import Tabs from './page/myPage/myPageTabs';
import CustomerList from './page/Trainer/CustomerList';
import CustomerDetail from './page/Trainer/CustomerDetail';
import WithdrawPage from './page/myPage/UserDeletePage';
import CalendarPart from './page/Main/CalenderPart';
import TrainerCalendar from './page/Trainer/TrainerCalendar';
import CertificateManage from './page/myPage/Trainer/CertificateManage';
import MasterMain from './page/Master/MasterMain';
import PointCharge from './page/Payment/PointCharge';
import ChargeSuccess from './page/Payment/ChargeSuccess';
import ChargeFail from './page/Payment/ChargeFail';
import ChargeCancel from './page/Payment/ChargeCancel';
import MasterLogin from './page/Master/MasterLogIn';

const history = createBrowserHistory();

export default function App() {
  return (
    <div className="App">
      <TopNav />
      <Routes history={history}>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user-signup" element={<UserSignUpPage />} />
        <Route path="/trainer-signup" element={<TrainerSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/trainer-login" element={<TrainerLoginPage />} />
        <Route path="/trainer-list" element={<TrainerList />} />
        <Route path="/trainer-info/:id" element={<Trainerdetail />} />
        <Route path="/mypage" element={<Tabs />} />
        <Route path="/mypage/withdraw" element={<WithdrawPage />} />
        <Route path="/mypage/certificate" element={<CertificateManage />} />
        <Route path="/ptrequest/:trainerid" element={<Ptrequest />} />
        <Route path="/mypage/edit" element={<UserEdit />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer-management/:id" element={<CustomerDetail />} />
        <Route path="/calendar" element={<CalendarPart />} />
        <Route path="/trainercalendar/:userid" element={<TrainerCalendar />} />
        <Route path="/pointcharge" element={<PointCharge />} />
        <Route path="/charge-success" element={<ChargeSuccess />} />
        <Route path="/charge-fail" element={<ChargeFail />} />
        <Route path="/charge-cancel" element={<ChargeCancel />} />
        <Route path="/master" element={<MasterLogin />} />
        <Route path="/master-main" element={<MasterMain />} />
      </Routes>
    </div>
  );
}
