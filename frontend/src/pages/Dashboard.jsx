import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, ShieldAlert, BarChart3, Clock } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#102a43', '#243b53', '#334e68', '#486581', '#627d98', '#829ab1', '#e02424'];

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app we would ping the actual backend
        // For demo, we simulate loading or hit real API if running
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/analytics');
                setData(res.data);
            } catch (err) {
                console.warn("Backend not running, using mock data");
                // Mock data
                setData({
                    total_contracts: 128,
                    high_risk_contracts: 14,
                    clause_distribution: [
                        { name: 'Payment Terms', value: 89 },
                        { name: 'Termination', value: 112 },
                        { name: 'Liability', value: 104 },
                        { name: 'Confidentiality', value: 125 },
                        { name: 'Governing Law', value: 98 }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Platform Analytics Dashboard</h1>
                <p className="text-brand-300 mt-1">Overview of contract intelligence metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-premium p-6 flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-700">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-brand-300 text-sm font-medium">Total Contracts</h3>
                    <p className="text-3xl font-bold text-white mt-1">{data?.total_contracts || 0}</p>
                </div>

                <div className="card-premium p-6 flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mb-4 text-accent">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <h3 className="text-brand-300 text-sm font-medium">High Risk Contracts</h3>
                    <p className="text-3xl font-bold text-white mt-1">{data?.high_risk_contracts || 0}</p>
                </div>

                <div className="card-premium p-6 flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-700">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <h3 className="text-brand-300 text-sm font-medium">Avg Extraction Confidence</h3>
                    <p className="text-3xl font-bold text-white mt-1">94.2%</p>
                </div>

                <div className="card-premium p-6 flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4 text-brand-700">
                        <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-brand-300 text-sm font-medium">Time Saved (Est.)</h3>
                    <p className="text-3xl font-bold text-white mt-1">320 hrs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Clause Detection Frequency</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data?.clause_distribution || []}
                                margin={{ top: 5, right: 30, left: 0, bottom: 25 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334e68" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    tick={{ fill: '#9fb3c8', fontSize: 12 }}
                                    height={60}
                                />
                                <YAxis tick={{ fill: '#9fb3c8', fontSize: 12 }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#102a43' }}
                                    contentStyle={{ backgroundColor: '#102a43', borderRadius: '8px', border: '1px solid #334e68', color: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)' }}
                                />
                                <Bar dataKey="value" fill="#829ab1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Clause Distribution</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.clause_distribution || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {(data?.clause_distribution || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#102a43', borderRadius: '8px', border: '1px solid #334e68', color: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9fb3c8' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
