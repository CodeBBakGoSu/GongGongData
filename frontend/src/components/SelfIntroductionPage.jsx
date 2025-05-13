import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelfIntroductionPage = () => {
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState('');
  const [personality, setPersonality] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const isActive = motivation && personality && experience && goal;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 형식 검사 (PDF 또는 이미지)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert('PDF 또는 이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (portfolioLink) {
      setPortfolio(portfolioLink);
      setShowLinkInput(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl py-10 px-8 flex flex-col items-center relative">
        {/* 상단 헤더 */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex items-center w-full justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src="/Logo.png" alt="로고" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[#333]">자기소개서 작성</span>
            </div>
            {/* 진행 단계 표시 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white font-bold">1</div>
              <div className="w-8 h-1 bg-[#5DC2BA]" />
              <div className="w-8 h-8 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white font-bold">2</div>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-1">지원동기 (500자 내외)</label>
            <textarea 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white min-h-[100px]" 
              value={motivation} 
              onChange={e => setMotivation(e.target.value)} 
              placeholder="해당 내용을 입력하세요."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">성격 및 장단점 (500자 내외)</label>
            <textarea 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white min-h-[100px]" 
              value={personality} 
              onChange={e => setPersonality(e.target.value)} 
              placeholder="해당 내용을 입력하세요."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">위기 극복 사례 (1,000자 내외)</label>
            <textarea 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white min-h-[100px]" 
              value={experience} 
              onChange={e => setExperience(e.target.value)} 
              placeholder="해당 내용을 입력하세요."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">입사 후 포부 (300자 내외)</label>
            <textarea 
              className="w-full px-4 py-3 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white min-h-[100px]" 
              value={goal} 
              onChange={e => setGoal(e.target.value)} 
              placeholder="해당 내용을 입력하세요."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">포트폴리오</label>
            <div className="flex gap-4">
              <label className="flex-1">
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="h-12 rounded border border-[#e0e4e8] bg-white text-gray-700 font-semibold flex items-center justify-center cursor-pointer hover:bg-[#5DC2BA] hover:text-white transition-colors duration-200">
                  {uploadedFile ? uploadedFile.name : '파일 업로드'}
                </div>
              </label>
              <button 
                type="button" 
                onClick={() => setShowLinkInput(!showLinkInput)}
                className="flex-1 h-12 rounded border border-[#e0e4e8] bg-white text-gray-700 font-semibold hover:bg-[#5DC2BA] hover:text-white transition-colors duration-200"
              >
                링크 입력
              </button>
            </div>
            {showLinkInput && (
              <form onSubmit={handleLinkSubmit} className="mt-2 flex gap-2">
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="포트폴리오 링크를 입력하세요"
                  className="flex-1 px-4 py-2 border border-[#e0e4e8] rounded focus:outline-none focus:ring-2 focus:ring-[#5DC2BA] bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#5DC2BA] text-white font-semibold hover:bg-[#4bb0a8] transition-colors duration-200"
                >
                  확인
                </button>
              </form>
            )}
            {portfolio && !showLinkInput && (
              <div className="mt-2 text-sm text-gray-600">
                등록된 링크: {portfolio}
              </div>
            )}
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
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelfIntroductionPage; 