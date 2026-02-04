import { useContext, useEffect, useState } from 'react';
import SideBar from './component/SideBar'
import TopBar from './component/TopBar'
import { CreateContent } from './component/CreateContent';
import Card from './component/Card';
import { ContentContext } from '../../contexts/contentProvider';
import axios from 'axios';
import ShareBrain from './component/ShareBrain';
import { FolderOpen } from 'lucide-react';

function Brainly() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { content, setContent } = useContext(ContentContext)

  function AddContentHandler() {
    setOpen(!open);
  }

  function ShareBrainHandler() {
    setShareOpen(!shareOpen);
  }

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get(`${apiUrl}/content/getAllContent`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          }
        });
        setContent(response.data.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }

    fetchContent();
  }, [apiUrl, setContent]);

  return (
    <div className='w-full h-screen relative flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <CreateContent open={open} onClose={AddContentHandler} />
      <ShareBrain open={shareOpen} onClose={ShareBrainHandler} />
      <SideBar />
      
      <div className='flex-1 flex flex-col min-w-0'>
        <TopBar onClose={AddContentHandler} onShare={ShareBrainHandler} />
        
        {/* Content Area */}
        <div className='flex-1 overflow-hidden'>
          {/* Header */}
          <div className='px-6 py-4 border-b border-slate-800/50'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FolderOpen className='w-5 h-5 text-purple-400' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white'>All Content</h3>
                <p className='text-sm text-slate-500'>{content.length} items saved</p>
              </div>
            </div>
          </div>
          
          {/* Cards Grid */}
          <div className='p-6 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar'>
            {content.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {content.map(item => (
                  <Card 
                    id={item._id || ''} 
                    title={item.title} 
                    type={item.type} 
                    link={item.link} 
                    tags={item.tags} 
                    thumbnail={item.thumbnail} 
                    description={item.description} 
                    key={item._id || item.link} 
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <div className='p-6 bg-slate-800/30 rounded-full mb-6'>
                  <FolderOpen className='w-16 h-16 text-slate-600' />
                </div>
                <h3 className='text-xl font-semibold text-slate-400 mb-2'>No content yet</h3>
                <p className='text-slate-500 max-w-sm'>Start building your second brain by adding your first piece of content.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  )
}

export default Brainly