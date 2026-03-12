import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Download } from 'lucide-react';

const areaData = [
    { name: 'Jan', processed: 45, risks_flagged: 12 },
    { name: 'Feb', processed: 52, risks_flagged: 18 },
    { name: 'Mar', processed: 38, risks_flagged: 9 },
    { name: 'Apr', processed: 65, risks_flagged: 21 },
    { name: 'May', processed: 48, risks_flagged: 14 },
    { name: 'Jun', processed: 85, risks_flagged: 25 },
    { name: 'Jul', processed: 72, risks_flagged: 16 },
];

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-brand-900">Advanced Analytics</h1>
                    <p className="text-brand-600 mt-1">Deep insights into processed document volume and trends</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary h-10 px-4">
                        <Calendar className="w-4 h-4 mr-2" /> Last 6 Months
                    </button>
                    <button className="btn-primary h-10 px-4">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-premium p-6">
                    <h3 className="text-lg font-bold text-brand-900 mb-6">Processing Volume vs Risk Identification</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#334e68" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#334e68" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e02424" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#e02424" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <RechartsTooltip />
                                <Area type="monotone" dataKey="processed" stroke="#334e68" strokeWidth={3} fillOpacity={1} fill="url(#colorProcessed)" />
                                <Area type="monotone" dataKey="risks_flagged" stroke="#e02424" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-brand-900 mb-6">Processing Time Saved</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={areaData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip />
                                <Bar dataKey="processed" name="Hours Saved" fill="#627d98" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
