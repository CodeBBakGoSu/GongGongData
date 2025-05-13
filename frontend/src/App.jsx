import { Routes, Route, Navigate } from 'react-router-dom'
import PersonalMainPage from './components/PersonalMainPage'
import PersonalChatPage from './components/PersonalChatPage'
import CompanyMainPage from './components/CompanyMainPage'
import CompanyChatPage from './components/CompanyChatPage'
import PersonalSignUpPage from './components/SignUpPage'
import CompanySignUpPage from './components/CompanySignUpPage'
import PersonalLoginPage from './components/LoginPage'
import CompanyLoginPage from './components/LoginPage'
import SelfIntroductionPage from './components/SelfIntroductionPage'
import LoadingScreen from './components/LoadingScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/personal/main" element={<PersonalMainPage />} />
      <Route path="/personal/chat" element={<PersonalChatPage />} />
      <Route path="/company/main" element={<CompanyMainPage />} />
      <Route path="/company/chat" element={<CompanyChatPage />} />
      <Route path="/personal/signup" element={<PersonalSignUpPage />} />
      <Route path="/company/signup" element={<CompanySignUpPage />} />
      <Route path="/personal/login" element={<PersonalLoginPage />} />
      <Route path="/company/login" element={<CompanyLoginPage />} />
      <Route path="/self-introduction" element={<SelfIntroductionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App 