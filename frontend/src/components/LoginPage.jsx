import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [userType, setUserType] = useState('personal');
  const navigate = useNavigate();

  const isActive = email.length > 0 && password.length > 0;

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType === 'personal') {
      navigate('/personal/main');
    } else {
      navigate('/company/main');
    }
  };

  const handleSignUp = () => {
    if (userType === 'personal') {
      navigate('/personal/signup');
    } else {
      navigate('/company/signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-8">
          <img src="/Logo.png" alt="로고" className="w-20 h-20 mb-4 object-contain" />
          <h1 className="text-2xl font-bold text-gray-800">양방향 급여 매칭</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">서비스</h2>
          <p className="text-gray-500 text-sm text-center">"구직자와 기업이 직접 제안하는 새로운 급여 매칭 플랫폼"</p>
        </div>

        {/* 회원 유형 탭 */}
        <div className="flex w-full mb-6">
          <button
            type="button"
            className={`flex-1 py-3 rounded-l-full font-semibold border border-[#f0f2f5] transition-colors duration-150 ${
              userType === 'personal' ? 'bg-white shadow text-[#333]' : 'bg-[#f0f2f5] text-[#999]'
            }`}
            onClick={() => setUserType('personal')}
          >
            개인회원
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-r-full font-semibold border border-[#f0f2f5] transition-colors duration-150 ${
              userType === 'company' ? 'bg-white shadow text-[#333]' : 'bg-[#f0f2f5] text-[#999]'
            }`}
            onClick={() => setUserType('company')}
          >
            기업회원
          </button>
        </div>

        {/* 입력 폼 */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">이메일</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                className="accent-[#5DC2BA] w-4 h-4 rounded border border-[#5DC2BA]"
              />
              <span className="text-gray-600 text-sm">로그인 상태 유지</span>
            </label>
            <button
              type="button"
              className="text-[#5DC2BA] text-sm font-semibold hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
          <button
            type="submit"
            disabled={!isActive}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-colors duration-200 mt-4 ${
              isActive
                ? 'bg-[#5DC2BA] text-white hover:bg-[#4bb0a8]'
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            로그인
          </button>
        </form>

        {/* 소셜 로그인 */}
        <div className="w-full flex flex-col items-center mt-8">
          <span className="text-gray-500 text-sm mb-4">소셜 계정으로 로그인</span>
          <div className="flex gap-4 w-full justify-center">
            <button className="w-12 h-12 rounded-full bg-white border border-[#e0e4e8] flex items-center justify-center text-[#03C75A] font-bold text-lg hover:bg-gray-50">
              N
            </button>
            <button className="w-12 h-12 rounded-full bg-white border border-[#e0e4e8] flex items-center justify-center hover:bg-gray-50">
              <span className="w-6 h-6 rounded-full bg-[#FEE500] flex items-center justify-center text-[#3A1D1D] font-bold">
                K
              </span>
            </button>
            <button className="w-12 h-12 rounded-full bg-white border border-[#e0e4e8] flex items-center justify-center text-black font-bold text-lg hover:bg-gray-50">
              ⍟
            </button>
            <button className="w-12 h-12 rounded-full bg-white border border-[#e0e4e8] flex items-center justify-center text-[#4285F4] font-bold text-lg hover:bg-gray-50">
              G
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="w-full flex flex-col items-center mt-8">
          <span className="text-gray-600">계정이 없으신가요?</span>
          <button
            className="text-[#5DC2BA] font-bold mt-1 hover:underline"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 