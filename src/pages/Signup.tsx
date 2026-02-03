import axios from "axios";
import {  useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error , setError] = useState<string | null>(null);
    const [success , setSuccess] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    console.log(apiUrl)

    async function  handleSubmit(){
        const fullName = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password || !fullName){
            alert("Please fill all the fields");
            return;
        }

        if(password?.length as number < 6){
            alert("Password must be at least 6 characters long");
            return;
        }

        console.log(fullName,email,password);

        try{
            const response = await axios.post(`${apiUrl}/auth/signup`,{
                name : fullName,
                email : email,
                password : password
            });
            const data = response.data;
            if(!data.success){
                setError(data.message);
                setSuccess(false);
                return;
            }
            navigate('/signin');
        } catch(error){
            if(axios.isAxiosError(error) && error.response){
                console.log("Backend error", error.response.data);
                setError(error.response.data.message);
                setSuccess(false);
            }else {
                console.log("Unexpected error", error); 
                setError("An unexpected error occurred");
                setSuccess(false);
            }
        }
    }

    return (
        <div className='h-screen w-screen bg-black text-white flex justify-center items-center'>
            <div className='flex flex-col max-w-96 border-1 border-gray-400 justify-center p-7 rounded-md'>
                <div className='text-center mb-12'>
                    <h1 className='font-bold text-xl '>Welcome to brainly</h1>
                    <br/>
                    <p>A <span className="text-blue-500">second brain</span> to manage you important links and docs</p>
                </div>
                <label>Full Name</label>
                <input type='text'  
                ref={nameRef}
                placeholder='john doe'  className='p-3 border-1 rounded-md border-gray-300 mb-5'/>
                <label>Email</label>
                <input type='email'  
                ref={emailRef}
                placeholder='john****@gmail.com'  className='p-3 border-1 rounded-md border-gray-300 mb-5'/>
                <label>Password</label>
                <input type='password'  
                ref={passwordRef}
                placeholder='******'  className='p-3 border-1 rounded-md border-gray-300 mb-5'/>
                <button className='text-white bg-gray-700 hover:bg-gray-800 p-2 rounded-md cursor-pointer active:scale-95 transition-all duration-150'
                    onClick={handleSubmit}
                >Signup</button>
                {!success && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-right mt-2 cursor-pointer  hover:text-blue-500 text-sm" onClick={()=>{ navigate('/signin')}}>Already have an account?</p>
            </div>
        </div>
    )
}

export default Signup