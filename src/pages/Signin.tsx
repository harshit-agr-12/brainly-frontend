import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff } from "lucide-react";

export function Signin() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function signin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setSuccess(false);
            setError("Please fill all the fields");
            return;
        }

        if (password?.length as number < 6) {
            setError("Password must be at least 6 characters long");
            setSuccess(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/auth/signin`, { email: email, password: password });
            if (emailRef.current && passwordRef.current) {
                emailRef.current.value = "";
                passwordRef.current.value = "";
            }

            const jwt = response.data?.token;
            localStorage.setItem('token', jwt);
            navigate('/brainly');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("Backend error", error.response.data);
                setError(error.response.data.message);
                setSuccess(false);
            } else {
                console.log("Unexpected error", error);
                setError("An unexpected error occurred");
                setSuccess(false);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex'>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Left Side - Branding */}
            <div className='hidden lg:flex lg:w-1/2 relative items-center justify-center p-12'>
                <div className='max-w-md text-center'>
                    <div className='inline-flex items-center gap-3 mb-8'>
                        <div className='p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl'>
                            <Sparkles className='w-8 h-8 text-white' />
                        </div>
                        <span className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>
                            Second Brain
                        </span>
                    </div>
                    <h1 className='text-4xl font-bold mb-6 leading-tight'>
                        Welcome Back to Your
                        <span className='bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'> Digital Mind</span>
                    </h1>
                    <p className='text-xl text-slate-400 leading-relaxed'>
                        Access your saved knowledge, links, and documents. Your second brain is waiting.
                    </p>
                    
                    {/* Feature highlights */}
                    <div className='mt-12 space-y-4 text-left'>
                        {['AI-powered organization', 'Instant search across all content', 'Share your brain with others'].map((feature, i) => (
                            <div key={i} className='flex items-center gap-3 text-slate-300'>
                                <div className='w-2 h-2 bg-purple-500 rounded-full' />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12'>
                <div className='w-full max-w-md'>
                    {/* Mobile Logo */}
                    <div className='lg:hidden flex items-center justify-center gap-2 mb-8'>
                        <div className='p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl'>
                            <Sparkles className='w-6 h-6 text-white' />
                        </div>
                        <span className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>
                            Second Brain
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className='bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl shadow-purple-500/5'>
                        <div className='text-center mb-8'>
                            <h2 className='text-2xl font-bold text-white mb-2'>Sign In</h2>
                            <p className='text-slate-400'>Enter your credentials to continue</p>
                        </div>

                        <div className='space-y-5'>
                            {/* Email Input */}
                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-slate-300'>Email Address</label>
                                <div className='relative'>
                                    <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                                    <input
                                        type='email'
                                        ref={emailRef}
                                        placeholder='you@example.com'
                                        className='w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 hover:border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-slate-500 transition-all duration-200 outline-none'
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-slate-300'>Password</label>
                                <div className='relative'>
                                    <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        ref={passwordRef}
                                        placeholder='••••••••'
                                        className='w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 hover:border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-slate-500 transition-all duration-200 outline-none'
                                        minLength={6}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors'
                                    >
                                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {!success && error && (
                                <div className='flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300'>
                                    <AlertCircle className='w-5 h-5 flex-shrink-0' />
                                    <span className='text-sm'>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={signin}
                                disabled={loading}
                                className='group w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {loading ? (
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className='relative my-8'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-slate-700' />
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-4 bg-slate-900/50 text-slate-500'>New to Second Brain?</span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <button
                            onClick={() => navigate('/signup')}
                            className='w-full py-3.5 px-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200'
                        >
                            Create an account
                        </button>
                    </div>

                    {/* Footer */}
                    <p className='text-center text-slate-500 text-sm mt-8'>
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}