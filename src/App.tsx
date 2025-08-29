import { Route, Routes } from 'react-router-dom'
import Brainly from './pages/Brainly/Brainly'
import LandingPage from './pages/LandingPage'
import { Signin } from './pages/Brainly/Signin'
import  Signup  from './pages/Brainly/Signup'

function App() {

  return (
    <Routes >
      <Route  path='/' element={<LandingPage />} />
      <Route path='/brainly' element={<Brainly />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
  )
}
export default App
