import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate real-time auth
        setTimeout(() => {
            setLoading(false);

            // Extract a name from email if not provided
            const emailName = email ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : "User";

            // Save to local storage
            const userData = {
                name: isRegister && name ? name : emailName,
                email: email
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');

            onLogin();
            navigate('/app/dashboard');
        }, 1200);
    };

    return (
        <div className="min-h-screen font-sans flex text-brand-900 bg-brand-900 overflow-hidden relative">

            {/* Abstract Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Left section: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center mb-12">
                        <Scale className="h-8 w-8 text-brand-200" />
                        <span className="ml-3 text-2xl font-bold text-white tracking-wide">LegalTech AI</span>
                    </div>

                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                        {isRegister ? 'Create an Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-brand-300 mb-8">
                        {isRegister ? 'Set up your enterprise legal workspace.' : 'Sign in to your enterprise legal workspace.'}
                    </p>

                    <form onSubmit={handleAuth} className="space-y-5">
                        {isRegister && (
                            <div>
                                <label className="block text-sm font-medium text-brand-200 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className="h-5 w-5 text-brand-400 flex items-center justify-center font-bold">@</div>
                                    </div>
                                    <input
                                        type="text"
                                        required={isRegister}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-800/50 text-white placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-brand-200 mb-1.5">Work Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-brand-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-800/50 text-white placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
                                    placeholder="name@firm.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-200 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-brand-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-brand-700 rounded-xl bg-brand-800/50 text-white placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-brand-600 bg-brand-800 text-brand-500 focus:ring-brand-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-brand-300">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-300 hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg border border-transparent text-sm font-bold text-brand-900 bg-white hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-brand-900 transition-all active:scale-[0.98] disabled:opacity-70 mt-6"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-900 mr-2"></div>
                                    Authenticating...
                                </div>
                            ) : (
                                <>
                                    {isRegister ? 'Create Account' : 'Sign in to Workspace'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-brand-400">
                        {isRegister ? 'Already have an account?' : "Don't have an enterprise account?"}{' '}
                        <button
                            type="button"
                            onClick={() => setIsRegister(!isRegister)}
                            className="font-medium text-brand-200 hover:text-white transition-colors"
                        >
                            {isRegister ? 'Sign In' : 'Register Now'}
                        </button>
                    </p>
                </div>
            </div>

            {/* Right section: Feature Showcase (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-brand-800 border-l border-brand-700/50 items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/80 via-transparent to-indigo-900/30"></div>

                <div className="relative z-10 max-w-lg w-full">
                    <div className="bg-brand-900/60 backdrop-blur-xl border border-brand-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center mb-6">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                            <span className="text-sm font-mono text-brand-200 font-semibold tracking-wider uppercase">System Status: Optimal</span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex p-4 rounded-xl bg-brand-800/50 border border-brand-700/30">
                                <Cpu className="h-6 w-6 text-indigo-400 mr-4 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-semibold">Engine v4.2 Active</h4>
                                    <p className="text-brand-300 text-sm mt-1">Extracting 85+ clause variants with 98.4% validation accuracy across 12 jurisdictions.</p>
                                </div>
                            </div>

                            <div className="flex p-4 rounded-xl bg-brand-800/50 border border-brand-700/30">
                                <ShieldCheck className="h-6 w-6 text-emerald-400 mr-4 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-semibold">SOC2 Compliance Lock</h4>
                                    <p className="text-brand-300 text-sm mt-1">End-to-end multi-tenant encryption. Zero customer data is used for cross-tenant model training.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
