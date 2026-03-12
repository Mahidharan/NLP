import { useState } from 'react';
import { Search, Filter, Database, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const mockClauses = [
    { id: '1', contractId: '1', contractName: 'Master_Service_Agreement_Acme.pdf', type: 'Payment Terms', text: 'The client agrees to pay $10,000 within 30 days of invoice receipt.', confidence: 0.98 },
    { id: '2', contractId: '1', contractName: 'Master_Service_Agreement_Acme.pdf', type: 'Termination Clause', text: 'Either party may terminate this agreement with 30 days written notice.', confidence: 0.99 },
    { id: '3', contractId: '2', contractName: 'NDA_GlobalTech_Signed.docx', type: 'Confidentiality Clause', text: 'Both parties agree to hold proprietary information in strict confidence for 5 years.', confidence: 0.95 },
    { id: '4', contractId: '3', contractName: 'Employment_Contract_JSmith.pdf', type: 'Governing Law', text: 'This agreement shall be governed by the laws of the State of California.', confidence: 0.99 },
    { id: '5', contractId: '4', contractName: 'Vendor_Agreement_CloudSoft.pdf', type: 'Liability Clause', text: 'Vendor liability is capped at 12 months of fees paid under this agreement.', confidence: 0.91 },
    { id: '6', contractId: '4', contractName: 'Vendor_Agreement_CloudSoft.pdf', type: 'Dispute Resolution', text: 'Any disputes will be resolved through binding arbitration in New York.', confidence: 0.94 },
];

const clauseTypes = ['All', 'Payment Terms', 'Liability Clause', 'Termination Clause', 'Confidentiality Clause', 'Governing Law', 'Dispute Resolution'];

const clauseColors = {
    'Payment Terms': 'bg-blue-100 text-blue-800',
    'Liability Clause': 'bg-red-100 text-red-800',
    'Termination Clause': 'bg-yellow-100 text-yellow-800',
    'Confidentiality Clause': 'bg-purple-100 text-purple-800',
    'Governing Law': 'bg-teal-100 text-teal-800',
    'Dispute Resolution': 'bg-indigo-100 text-indigo-800',
};

export default function ClauseExtraction() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClauses = mockClauses.filter(clause => {
        const matchesFilter = activeFilter === 'All' || clause.type === activeFilter;
        const matchesSearch = clause.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clause.type.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div>
                <h1 className="text-2xl font-bold text-brand-900">Clause Search Engine</h1>
                <p className="text-brand-600 mt-1">Search through all extracted provisions across your contract repository</p>
            </div>

            <div className="card-premium p-6 flex-shrink-0 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
                    <input
                        type="text"
                        placeholder="Search clauses (e.g., 'net 30', 'arbitration', 'Delaware')..."
                        className="w-full pl-10 pr-4 py-3 bg-brand-50 border border-brand-200 rounded-lg text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="btn-secondary whitespace-nowrap px-6">
                    <Filter className="h-5 w-5 mr-2" /> Advanced Filters
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 flex-shrink-0 scrollbar-hide">
                {clauseTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveFilter(type)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                            activeFilter === type
                                ? "bg-brand-900 text-white"
                                : "bg-white border border-brand-200 text-brand-600 hover:bg-brand-50"
                        )}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6">
                {filteredClauses.map((clause) => (
                    <div key={clause.id} className="card-premium flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="p-5 border-b border-brand-100 flex justify-between items-start bg-brand-50/30">
                            <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold", clauseColors[clause.type] || 'bg-brand-200 text-brand-800')}>
                                {clause.type}
                            </span>
                            <span className="text-xs font-medium text-brand-500 bg-white px-2 py-1 rounded border border-brand-100 shadow-sm">
                                {(clause.confidence * 100).toFixed(1)}% Match
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <p className="text-brand-900 text-sm leading-relaxed mb-4 flex-1">
                                "{clause.text}"
                            </p>

                            <div className="mt-auto pt-4 border-t border-brand-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-brand-500 truncate pr-4">
                                        <FileText className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                        <span className="truncate" title={clause.contractName}>{clause.contractName}</span>
                                    </div>
                                    <Link
                                        to={`/app/contract/${clause.contractId}`}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors flex-shrink-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredClauses.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-brand-400">
                        <p className="text-lg">No clauses found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
