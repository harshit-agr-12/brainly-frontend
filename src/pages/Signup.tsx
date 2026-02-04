import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    async function handleSubmit() {
        const fullName = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password || !fullName) {
            setError("Please fill all the fields");
            setSuccess(false);
            return;
        }

        if (password?.length as number < 6) {
            setError("Password must be at least 6 characters long");
            setSuccess(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/auth/signup`, {
                name: fullName,
                email: email,
                password: password
            });
            const data = response.data;
            if (!data.success) {
                setError(data.message);
                setSuccess(false);
                return;
            }
            navigate('/signin');
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
                <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Left Side - Form */}
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
                            <h2 className='text-2xl font-bold text-white mb-2'>Create Account</h2>
                            <p className='text-slate-400'>Start building your second brain today</p>
                        </div>

                        <div className='space-y-5'>
                            {/* Name Input */}
                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-slate-300'>Full Name</label>
                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                                    <input
                                        type='text'
                                        ref={nameRef}
                                        placeholder='John Doe'
                                        className='w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 hover:border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-slate-500 transition-all duration-200 outline-none'
                                    />
                                </div>
                            </div>

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
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors'
                                    >
                                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                    </button>
                                </div>
                                <p className='text-xs text-slate-500 mt-1'>Must be at least 6 characters</p>
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
                                onClick={handleSubmit}
                                disabled={loading}
                                className='group w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                                {loading ? (
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                ) : (
                                    <>
                                        Create Account
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
                                <span className='px-4 bg-slate-900/50 text-slate-500'>Already have an account?</span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <button
                            onClick={() => navigate('/signin')}
                            className='w-full py-3.5 px-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200'
                        >
                            Sign in instead
                        </button>
                    </div>

                    {/* Footer */}
                    <p className='text-center text-slate-500 text-sm mt-8'>
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>

            {/* Right Side - Branding */}
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
                        Build Your
                        <span className='bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'> Digital Second Brain</span>
                    </h1>
                    <p className='text-xl text-slate-400 leading-relaxed'>
                        Save links, organize knowledge, and never forget important content again.
                    </p>

                    {/* Benefits */}
                    <div className='mt-12 space-y-4'>
                        {[
                            { icon: CheckCircle, text: 'Save any link with one click' },
                            { icon: CheckCircle, text: 'AI-powered search & organization' },
                            { icon: CheckCircle, text: 'Share collections with anyone' },
                            { icon: CheckCircle, text: 'Free forever for personal use' }
                        ].map((item, i) => (
                            <div key={i} className='flex items-center gap-3 text-left'>
                                <item.icon className='w-5 h-5 text-emerald-400 flex-shrink-0' />
                                <span className='text-slate-300'>{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className='mt-12 p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl text-left'>
                        <p className='text-slate-300 italic mb-4'>
                            "Second Brain has completely changed how I organize my digital life. I can finally find anything I've saved!"
                        </p>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold'>
                                JD
                            </div>
                            <div>
                                <p className='text-white font-medium'>Jane Doe</p>
                                <p className='text-slate-500 text-sm'>Product Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup