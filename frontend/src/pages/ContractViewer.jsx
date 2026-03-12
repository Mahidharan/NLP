import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Info, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { cn } from '../lib/utils';

// Color map for clause types
const clauseColors = {
    'Payment Terms': 'bg-blue-100 border-blue-300 text-blue-900',
    'Liability Clause': 'bg-red-100 border-red-300 text-red-900',
    'Termination Clause': 'bg-yellow-100 border-yellow-300 text-yellow-900',
    'Confidentiality Clause': 'bg-purple-100 border-purple-300 text-purple-900',
    'Indemnification Clause': 'bg-orange-100 border-orange-300 text-orange-900',
    'Governing Law': 'bg-teal-100 border-teal-300 text-teal-900',
    'Dispute Resolution': 'bg-indigo-100 border-indigo-300 text-indigo-900',
};

export default function ContractViewer() {
    const { id } = useParams();
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeClause, setActiveClause] = useState(null);
    const [activeTab, setActiveTab] = useState('viewer'); // viewer, clauses, risk

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/contracts/${id}`);
                setContract(res.data);
            } catch (err) {
                // Mock data fallback
                setContract({
                    id,
                    filename: 'Master_Service_Agreement_AcmeCorp.pdf',
                    date: new Date().toISOString(),
                    risk_score: 15,
                    text: `MASTER SERVICE AGREEMENT

This Master Service Agreement ("Agreement") is made this day by and between Service Provider and Client.

1. PAYMENT TERMS
The client agrees to pay $10,000 within 30 days of invoice receipt. Late payments will incur a 1.5% monthly interest fee.

2. LIABILITY
In no event shall either party be liable for any indirect, incidental, or consequential damages. Maximum liability is capped at the total amount paid.

3. TERMINATION
Either party may terminate this agreement with 30 days written notice. Immediate termination is allowed in case of material breach.

