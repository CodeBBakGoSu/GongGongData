import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto p-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">© 2023 Go Yong. 모든 권리 보유.</p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700">이용약관</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700">개인정보 정책</a>
        </div>
      </div>
      
      {/* 하단 홈버튼 바 */}
      <div className="w-32 h-1 bg-black rounded-full mx-auto mt-4"></div>
    </footer>
  );
};

export default Footer; 