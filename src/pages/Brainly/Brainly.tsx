import { useContext, useEffect, useState } from 'react';
import SideBar from './component/SideBar'
import TopBar from './component/TopBar'
import { CreateContent } from './component/CreateContent';
import Card from './component/Card';
import { ContentContext } from '../../contexts/contentProvider';
import axios from 'axios';
import ShareBrain from './component/ShareBrain';

function Brainly() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { content, setContent } = useContext(ContentContext)

  function AddContentHandler() {
    setOpen(!open);
  }

  function ShareBrainHandler() {
    // You can add any logic here if needed when sharing the brain
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


    <div className='w-full h-full relative flex bg-black'>
      <CreateContent open={open} onClose={AddContentHandler} />
      <ShareBrain open={shareOpen} onClose={ShareBrainHandler} />
      <SideBar />
      <div className='w-full'>
        <TopBar onClose={AddContentHandler} onShare={ShareBrainHandler} />
        <h3 className='text-lg p-3 font-semibold+'>All Cotent</h3>
        <div className='flex gap-4 p-4  flex-wrap overflow-y-auto h-[80vh]'>
          {
            content.map(item => <Card id={item._id} title={item.title} type={item.type} link={item.link} tags={item.tags} thumbnail={item.thumbnail} description={item.description} key={item.link} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Brainly