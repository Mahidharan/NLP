import { Bell, Search, Menu } from 'lucide-react';

export default function Topbar() {
    return (
        <header className="bg-brand-900/60 backdrop-blur-md border-b border-brand-700/50 h-16 flex items-center justify-between px-6 z-10 relative">
            <div className="flex items-center flex-1">
                <button type="button" className="md:hidden text-brand-500 hover:text-brand-900 mr-4">
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" />
                </button>

                <div className="max-w-md w-full relative hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-brand-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-brand-700 rounded-lg text-sm placeholder-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 bg-brand-800/80 text-white transition-colors"
                        placeholder="Search contracts, clauses, or clients..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-brand-300 hover:text-white hover:bg-brand-800 rounded-full transition-colors">
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent"></span>
                    <Bell className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
