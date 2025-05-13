import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isActive = id && password && passwordCheck && name && birth && email && phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/self-introduction');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl py-10 px-8 flex flex-col items-center relative">
        {/* 상단 헤더 */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex items-center w-full justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src="/Logo.png" alt="로고" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[#333]">개인회원 가입</span>
            </div>
            {/* 진행 단계 표시 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white font-bold">1</div>
              <div className="w-8 h-1 bg-[#e0e4e8]" />
              <div className="w-8 h-8 rounded-full bg-[#e0e4e8] flex items-center justify-center text-[#999] font-bold">2</div>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">아이디</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={id} 
              onChange={e => setId(e.target.value)} 
              placeholder="4~20자의 영문 소문자, 숫자 사용 가능" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">비밀번호</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="8~20자의 영문, 숫자, 특수문자 조합" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">비밀번호 확인</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={passwordCheck} 
              onChange={e => setPasswordCheck(e.target.value)} 
              placeholder="비밀번호 재입력" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">이름</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="이름(실명)" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">생년월일</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={birth} 
              onChange={e => setBirth(e.target.value)} 
              placeholder="숫자 8자리 (ex. 19980909)" 
              maxLength={8} 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">이메일</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="이메일" 
            />
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">휴대폰 번호</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="-없이 숫자만 입력" 
              />
            </div>
            <button 
              type="button" 
              className="h-12 px-4 rounded bg-[#5DC2BA] text-white font-semibold ml-2"
            >
              인증번호 발송
            </button>
          </div>
          <button
            type="submit"
            disabled={!isActive}
            className={`w-full py-3 mt-4 rounded font-bold text-lg transition-colors duration-200 ${
              isActive 
                ? 'bg-[#5DC2BA] text-white hover:bg-[#4bb0a8]' 
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            자기소개서 입력하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 