4. CONFIDENTIALITY
Both parties agree to hold proprietary information in strict confidence for a period of 5 years following termination.
          `,
                    clauses: [
                        {
                            id: 'c1',
                            type: 'Payment Terms',
                            text: 'The client agrees to pay $10,000 within 30 days of invoice receipt. Late payments will incur a 1.5% monthly interest fee.',
                            confidence: 0.98,
                            isRisk: false,
                            explanation: 'Standard net-30 payment terms. Includes a standard late penalty.'
                        },
                        {
                            id: 'c2',
                            type: 'Liability Clause',
                            text: 'In no event shall either party be liable for any indirect, incidental, or consequential damages. Maximum liability is capped at the total amount paid.',
                            confidence: 0.95,
                            isRisk: true,
                            explanation: 'Liability is capped. However, typical enterprise thresholds require 2x or 3x the contract value cap.'
                        },
                        {
                            id: 'c3',
                            type: 'Termination Clause',
                            text: 'Either party may terminate this agreement with 30 days written notice.',
                            confidence: 0.99,
                            isRisk: false,
                            explanation: 'Standard Mutual convenience termination.'
                        }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchContract();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-900"></div>
        </div>
    );

    if (!contract) return <div>Contract not found</div>;

    // Helper function to highlight text
    const renderHighlightedText = () => {
        let result = contract.text;

        // In a real app with exact offsets, we'd use those. 
        // Here we use string replacement for demo visual effect.
        contract.clauses.forEach(clause => {
            const colorClass = clauseColors[clause.type] || 'bg-gray-100 border-gray-300 text-gray-900';
            const highlightHTML = `<span class="cursor-pointer border-b-2 transition-colors hover:opacity-80 ${colorClass}" data-clause-id="${clause.id}">${clause.text}</span>`;
            result = result.replace(clause.text, highlightHTML);
        });

        return (
            <div
                className="prose prose-sm max-w-none text-brand-800 whitespace-pre-wrap font-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: result }}
                onClick={(e) => {
                    const clauseId = e.target.getAttribute('data-clause-id');
                    if (clauseId) {
                        setActiveClause(contract.clauses.find(c => c.id === clauseId));
                    }
                }}
            />
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link to="/app/library" className="p-2 hover:bg-brand-100 rounded-lg text-brand-500 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-brand-900">{contract.filename}</h1>
                        <div className="flex items-center gap-3 text-sm text-brand-500 mt-1">
                            <span>Analyzed on {new Date(contract.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="flex items-center">
                                {contract.risk_score > 10 ? <AlertTriangle className="w-4 h-4 text-accent mr-1" /> : <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                                Risk Score: {contract.risk_score}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn-secondary text-sm py-1.5"><Share2 className="w-4 h-4" /> Share</button>
                    <button className="btn-secondary text-sm py-1.5"><Download className="w-4 h-4" /> Export PDF</button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex flex-1 gap-6 overflow-hidden">

                {/* Document Area */}
                <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl shadow-float border border-white overflow-hidden">
                    <div className="flex border-b border-brand-200/50 bg-brand-50/30">
                        <button
                            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'viewer' ? 'border-brand-900 text-brand-900 bg-white' : 'border-transparent text-brand-500 hover:text-brand-700')}
                            onClick={() => setActiveTab('viewer')}
                        >
                            Document Viewer
                        </button>
                        <button
                            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === 'clauses' ? 'border-brand-900 text-brand-900 bg-white' : 'border-transparent text-brand-500 hover:text-brand-700')}
                            onClick={() => setActiveTab('clauses')}
                        >
                            Extracted Clauses ({contract.clauses.length})
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8">
                        {activeTab === 'viewer' ? (
                            renderHighlightedText()
                        ) : (
                            <div className="space-y-4">
                                {contract.clauses.map(clause => (
                                    <div key={clause.id} className="p-4 border border-brand-100 rounded-lg hover:border-brand-300 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={cn("px-2.5 py-1 rounded text-xs font-semibold", clauseColors[clause.type]?.split(' ')[0], clauseColors[clause.type]?.split(' ')[2] || 'bg-brand-100 text-brand-800')}>
                                                {clause.type}
                                            </span>
                                            <span className="text-xs text-brand-500">{(clause.confidence * 100).toFixed(1)}% Match</span>
                                        </div>
                                        <p className="text-brand-900 text-sm">{clause.text}</p>
                                        {clause.isRisk && (
                                            <div className="mt-3 flex items-start p-2 bg-accent-light text-accent-dark rounded text-xs gap-2">
                                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                                <span>This clause contains potential risk patterns that require legal review.</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Insights */}
                <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">

                    {/* Active Clause Detail */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-float border border-white p-5">
                        <h3 className="text-sm font-bold text-brand-900 flex items-center mb-4">
                            <Info className="w-4 h-4 mr-2" /> Clause Details
                        </h3>

                        {activeClause ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-medium text-brand-500 mb-1">Type</div>
                                    <div className={cn("inline-block px-2.5 py-1 rounded text-xs font-semibold", clauseColors[activeClause.type]?.split(' ')[0], clauseColors[activeClause.type]?.split(' ')[2])}>
                                        {activeClause.type}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-brand-500 mb-1">Confidence Score</div>
                                    <div className="flex items-center">
                                        <div className="flex-1 bg-brand-100 rounded-full h-1.5 mr-3">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${activeClause.confidence * 100}%` }}></div>
                                        </div>
                                        <span className="text-sm font-medium text-brand-900">{(activeClause.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-brand-500 mb-1">AI Explanation</div>
                                    <p className="text-sm text-brand-700">{activeClause.explanation || "No advanced explanation generated for this clause."}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-brand-400">
                                <p className="text-sm">Click on any highlighted text in the viewer to see AI analysis details here.</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Risks */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-float border border-white p-5">
                        <h3 className="text-sm font-bold text-brand-900 flex items-center mb-4">
                            <AlertTriangle className="w-4 h-4 mr-2 text-accent" /> Document Risks
                        </h3>

                        {contract.clauses.filter(c => c.isRisk).length > 0 ? (
                            <ul className="space-y-3">
                                {contract.clauses.filter(c => c.isRisk).map(risk => (
                                    <li key={`risk-${risk.id}`} className="text-sm border-l-2 border-accent pl-3 py-1 text-brand-800">
                                        <span className="font-semibold block mb-0.5">{risk.type} Alert</span>
                                        <span className="text-xs text-brand-600 line-clamp-2">{risk.text}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex items-center text-green-600 text-sm">
                                <CheckCircle className="w-4 h-4 mr-2" /> No critical risks detected.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
