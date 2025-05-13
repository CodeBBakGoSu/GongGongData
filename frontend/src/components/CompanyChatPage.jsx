import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, Menu, Plus, Send, Bell, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompanyChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const selectedApplicants = location.state?.selectedApplicants || [];

  const [messages, setMessages] = useState([
    {
      id: '1',
      content: `안녕하세요, 여러분😊
저희 데이터리즘 데이터 분석 인턴에 지원해주셔서 감사합니다.
간단히 여러분을 소개하고,
궁금한 점이나 원하는 조건이 있다면 자유롭게 말씀해주세요.`,
      sender: {
        name: 'HR팀 | 민지 매니저',
        type: 'HR'
      },
      timestamp: '14:20'
    },
    ...selectedApplicants.map((applicant, index) => ({
      id: `user-${index + 1}`,
      content: `안녕하세요, ${applicant.name}입니다.
${applicant.introduction}`,
      sender: {
        name: applicant.name,
        type: 'USER'
      },
      timestamp: '14:20'
    })),
    {
      id: '5',
      content: `세 분 모두 훌륭한 경험이 있으시네요!
이번 인턴은 월 120만원, 3개월 과정, 주 3일 오피스 출근입니다.
혹시 조정이 필요한 부분이 있으실까요?`,
      sender: {
        name: 'HR팀 | 민지 매니저',
        type: 'HR'
      },
      timestamp: '14:30'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: {
          name: 'HR팀 | 민지 매니저',
          type: 'HR'
        },
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleBack = () => {
    navigate('/company/main');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-lg">
        {/* 상단 네비게이션 바 */}
        <div className="bg-white shadow-sm">
          <div className="px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={handleBack}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <span className="ml-2 text-sm text-gray-500">999+</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Search className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 채팅방 헤더 */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">🔥 데이터 분석 인턴 경쟁방 {selectedApplicants.length}</h1>
              <p className="text-sm text-gray-500">공유하기 •</p>
            </div>
          </div>
        </div>

        {/* 공지사항 바 */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-2 flex items-center">
            <Bell className="h-5 w-5 text-[#5DC2BA] mr-2" />
            <span className="text-sm text-gray-600">공지 내용</span>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </div>

        {/* 메시지 컨테이너 */}
        <div className="px-4 py-6 space-y-6 min-h-[calc(100vh-280px)] bg-[#f8f9fa]">
          <div className="text-center">
            <span className="inline-block bg-white text-gray-600 text-xs px-4 py-1 rounded-full shadow-sm">
              {new Date().toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                weekday: 'long' 
              })}
            </span>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.type === 'HR' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {message.sender.type !== 'HR' && (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {message.sender.name.charAt(0)}
                </div>
              )}
              <div className="flex flex-col max-w-[70%]">
                <span className="text-xs text-gray-500 mb-1">
                  {message.sender.name}
                </span>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.sender.type === 'HR'
                    ? 'bg-[#5DC2BA] text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}>
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
                <span className={`text-xs text-gray-500 mt-1 ${
                  message.sender.type === 'HR' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp}
                </span>
              </div>
              {message.sender.type === 'HR' && (
                <div className="w-10 h-10 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white font-bold">
                  HR
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 폼 */}
        <div className="border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <Plus className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#5DC2BA]"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#5DC2BA] flex items-center justify-center text-white hover:bg-[#4bb0a8]"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyChatPage; 