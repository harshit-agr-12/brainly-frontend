import { useNavigate } from "react-router-dom"
import Button from "../pages/Brainly/component/Button"
import { Brain } from "lucide-react";


function Navbar() {

  const navigate = useNavigate();

  function GetStarted(){
    navigate('/signin');
  }

  return (
    <nav className="sticky w-[90vw] md:max-w-4xl top-2 mx-auto  border border-gray-300 rounded-2xl p-2 flex justify-between bg-white">
      <div className="flex items-center gap-2">
      <Brain className="w-12 h-12 text-indigo-600" />
      <h1 className="text-3xl md:text-5xl font-bold">Brainly</h1>
      </div>
      <Button text="Get Started" variant="primary" size="sm" onClick={GetStarted}></Button>
    </nav>
  )
}

export default Navbar