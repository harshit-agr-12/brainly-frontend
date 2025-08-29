import React from 'react'

function Input({placeholder , ref } : {
    placeholder : string; 
    ref : React.RefObject<HTMLInputElement | null>;
}){
    return <div>
        <input  placeholder={placeholder} ref={ref}  type="text" className="w-full px-4 py-2 border-gray-200 border-2 rounded m-2"/>
    </div>
}

export default Input