import React from 'react';

const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="h-10 px-4 flex items-center justify-between">
      {/* 좌측: 시간 */}
      <div className="text-xs font-semibold">{currentTime}</div>
      
      {/* 우측: 아이콘 */}
      <div className="flex items-center space-x-2">
        {/* 신호 아이콘 */}
        <div className="flex items-end h-3 space-x-0.5">
          <div className="w-0.5 h-1 bg-black rounded-sm"></div>
          <div className="w-0.5 h-2 bg-black rounded-sm"></div>
          <div className="w-0.5 h-2.5 bg-black rounded-sm"></div>
          <div className="w-0.5 h-3 bg-black rounded-sm"></div>
        </div>
        
        {/* 와이파이 아이콘 */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.407 9.1785C10.468 6.2739 15.205 6.2739 18.264 9.1785C18.333 9.2466 18.373 9.3403 18.374 9.4383C18.374 9.5362 18.337 9.6306 18.269 9.7L16.984 11.0252C16.851 11.1605 16.637 11.1638 16.502 11.032C15.497 10.1036 14.191 9.5896 12.836 9.5896C11.481 9.5902 10.175 10.1041 9.171 11.032C9.036 11.1638 8.821 11.1605 8.689 11.0252L7.404 9.7C7.336 9.6306 7.299 9.5362 7.299 9.4383C7.3 9.3403 7.34 9.2466 7.409 9.1785Z" fill="black"/>
        </svg>
        
        {/* 배터리 아이콘 */}
        <div className="flex items-center">
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="absolute top-0.5 bottom-0.5 left-0.5 right-1 bg-black rounded-sm"></div>
            <div className="w-0.5 h-2 bg-black absolute -right-0.5 top-0.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar; 