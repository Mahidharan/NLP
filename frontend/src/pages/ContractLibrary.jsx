import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, MoreVertical, FileText, ChevronRight } from 'lucide-react';

export default function ContractLibrary() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/contracts');
                setContracts(res.data);
            } catch (err) {
                // Mock data
                setContracts([
                    { id: '1', filename: 'Master_Service_Agreement_Acme.pdf', date: '2026-03-01T10:00:00Z', num_clauses: 12, risk_score: 5, status: 'Analyzed' },
                    { id: '2', filename: 'NDA_GlobalTech_Signed.docx', date: '2026-03-05T14:30:00Z', num_clauses: 4, risk_score: 2, status: 'Analyzed' },
                    { id: '3', filename: 'Employment_Contract_JSmith.pdf', date: '2026-03-10T09:15:00Z', num_clauses: 18, risk_score: 25, status: 'Review Required' },
                    { id: '4', filename: 'Vendor_Agreement_CloudSoft.pdf', date: '2026-03-11T16:45:00Z', num_clauses: 22, risk_score: 15, status: 'Analyzed' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchContracts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-brand-900">Contract Library</h1>
                    <p className="text-brand-600 mt-1">Manage and search all analyzed documents</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="w-full pl-9 pr-4 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                    </div>
                    <button className="btn-secondary whitespace-nowrap">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </button>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-50 border-b border-brand-100 text-xs uppercase tracking-wider text-brand-500 font-semibold">
                                <th className="px-6 py-4">Document Name</th>
                                <th className="px-6 py-4">Upload Date</th>
                                <th className="px-6 py-4">Clauses Extracted</th>
                                <th className="px-6 py-4">Risk Score</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-100 bg-white">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-brand-500">Loading contracts...</td>
                                </tr>
                            ) : contracts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-brand-500">No contracts found in library.</td>
                                </tr>
                            ) : (
                                contracts.map(contract => (
                                    <tr key={contract.id} className="hover:bg-brand-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FileText className="h-5 w-5 text-brand-400 mr-3" />
                                                <span className="font-medium text-brand-900">{contract.filename}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-brand-600">
                                            {new Date(contract.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-brand-600">
                                            {contract.num_clauses} clauses
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${contract.risk_score > 20 ? 'bg-red-50 text-red-700 border-red-200' :
                                                    contract.risk_score > 10 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-green-50 text-green-700 border-green-200'
                                                }`}>
                                                {contract.risk_score}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm ${contract.status === 'Review Required' ? 'text-accent font-medium' : 'text-brand-600'}`}>
                                                {contract.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link to={`/app/contract/${contract.id}`} className="text-brand-600 hover:text-brand-900 mx-2 flex items-center text-sm font-medium">
                                                    View <ChevronRight className="w-4 h-4 ml-1" />
                                                </Link>
                                                <button className="p-1 text-brand-400 hover:text-brand-700 rounded-md">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination mock */}
                <div className="border-t border-brand-100 px-6 py-4 flex items-center justify-between bg-gray-50/50">
                    <span className="text-sm text-brand-500">Showing <span className="font-medium text-brand-900">1</span> to <span className="font-medium text-brand-900">{contracts.length}</span> of <span className="font-medium text-brand-900">{contracts.length}</span> results</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-brand-200 rounded text-sm text-brand-500 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border border-brand-200 rounded text-sm text-brand-500 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
