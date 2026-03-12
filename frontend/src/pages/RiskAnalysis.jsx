import { ShieldAlert, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const mockRisks = [
    { id: '1', contractId: '4', contractName: 'Vendor_Agreement_CloudSoft.pdf', type: 'Unlimited Liability', severity: 'Critical', text: 'Vendor shall be liable for any and all damages arising out of this agreement, without limitation.', status: 'Review Required' },
    { id: '2', contractId: '3', contractName: 'Employment_Contract_JSmith.pdf', type: 'Missing Confidentiality', severity: 'High', text: 'No standard NDA/Confidentiality provision detected in the document body.', status: 'Review Required' },
    { id: '3', contractId: '1', contractName: 'Master_Service_Agreement_Acme.pdf', type: 'Asymmetrical Termination', severity: 'Medium', text: 'Client may terminate at will. Service Provider requires 90 days notice.', status: 'Mitigated' },
];

export default function RiskAnalysis() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-brand-900">Portfolio Risk Analysis</h1>
                    <p className="text-brand-600 mt-1">Automatic detection of high-risk clauses and missing protections</p>
                </div>
                <button className="btn-secondary">Export Risk Report</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-red-200/50 rounded-xl flex items-center justify-center text-red-700">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <span className="flex items-center text-sm font-medium text-red-700 bg-red-200/50 px-2 py-1 rounded">
                            <ArrowUpRight className="w-4 h-4 mr-1" /> +12%
                        </span>
                    </div>
                    <h3 className="text-red-900 mt-4 text-3xl font-bold">24</h3>
                    <p className="text-red-700 font-medium text-sm mt-1">Critical Risks Detected</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-yellow-200/50 rounded-xl flex items-center justify-center text-yellow-700">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-yellow-900 mt-4 text-3xl font-bold">48</h3>
                    <p className="text-yellow-700 font-medium text-sm mt-1">Medium Risks Detected</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-green-200/50 rounded-xl flex items-center justify-center text-green-700">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-green-900 mt-4 text-3xl font-bold">156</h3>
                    <p className="text-green-700 font-medium text-sm mt-1">Safely Mitigated</p>
                </div>
            </div>

            <div className="card-premium mt-8">
                <div className="border-b border-brand-100 px-6 py-4 flex justify-between items-center bg-brand-50/50">
                    <h2 className="text-lg font-bold text-brand-900 tracking-wide">Active Risk Alerts</h2>
                </div>

                <div className="divide-y divide-brand-100">
                    {mockRisks.map(risk => (
                        <div key={risk.id} className="p-6 hover:bg-brand-50/30 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        {risk.severity === 'Critical' && <ShieldAlert className="w-6 h-6 text-red-600" />}
                                        {risk.severity === 'High' && <AlertTriangle className="w-6 h-6 text-orange-500" />}
                                        {risk.severity === 'Medium' && <AlertTriangle className="w-6 h-6 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-bold text-brand-900">{risk.type}</h3>
                                            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${risk.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                                    risk.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {risk.severity}
                                            </span>
                                        </div>
                                        <p className="text-brand-900 text-sm mt-3 bg-white border border-brand-200 p-3 rounded-lg shadow-sm">
                                            "{risk.text}"
                                        </p>
                                        <div className="flex items-center mt-3 text-xs text-brand-500">
                                            <span className="font-semibold text-brand-600 mr-2">Source:</span> {risk.contractName}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${risk.status === 'Mitigated' ? 'bg-green-100 text-green-800' : 'bg-brand-100 text-brand-800'
                                        }`}>
                                        {risk.status}
                                    </span>
                                    <button className="text-sm font-medium text-brand-600 hover:text-brand-900 bg-white border border-brand-200 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors shadow-sm">
                                        Review Contract
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
