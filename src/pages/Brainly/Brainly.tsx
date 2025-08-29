
import { useContext, useEffect, useState } from 'react';
import SideBar from './component/SideBar'
import TopBar from './component/TopBar'
import { CreateContent } from './component/CreateContent';
import Card from './component/Card';
import { ContentContext } from '../../contexts/contentProvider';
import axios from 'axios';

function Brainly() {

  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const [open, setOpen] = useState(false);
  const {content,setContent } = useContext(ContentContext)

  function AddContentHandler() {
    setOpen(!open);
  }

  useEffect( ()=>{
    axios.get(`${apiUrl}/api/v1/content`,{
      headers :{
          "Authorization" : localStorage.getItem('token')
      }
  })
  .then((response)=>{
      setContent(response.data?.content)
  })
  },[open])

  return (
    
    
    <div className='w-full h-full relative flex'>
      <CreateContent open={open} onClose={AddContentHandler} />
      <SideBar/>
      <div className='w-full'>
        <TopBar onClose={AddContentHandler} />
        <h3 className='text-lg p-3 font-semibold+'>All Cotent</h3>
        <div className='flex gap-4 p-4  flex-wrap overflow-y-auto h-[80vh]'>
          {
            content.map(item => <Card  title={item.title} type={item.type}  link={item.link} tags={item.tags} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Brainly