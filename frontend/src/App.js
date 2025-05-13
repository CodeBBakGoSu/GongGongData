import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CompanySignUpPage from './components/CompanySignUpPage';
import SelfIntroductionPage from './components/SelfIntroductionPage';
import PersonalMainPage from './components/PersonalMainPage';
import CompanyMainPage from './components/CompanyMainPage';
import PersonalChatPage from './components/PersonalChatPage';
import CompanyChatPage from './components/CompanyChatPage';
import './App.css';

// 5초 후 자동 이동 처리
const LoadingWithRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <LoadingScreen />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingWithRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/company" element={<CompanySignUpPage />} />
        <Route path="/self-introduction" element={<SelfIntroductionPage />} />
        <Route path="/personal/main" element={<PersonalMainPage />} />
        <Route path="/personal/chat" element={<PersonalChatPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/company/main" element={<CompanyMainPage />} />
        <Route path="/company/chat" element={<CompanyChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
