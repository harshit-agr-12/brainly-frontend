import React from 'react'

function Input({ placeholder, value, onChange, ref }: {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type="text"
      ref={ref}
      className="
        w-full px-4 py-3
        bg-slate-800/50 hover:bg-slate-800
        border border-slate-700 hover:border-slate-600
        focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
        rounded-xl
        text-white placeholder-slate-500
        transition-all duration-200
        outline-none
      "
    />
  )
}

export default Input