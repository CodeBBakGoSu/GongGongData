import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/personal/login');
    }, 2000); // 2초 후 로그인 옵션 페이지로 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 max-w-xs w-full">
        <img src="/Logo.png" alt="로고" className="w-20 h-20 mb-6 object-contain" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">양방향 급여 매칭</h1>
        <p className="text-gray-500 text-center mb-8">"구직자와 기업이 직접 제안하는 새로운 급여 매칭 플랫폼"</p>
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 border-4 border-[#5DC2BA] border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-[#5DC2BA] font-semibold">로딩 중...</span>
        </div>
        <footer className="mt-4 text-xs text-gray-400">© 2024 GoYong. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default LoadingScreen; 