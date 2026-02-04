import type { ReactElement } from "react";

type Variants = "primary" | "secondary" | "danger" | "ghost";

export type ButtonProps = {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  primary: `
    bg-gradient-to-r from-purple-600 to-indigo-600 
    hover:from-purple-500 hover:to-indigo-500 
    text-white shadow-lg shadow-purple-600/25 
    hover:shadow-purple-500/40 hover:scale-[1.02]
    active:scale-[0.98]
  `,
  secondary: `
    bg-slate-800/80 hover:bg-slate-700/80
    text-slate-200 border border-slate-700 
    hover:border-purple-500/50 hover:text-white
  `,
  danger: `
    bg-gradient-to-r from-red-600 to-rose-600
    hover:from-red-500 hover:to-rose-500
    text-white shadow-lg shadow-red-600/25
    hover:shadow-red-500/40
  `,
  ghost: `
    bg-transparent hover:bg-slate-800/50
    text-slate-400 hover:text-white
    border border-transparent hover:border-slate-700
  `
};

const sizeStyles = {
  sm: "py-2 px-4 text-sm gap-1.5",
  md: "py-2.5 px-5 text-sm gap-2",
  lg: "py-3.5 px-7 text-base gap-2.5",
};

const Button = ({ variant, size, text, startIcon, endIcon, onClick, fullWidth, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-xl
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      <span>{text}</span>
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
    </button>
  );
};

export default Button;