import axios from 'axios';
import React, { useState } from 'react'

function ShareBrain({ open, onClose }: { open: boolean; onClose: () => void }) {

  const [isSharing, setIsSharing] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function generateLink() {
    try {
      if(isSharing === false){
        alert("Please enable sharing first");
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
        alert("You are not authorized to share this brain");
        return;
      }

      const shareableLink = response.data.link;
      navigator.clipboard.writeText(shareableLink);
      alert("Link copied to clipboard");
      onClose();
    } catch (error) {
      alert("Failed to generate share link");
    }
  }

  async function stopSharing() {
    try {
      setIsSharing(!isSharing);
      alert("Sharing stopped");
      console.log(isSharing)
      
    } catch (error) {
      alert("Failed to stop sharing");
    }
  }

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div className='w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-6 relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-white transition'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className='text-xl font-semibold text-white mb-6'>Share Your Brain</h2>

        {/* Content */}
        <p className='text-gray-400 mb-6'>
          Share your brain with others by generating a shareable link. Anyone with the link can view your content.
        </p>

        {/* Buttons */}
        <div className='flex flex-col gap-3'>
          <button
            onClick={() => {
              setIsSharing(true);
              generateLink();
            }}
            className='w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition'
          >
            Generate & Copy Link
          </button>

          <button
            onClick={stopSharing}
            className='w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition'
          >
            {isSharing ? 'Stop Sharing' : ' Start Sharing'}
          </button>

          <button
            onClick={onClose}
            className='w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareBrain