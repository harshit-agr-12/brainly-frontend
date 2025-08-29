import { useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signin(){

        const email =   emailRef.current?.value;
        const password =   passwordRef.current?.value;

        if(!email || !password){
            alert("Please fill all the fields");
            return;
        }

        if(password?.length as number < 6){
            alert("Password must be at least 6 characters long");
            return;
        }

        const response = await axios.post(`${apiUrl}/api/v1/signin`, { email : email , password : password});
        if(emailRef.current && passwordRef.current){
            emailRef.current.value = "";
            passwordRef.current.value= "";
        }

        const jwt = response.data?.token;
        localStorage.setItem('token',jwt);
        navigate('/brainly');   
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex flex-col max-w-96 border-1 border-gray-400 justify-center p-7 rounded-md'>
                <div className='text-center mb-12'>
                    <h1 className='font-bold text-xl '>Welcome to brainly</h1>
                    <p>A second brain to manage you important links and docs <span className='font-bold'>Brainly</span></p>
                </div>
                <label>Email</label>
                <input type='email'  
                ref={emailRef}
                placeholder='john****@gmail.com'  className='p-3 border-1 rounded-md border-gray-300 mb-5'/>
                <label>Password</label>
                <input type='password'  
                ref={passwordRef}
                placeholder='******'  className='p-3 border-1 rounded-md border-gray-300 mb-5'
                minLength={6}
                />
                <button className='text-white bg-gray-700 hover:bg-gray-800 p-2 rounded-md cursor-pointer'
                    onClick={signin}
                >Signin</button>
                <p className="text-right mt-2 cursor-pointer text-sm hover:text-blue-500" onClick={()=>{ navigate('/signup')}}>Don't have an account yet?</p>
            </div>
        </div>
    )
}