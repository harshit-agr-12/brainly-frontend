
import { useContext, useEffect, useState } from 'react';
import SideBar from './component/SideBar'
import TopBar from './component/TopBar'
import { CreateContent } from './component/CreateContent';
import Card from './component/Card';
import { ContentContext } from '../../contexts/contentProvider';
import axios from 'axios';

function Brainly() {

  const [open, setOpen] = useState(false);
  const {content,setContent } = useContext(ContentContext)

  function AddContentHandler() {
    setOpen(!open);
  }

  useEffect( ()=>{
    axios.get('https://brainly-backend-1-td5h.onrender.com/api/v1/content',{
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
        <div className='flex gap-4 p-4  flex-wrap'>
          {
            content.map(item => <Card  title={item.title} type={item.type}  link={item.link} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Brainly