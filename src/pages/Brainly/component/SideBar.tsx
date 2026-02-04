import { useContext, useState } from 'react'
import { Home, Twitter, Video, FileText, Globe, Github, LogOut, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { ContentContext, type Content } from '../../../contexts/contentProvider'

function SideBar() {
  const [tempContent, setTempContent] = useState<Content[]>([]);
  const [activeItem, setActiveItem] = useState('home');
  const { setContent, content } = useContext(ContentContext);

  function filterContent(type: string) {
    const filtered = tempContent.filter((item: any) => item.type === type.toLowerCase());
    setContent(filtered);
  }

  const [sideOpen, setSideOpen] = useState(true);
  function toggleBar() {
    setSideOpen(!sideOpen)
  }

  const navigate = useNavigate();

  const items = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "home",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      title: "twitter",
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/30"
    },
    {
      icon: <Video className="w-5 h-5" />,
      title: "youtube",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "article",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: "github",
      color: "text-slate-300",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/30"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "webpage",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    }
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <motion.div
      className="relative h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col"
      initial={false}
      animate={{ width: sideOpen ? '16rem' : '5rem' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className={`p-4 flex ${sideOpen ? 'justify-between' : 'justify-center'} items-center border-b border-slate-800/50`}>
        {sideOpen && (
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <span className='font-bold text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>
              Second Brain
            </span>
          </div>
        )}
        <button
          onClick={toggleBar}
          className='p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 transition-all duration-200'
        >
          {sideOpen
            ? <ChevronLeft className='w-4 h-4 text-slate-400' />
            : <ChevronRight className='w-4 h-4 text-slate-400' />
          }
        </button>
      </div>

      {/* Navigation Items */}
      <div className='flex-1 p-3 space-y-1 overflow-y-auto'>
        {sideOpen && (
          <p className='px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider'>Categories</p>
        )}
        {items.map(item => {
          const isActive = activeItem === item.title;
          return (
            <button
              key={item.title}
              onClick={() => {
                setActiveItem(item.title);
                if (item.title === "home") {
                  if (tempContent.length > 1) {
                    setContent(tempContent);
                  } else {
                    setContent(content);
                  }
                } else {
                  if (tempContent.length === content.length) {
                    setTempContent(content);
                  }
                  filterContent(item.title);
                }
              }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl
                transition-all duration-200 group
                ${isActive
                  ? `${item.bgColor} ${item.color} border ${item.borderColor}`
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }
                ${!sideOpen ? 'justify-center' : ''}
              `}
            >
              <span className={`flex-shrink-0 ${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.icon}
              </span>
              {sideOpen && (
                <span className='text-sm font-medium capitalize'>{item.title}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className='p-3 border-t border-slate-800/50'>
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 p-3 rounded-xl
            text-slate-400 hover:text-red-400
            bg-slate-800/30 hover:bg-red-500/10
            border border-slate-700/50 hover:border-red-500/30
            transition-all duration-200
            ${!sideOpen ? 'justify-center' : ''}
          `}
        >
          <LogOut className='w-5 h-5' />
          {sideOpen && <span className='text-sm font-medium'>Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}

export default SideBar


