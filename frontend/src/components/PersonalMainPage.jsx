import { useState } from 'react';
import { ChevronDown, MoreVertical, X, ThumbsUp, Search, Bell, MessageSquare, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PersonalMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedNotices, setSelectedNotices] = useState([]);
  const navigate = useNavigate();

  const filters = [
    '프론트엔드', '백엔드', '풀스택', '모바일', 'AI/ML',
    '데이터', '보안', '클라우드', 'DevOps', 'QA'
  ];

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleNotice = (noticeId) => {
    setSelectedNotices(prev =>
      prev.includes(noticeId)
        ? prev.filter(id => id !== noticeId)
        : [...prev, noticeId]
    );
  };

  const notices = [
    {
      id: 1,
      iconType: 'fintech',
      companyName: '주식회사 핀터랩스',
      jobDetails: '제안가 3,800,000 원 / 주 4일 근무',
      location: '현재 채팅 대기 중'
    },
    {
      id: 2,
      iconType: 'company',
      companyName: '(주) JobBid',
      jobDetails: '프론트엔드 / 주 4일 / 시급 25,000원',
      location: '현재 190명이 확인했어요'
    },
    {
      id: 3,
      iconType: 'company',
      companyName: '(주) 코드베이스',
      jobDetails: '백엔드 개발 / 주 3일 / 시급 15,000원',
      location: '현재 35명이 확인했어요'
    },
    {
      id: 4,
      iconType: 'company',
      companyName: '(주) 데이비전',
      jobDetails: '데이터 분석가 / 주 5일 / 시급 20,000원',
      location: '현재 170명이 확인했어요'
    }
  ];

  const handleCreateChatRoom = () => {
    if (selectedNotices.length > 0) {
      navigate('/personal/chat', { 
        state: { 
          selectedCompanies: selectedNotices.map(notice => ({
            id: notice.id,
            name: notice.companyName
          }))
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* 상단 네비게이션 바 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/Logo.png" alt="로고" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">양방향 급여 매칭</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MessageSquare className="h-6 w-6 text-gray-600" />
              </button>
              <div className="h-8 w-8 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* 사용자 정보 섹션 */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">안녕하세요, A님</h1>
              <p className="text-gray-500">오늘도 좋은 하루 되세요!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-[#5DC2BA] text-white rounded-lg hover:bg-[#4bb0a8] transition-colors">
                프로필 수정
              </button>
              <button className="px-4 py-2 border border-[#5DC2BA] text-[#5DC2BA] rounded-lg hover:bg-[#5DC2BA] hover:text-white transition-colors">
                이력서 관리
              </button>
            </div>
          </div>

          {/* 필터 섹션 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">관심 분야</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedFilters.includes(filter)
                      ? 'bg-[#5DC2BA] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 예산 카드 */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">예상연봉</h2>
                <p className="text-3xl font-bold text-[#5DC2BA] mt-2">3,700 만 원</p>
                <div className="flex items-center text-green-600 mt-2">
                  <span className="mr-1">▲</span>
                  <span>13% than week ago</span>
                </div>
              </div>
              <div className="relative w-[100px] h-[100px]">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#5DC2BA"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 공지사항 섹션 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">맞춤 제안</h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  {...notice}
                  isSelected={selectedNotices.includes(notice.id)}
                  onSelect={() => toggleNotice(notice.id)}
                />
              ))}
            </div>
          </div>

          {/* 채팅방 생성 버튼 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${
                selectedNotices.length > 0
                  ? 'bg-[#5DC2BA] text-white hover:bg-[#4bb0a8]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={selectedNotices.length === 0}
              onClick={handleCreateChatRoom}
            >
              {selectedNotices.length > 0
                ? `선택한 ${selectedNotices.length}개의 채팅방 생성하기`
                : '채팅방을 선택해주세요'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 공지사항 카드 컴포넌트
function NoticeCard({ id, iconType, companyName, jobDetails, location, isSelected, onSelect }) {
  return (
    <div 
      className={`bg-white rounded-xl border ${
        isSelected ? 'border-[#5DC2BA]' : 'border-gray-100'
      } p-6 hover:shadow-md transition-all cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex items-start">
        <div className="relative">
          {iconType === 'fintech' ? (
            <div className="w-12 h-12 rounded-lg bg-yellow-50 text-[#5DC2BA] flex flex-col justify-center items-center text-xs mr-4">
              <div>주거래</div>
              <div>공간</div>
            </div>
          ) : (
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex justify-center items-center mr-4">
              <span className="text-[#5DC2BA]">
                <ThumbsUp size={24} />
              </span>
            </div>
          )}
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#5DC2BA] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900 mb-2">{companyName}</div>
          <div className="text-gray-600 mb-2">{jobDetails}</div>
          <div className="text-sm text-gray-500">{location}</div>
        </div>
        
        <button 
          className="px-4 py-2 text-sm text-[#5DC2BA] border border-[#5DC2BA] rounded-lg hover:bg-[#5DC2BA] hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // 상세 보기 로직
          }}
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}

export default PersonalMainPage; 