import axios from 'axios';
import { useState } from 'react'
import { X, Share2, Copy, Globe, Lock, Check } from 'lucide-react'

function ShareBrain({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  async function generateLink() {
    try {
      if (!isSharing) {
        return;
      }
      const response = await axios.post(`${apiUrl}/api/v1/brain/share`, {
        share: isSharing
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (response.data.message === "forbidden" || response.data.message === "Bad Request" || !response.data.link) {
        return;
      }

      const shareableLink = response.data.link;
      setShareLink(shareableLink);
      navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to generate share link");
    }
  }

  function toggleSharing() {
    setIsSharing(!isSharing);
    if (!isSharing) {
      // Will be sharing after toggle
      setTimeout(() => generateLink(), 100);
    }
  }

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-700/50'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl'>
              <Share2 className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-white'>Share Your Brain</h2>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-200'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          <p className='text-slate-400 leading-relaxed'>
            Share your second brain with others by generating a shareable link. Anyone with the link can view your saved content.
          </p>

          {/* Sharing Toggle */}
          <div className='flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl'>
            <div className='flex items-center gap-3'>
              {isSharing ? (
                <Globe className='w-5 h-5 text-emerald-400' />
              ) : (
                <Lock className='w-5 h-5 text-slate-500' />
              )}
              <div>
                <p className='text-sm font-medium text-white'>
                  {isSharing ? 'Public' : 'Private'}
                </p>
                <p className='text-xs text-slate-500'>
                  {isSharing ? 'Anyone with link can view' : 'Only you can see'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleSharing}
              className={`
                relative w-14 h-8 rounded-full transition-all duration-300
                ${isSharing
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                  : 'bg-slate-700'
                }
              `}
            >
              <span
                className={`
                  absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg
                  transition-all duration-300
                  ${isSharing ? 'left-7' : 'left-1'}
                `}
              />
            </button>
          </div>

          {/* Share Link */}
          {isSharing && shareLink && (
            <div className='space-y-2'>
              <label className='text-sm font-medium text-slate-400'>Share Link</label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={shareLink}
                  readOnly
                  className='flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 text-sm truncate'
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${copied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }
                  `}
                >
                  {copied ? <Check className='w-5 h-5' /> : <Copy className='w-5 h-5' />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex gap-3 p-6 border-t border-slate-700/50 bg-slate-900/50'>
          <button
            onClick={onClose}
            className='flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200'
          >
            Close
          </button>
          {isSharing && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                onClose();
              }}
              className='flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-purple-600/25 transition-all duration-200'
            >
              Copy & Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShareBrain