import React from 'react'

function Input({placeholder , value, onChange , ref } : {
    placeholder : string; 
    value ?: string;
    onChange ?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref ?: React.Ref<HTMLInputElement>;
}){
    return <div>
        <input  placeholder={placeholder} value={value} onChange={onChange} type="text" className="w-full px-4 py-2 border-gray-200 border-2 rounded m-2" ref={ref} />
    </div>
}

export default Input