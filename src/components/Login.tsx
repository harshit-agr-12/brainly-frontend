
interface InputI {
    name : string,
    placeholder  : string,
    type : string
}


function Input({name , placeholder , type} : InputI){
    return <div className='flex-col gap-2'>
        <label>{name}</label>
        <input type={type} placeholder={placeholder} />
    </div>
}

function Login() {
  return (
    <div className='flex-col'>
        <Input name='username' placeholder='username' type='text'/>
        <Input name='email' placeholder='email' type='text' />
        <Input name='password' placeholder='password' type='password' />
    </div>
  )
}

export default Login