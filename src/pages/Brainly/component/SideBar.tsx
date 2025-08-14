import {useContext, useState}  from 'react'
import { Home ,X , Video , Images , AudioLines ,LogOut , ArrowLeft, ArrowRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {motion} from "motion/react"
import { ContentContext } from '../../../contexts/contentProvider'

function SideBar() {

  const {setContent} = useContext(ContentContext);


  const [sideOpen , setSideOpen] = useState(true  );
  function toogleBar(){
    setSideOpen(!sideOpen)
  }

  const navigate =  useNavigate();

  const items = [
    {
      icon : <Home className="w-6 h-6 text-indigo-500" />,
      title : "Home",
    },{
      icon : <X className="w-6 h-6 text-indigo-500" />,
      title : "twitter",
    },{
      icon : <Video className="w-6 h-6 text-indigo-500" />,
      title : "Youtube",
    },{
      icon : <Images className="w-6 h-6 text-indigo-500" />,
      title : "Images",
    },{
      icon : <AudioLines className="w-6 h-6 text-indigo-500" />,
      title : "Audio",
    }
  ];

  function handleLogout(){

    localStorage.removeItem("token"); 
    setContent([]);
    navigate('/');
  }

  return (
    <motion.div className={`w-fit  border-gray-200 shadow-2xl border  h-full flex flex-col justify-between   p-2 items-center`}
    initial = {false}
    animate = {{
      width : sideOpen ? '16rem' : '4rem'
    }}
    transition={{
      duration : 0.3 
    }}

    >
      <div className='flex-col '>

          <div className={`p-2 w-full rounded flex ${sideOpen ? 'justify-between' : 'justify-center'} items-center `}>
            {sideOpen &&<div className='flex gap-2 mr-2'> <h1 className='font-bold text-2xl'>Second</h1> <h1 className='font-bold text-2xl'> Brain</h1> </div>}
            {sideOpen ? <ArrowLeft className='text-indigo-500 w-6 h-6 cursor-pointer' onClick={toogleBar}/> : <ArrowRight className='text-indigo-500 w-6 h-6 cursor-pointer' onClick={toogleBar}/>}
          </div>

          <div className='flex-col py-2 gap-2'>
            {items.map(item => <div className='flex gap-3 p-2  hover:bg-gray-300 transition-colors duration-300 cursor-pointer' key={item.title }>{item.icon}{sideOpen && <h2>{item.title}</h2>}</div>)}
          </div>
      </div>
      <div className='flex gap-4  p-4 cursor-pointer  hover:bg-gray-300 transition-colors duration-300 w-full rounded'
        onClick={handleLogout}
      >
        <LogOut className='w-6 h-6 `' />
        { sideOpen && <h3>LogOut</h3>}
      </div>
    </motion.div>
  )
}

export default SideBar