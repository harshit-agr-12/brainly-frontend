
import { useRef} from "react";
import Input from "../Brainly/component/Input"
import  Button  from "../Brainly/component/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signin(){
        const username =   usernameRef.current?.value;
        const password =   passwordRef.current?.value;
        
        

        const response = await axios.post('https://brainly-backend-1-td5h.onrender.com/api/v1/signin', { username : username , password : password});
        if(usernameRef.current && passwordRef.current){
            usernameRef.current.value = "";
            passwordRef.current.value= "";
        }
        //@ts-ignore
        const jwt = response.data?.token;
        localStorage.setItem('token',jwt);
        navigate('/brainly');
    }

    return(
    <div className="h-screen  w-screen bg-gray-200 flex justify-center items-center"> 
        <div className="bg-white rounded-xl p-8 border-gray min-w-48 ">
            <Input placeholder="Username" ref={usernameRef} />
            <Input placeholder="Password" ref={passwordRef} />
            <div className="flex justify-center"><Button variant="primary" size="lg" text="Signin" fullWidth={true} onClick={signin} /></div>
        </div>
    </div>)
}