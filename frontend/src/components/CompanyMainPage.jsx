import { useState } from 'react';
import { ChevronDown, MoreVertical, X, ThumbsUp, Search, Bell, MessageSquare, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyMainPage = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Thursday');
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const toggleDaySelector = () => {
    setShowDaySelector(!showDaySelector);
  };
  
  const selectDay = (day) => {
    setSelectedDay(day);
    setShowDaySelector(false);
  };

  const toggleApplicant = (applicantId) => {
    setSelectedApplicants(prev =>
      prev.includes(applicantId)
        ? prev.filter(id => id !== applicantId)
        : [...prev, applicantId]
    );
  };

  const handleCreateChatRoom = () => {
    if (selectedApplicants.length > 0) {
      navigate('/company/chat', {
        state: {
          selectedApplicants: applicants.filter(applicant => 
            selectedApplicants.includes(applicant.id)
          )
        }
      });
    }
  };

  const applicants = [
    {
      id: 1,
      name: '김민지',
      salary: '3,000,000',
      position: '데이터 분석',
      status: '현재 채팅 대기중'
    },
    {
      id: 2,
      name: '이지원',
      salary: '4,500,000',
      position: '프론트엔드',
      status: '현재 채팅 대기중'
    },
    {
      id: 3,
      name: '박서연',
      salary: '3,200,000',
      position: 'SQL 사용가능',
      status: '최근 45명이 확인했어요'
    },
    {
      id: 4,
      name: '최유진',
      salary: '3,400,000',
      position: '백엔드',
      status: '현재 190명이 확인했어요'
    }
  ];

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
                B
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
              <h1 className="text-2xl font-bold text-gray-900">안녕하세요, B 담당자님</h1>
              <p className="text-gray-500">오늘도 좋은 하루 되세요!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-[#5DC2BA] text-white rounded-lg hover:bg-[#4bb0a8] transition-colors">
                프로필 수정
              </button>
              <button className="px-4 py-2 border border-[#5DC2BA] text-[#5DC2BA] rounded-lg hover:bg-[#5DC2BA] hover:text-white transition-colors">
                채용공고 관리
              </button>
            </div>
          </div>

          {/* 요일 선택기 */}
          <div className="mb-8 relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDaySelector}>
              <h2 className="text-xl font-semibold mr-2">{selectedDay}</h2>
              <ChevronDown className={`h-5 w-5 transition-transform ${showDaySelector ? 'transform rotate-180' : ''}`} />
            </div>
            <p className="text-sm text-gray-600 mt-1">우리 기업으로 지원한 구직자 list</p>
            
            {showDaySelector && (
              <div className="absolute top-12 left-0 z-10 w-48 bg-white shadow-lg rounded-lg border mt-1 py-1">
                {days.map((day) => (
                  <div 
                    key={day} 
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedDay === day ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => selectDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 배너 */}
          <div className="mb-8 relative">
            <div className="h-24 bg-gradient-to-r from-[#5DC2BA] to-[#4bb0a8] rounded-xl shadow-sm"></div>
            <button className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition">
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* 지원자 목록 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">추천 구직자 list</h2>
            <div className="space-y-4">
              {applicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  {...applicant}
                  isSelected={selectedApplicants.includes(applicant.id)}
                  onSelect={() => toggleApplicant(applicant.id)}
                />
              ))}
            </div>
          </div>

          {/* 채팅방 생성 버튼 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleCreateChatRoom}
              disabled={selectedApplicants.length === 0}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${
                selectedApplicants.length > 0
                  ? 'bg-[#5DC2BA] text-white hover:bg-[#4bb0a8]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedApplicants.length > 0
                ? `선택한 ${selectedApplicants.length}명과 채팅방 생성하기`
                : '채팅방을 선택해주세요'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 지원자 카드 컴포넌트
function ApplicantCard({ id, name, salary, position, status, isSelected, onSelect }) {
  return (
    <div 
      className={`bg-white rounded-xl border ${
        isSelected ? 'border-[#5DC2BA]' : 'border-gray-100'
      } p-6 hover:shadow-md transition-all cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex items-start">
        <div className="relative">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex justify-center items-center mr-4">
            <span className="text-[#5DC2BA]">
              <ThumbsUp size={24} />
            </span>
          </div>
          {isSelected && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#5DC2BA] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900 mb-2">{name}</div>
          <div className="text-gray-600 mb-2">예상연봉 : {salary} 원 / {position}</div>
          <div className="text-sm text-gray-500">{status}</div>
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

export default CompanyMainPage; 