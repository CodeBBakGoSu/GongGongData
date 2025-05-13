import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanySignUpPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [managerName, setManagerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [businessLicense, setBusinessLicense] = useState(null);

  const isActive = id && password && passwordCheck && managerName && phone && email && 
                  companyName && businessNumber && ceoName && businessLicense;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessLicense(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-2 py-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl py-10 px-8 flex flex-col items-center relative">
        {/* 상단 헤더 */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex items-center w-full justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src="/Logo.png" alt="로고" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[#333]">기업회원 가입</span>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-6">
          {/* 계정정보 섹션 */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-700">계정정보</h2>
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
          </div>

          {/* 담당자 정보 섹션 */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-700">담당자 정보</h2>
            <div>
              <label className="block text-gray-700 font-bold mb-1">담당자명</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={managerName} 
                onChange={e => setManagerName(e.target.value)} 
                placeholder="이름(실명)" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">연락처</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="-없이 숫자만 입력" 
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
          </div>

          {/* 기업 정보 섹션 */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-700">기업 정보</h2>
            <div>
              <label className="block text-gray-700 font-bold mb-1">기업명</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={companyName} 
                onChange={e => setCompanyName(e.target.value)} 
                placeholder="정확한 기업명을 입력해주세요" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">사업자 등록번호</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={businessNumber} 
                onChange={e => setBusinessNumber(e.target.value)} 
                placeholder="'-' 없이 숫자만 입력해주세요" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">대표명</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white" 
                value={ceoName} 
                onChange={e => setCeoName(e.target.value)} 
                placeholder="대표자 성함을 입력해주세요" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">사업자등록증</label>
              <label className="w-full h-12 border-2 border-[#5DC2BA] rounded flex items-center justify-center cursor-pointer hover:bg-[#5DC2BA] hover:text-white transition-colors duration-200">
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-[#5DC2BA] font-semibold">
                  {businessLicense ? businessLicense.name : '사업자등록증 업로드'}
                </span>
              </label>
            </div>
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
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUpPage; 