import { useState } from 'react'
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Smile,
  Video,
  Phone,
  Check,
  CheckCheck
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const ChatSystem = () => {
  const [activeChat, setActiveChat] = useState(1)

  const chats = [
    { id: 1, name: 'Dr. Sarah Wilson', lastMsg: 'I have uploaded the mock paper for you.', time: '2m ago', unread: 2, online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: 2, name: 'Marcus Chen', lastMsg: 'See you on Thursday at 10:30!', time: '1h ago', unread: 0, online: false, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
    { id: 3, name: 'Elena Rodriguez', lastMsg: 'The logic is sound, but equations need work.', time: 'Yesterday', unread: 0, online: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    { id: 4, name: 'Meave Support', lastMsg: 'Your payment was successful.', time: '2 days ago', unread: 0, online: false, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support' },
  ]

  const messages = [
    { id: 1, text: 'Hi Dr. Wilson, I just finished the calculus practice set.', time: '10:15 AM', sent: true, status: 'seen' },
    { id: 2, text: 'Excellent! Did you find the integration by parts section challenging?', time: '10:18 AM', sent: false },
    { id: 3, text: 'Yes, especially the trig substitutions.', time: '10:20 AM', sent: true, status: 'seen' },
    { id: 4, text: 'No worries, we will focus on that in our next session. I have uploaded the mock paper for you.', time: '10:22 AM', sent: false },
  ]

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden">
      {/* Sidebar: Chat List */}
      <DashboardCard className="w-80 flex flex-col bg-white border border-slate-100 p-0 overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900">Messages</h2>
            <button className="size-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center hover:bg-primary-100 transition-colors">
              <Plus className="size-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-primary-500 transition-colors font-bold text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`
                p-4 mx-2 my-1 rounded-2xl flex items-center gap-4 cursor-pointer transition-all
                ${activeChat === chat.id ? 'bg-primary-50' : 'hover:bg-slate-50'}
              `}
            >
              <div className="relative shrink-0">
                <div className="size-12 rounded-xl overflow-hidden bg-slate-100">
                  <img src={chat.img} alt={chat.name} className="size-full object-cover" />
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 size-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm font-bold truncate ${activeChat === chat.id ? 'text-primary-950' : 'text-slate-900'}`}>{chat.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <span className="size-4 bg-primary-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Main: Active Chat */}
      <DashboardCard className="flex-1 flex flex-col bg-white border border-slate-100 p-0 overflow-hidden shadow-xl shadow-slate-200/50">
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl overflow-hidden bg-slate-100">
              <img src={chats.find(c => c.id === activeChat)?.img} className="size-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{chats.find(c => c.id === activeChat)?.name}</h3>
              <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                Active Now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="size-11 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:text-primary-600 transition-colors">
              <Phone className="size-5" />
            </button>
            <button className="size-11 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:text-primary-600 transition-colors">
              <Video className="size-5" />
            </button>
            <button className="size-11 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:text-primary-600 transition-colors">
              <MoreVertical className="size-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sent ? 'items-end' : 'items-start'}`}>
              <div className={`
                max-w-[70%] p-4 rounded-2xl text-sm font-medium shadow-sm relative group
                ${msg.sent 
                  ? 'bg-primary-950 text-white rounded-tr-none' 
                  : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'}
              `}>
                {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                {msg.sent && (
                  msg.status === 'seen' ? <CheckCheck className="size-3 text-primary-500" /> : <Check className="size-3 text-slate-400" />
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-2 items-center text-slate-400 text-xs font-bold animate-pulse">
            <span className="size-1 bg-slate-300 rounded-full" />
            <span className="size-1 bg-slate-300 rounded-full" />
            <span className="size-1 bg-slate-300 rounded-full" />
            Sarah is typing...
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-slate-50">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 group focus-within:border-primary-500 transition-all">
            <div className="flex items-center gap-1 px-2 border-r border-slate-200">
              <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                <Paperclip className="size-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                <ImageIcon className="size-5" />
              </button>
            </div>
            <input 
              type="text" 
              placeholder="Type your message here..." 
              className="flex-1 bg-transparent outline-none py-2 text-sm font-bold text-slate-900"
            />
            <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
              <Smile className="size-5" />
            </button>
            <button className="size-12 bg-primary-950 text-white rounded-xl flex items-center justify-center hover:bg-primary-900 transition-all shadow-lg shadow-primary-950/20 active:scale-95">
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

export default ChatSystem
