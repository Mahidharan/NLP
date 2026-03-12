import { Scale, FileSearch, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-brand-950 font-sans text-brand-50 flex flex-col relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <nav className="fixed w-full z-50 bg-brand-900/60 backdrop-blur-md border-b border-brand-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Scale className="h-8 w-8 text-indigo-400" />
                            <span className="ml-2 text-xl font-bold text-white">LegalTech AI</span>
                        </div>
                        <div>
                            <button
                                onClick={handleStart}
                                className="btn-primary"
                            >
                                Access Platform
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-32 pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-brand-800/30 backdrop-blur-sm rounded-3xl py-20 border border-brand-700/50 shadow-2xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
                        AI-Powered Legal <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Contract Intelligence</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-xl text-brand-200 mx-auto">
                        Automatically extract and analyze critical clauses from legal agreements using advanced NLP technology. Designed for enterprise legal teams.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <button
                            onClick={handleStart}
                            className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Upload Contract
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <button className="btn-secondary text-lg px-8 py-3 rounded-xl">
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">Enterprise AI Capabilities</h2>
                        <p className="mt-4 text-brand-300 max-w-2xl mx-auto">Transform your contract review process with our secure, compliant, and highly accurate machine learning models.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-premium p-8 group hover:-translate-y-1 transition-transform duration-300 cursor-default bg-brand-800/40 border-brand-700/50">
                            <div className="w-14 h-14 bg-brand-900 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-brand-700">
                                <FileSearch className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Entity & Clause Extraction</h3>
                            <p className="text-brand-300 leading-relaxed">
                                Instantly identify payment terms, indemnification, governing law, and over 50+ standard clause types with 95%+ accuracy.
                            </p>
                        </div>

                        <div className="card-premium p-8 group hover:-translate-y-1 transition-transform duration-300 cursor-default bg-brand-800/40 border-brand-700/50">
                            <div className="w-14 h-14 bg-brand-900 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-brand-700">
                                <ShieldAlert className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Risk Assessment</h3>
                            <p className="text-brand-300 leading-relaxed">
                                Automatically flag unlimited liability, asymmetrical termination rights, and missing standard protective clauses in real-time.
                            </p>
                        </div>

                        <div className="card-premium p-8 group hover:-translate-y-1 transition-transform duration-300 cursor-default bg-brand-800/40 border-brand-700/50">
                            <div className="w-14 h-14 bg-brand-900 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors border border-brand-700">
                                <Cpu className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Advanced NLP Models</h3>
                            <p className="text-brand-300 leading-relaxed">
                                Powered by state-of-the-art transformer models fine-tuned specifically on millions of corporate legal documents.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-brand-950 text-brand-400 py-12 text-sm text-center border-t border-brand-800/50 relative z-10">
                <p>© 2026 LegalTech AI Inc. All rights reserved. SOC2 Type II Certified.</p>
            </footer>
        </div>
    );
}
