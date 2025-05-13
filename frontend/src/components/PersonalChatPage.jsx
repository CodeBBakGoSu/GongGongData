import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, Menu, Plus, Send, Bell, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// 소켓 연결은 나중에 구현
// import io from 'socket.io-client';
// const SOCKET_SERVER_URL = 'http://localhost:3001';

const PersonalChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const selectedCompanies = location.state?.selectedCompanies || [];

  const [messages, setMessages] = useState([
    {
      id: 'user-1',
      content: `안녕하세요. 저는 데이터 분석 직무를 희망하고 있으며,
현재 서울 지역에서 근무 가능한 상황입니다.
관심가져주셔서 감사합니다.`,
      sender: {
        name: '지원자',
        type: 'USER'
      },
      timestamp: '13:40'
    },
    ...selectedCompanies.map((company, index) => {
      let content = '';
      switch(company.name) {
        case '데이터리즘':
          content = `A님, 반갑습니다. 저는 (주)데이터리즘 인사담당자입니다.
저희는 주 3일 재택 + 연 1회 해외 컨퍼런스 지원이 가능합니다.`;
          break;
        case '티데븐스':
          content = `안녕하세요, A님. (주)티데븐스 채용팀입니다.
저희는 초봉 4,000만 원
상위급 맥북 + 맞춤 AI MacBook Pro 지급 조건입니다.`;
          break;
        case '에이아이에스티':
          content = `A님, 안녕하세요. 에이아이에스티입니다.
연봉 3,900만원 + 매월 복지비20만원 + 4.5일제 시행중입니다.
관심 있으시면 면접 일정 바로 제안드릴게요.`;
          break;
        default:
          content = `안녕하세요, ${company.name}입니다.
${company.position} 포지션에 지원해주셔서 감사합니다.
간단히 자기소개 부탁드립니다.`;
      }
      return {
        id: `company-${index + 1}`,
        content,
        sender: {
          name: `${company.name} | HR팀`,
          type: 'HR'
        },
        timestamp: `13:${45 + index}`
      };
    }),
    {
      id: 'user-2',
      content: '감사합니다. 조건 너무 좋네요.',
      sender: {
        name: '지원자',
        type: 'USER'
      },
      timestamp: '13:50'
    },
    {
      id: 'user-3',
      content: '혹시 티데븐스님, 연 1회 재택 휴케이션 지원 가능할까요?',
      sender: {
        name: '지원자',
        type: 'USER'
      },
      timestamp: '13:51'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(SOCKET_SERVER_URL);
  //   setSocket(newSocket);

  //   newSocket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   newSocket.on('receiveMessage', (message) => {
  //     setMessages(prev => [...prev, {
  //       ...message,
  //       id: Date.now(),
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     }]);
  //   });

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

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
          name: '지원자',
          type: 'USER'
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
    navigate('/personal/main');
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
              <h1 className="text-lg font-semibold text-gray-900">🔥 {selectedCompanies.length}개의 기업과 채팅</h1>
              <p className="text-sm text-gray-500">공유하기 •</p>
            </div>
          </div>
        </div>

        {/* 공지사항 바 */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-2 flex items-center">
            <Bell className="h-5 w-5 text-[#5DC2BA] mr-2" />
            <span className="text-sm text-gray-600">선택하신 {selectedCompanies.length}개의 기업이 입장했습니다.</span>
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

export default PersonalChatPage; 