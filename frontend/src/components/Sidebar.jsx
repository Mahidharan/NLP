import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Upload,
    FileSearch,
    Library,
    BarChart2,
    ShieldAlert,
    Settings,
    Scale,
    LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Upload Contract', href: '/app/upload', icon: Upload },
    { name: 'Clause Extraction', href: '/app/extraction', icon: FileSearch },
    { name: 'Contract Library', href: '/app/library', icon: Library },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart2 },
    { name: 'Risk Analysis', href: '/app/risk-analysis', icon: ShieldAlert },
    { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function Sidebar({ onLogout }) {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { name: "Demo User" };
    const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="hidden md:flex flex-col w-64 bg-brand-950 border-r border-brand-800/80 text-white shadow-[4px_0_24px_rgba(0,0,0,0.2)] relative z-20">
            <div className="h-16 flex items-center px-6 border-b border-brand-800/80 bg-brand-950">
                <Scale className="w-6 h-6 text-indigo-400 mr-3" />
                <span className="font-semibold text-lg tracking-wide text-white">LegalTech AI</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="px-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                                        isActive
                                            ? 'bg-brand-800/70 text-white shadow-sm border border-brand-700/50'
                                            : 'text-brand-300 hover:bg-brand-800/40 hover:text-white'
                                    )
                                }
                            >
                                <Icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-brand-800/80 bg-brand-950">
                <div className="flex items-center px-3 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 font-semibold border border-indigo-700">
                        {initials}
                    </div>
                    <div className="ml-3 truncate">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-brand-400">Team Member</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-brand-300 rounded-lg hover:bg-brand-800/40 hover:text-white transition-colors"
                >
                    <LogOut className="mr-3 flex-shrink-0 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
