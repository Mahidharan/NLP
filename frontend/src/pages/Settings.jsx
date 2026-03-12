import { Save } from 'lucide-react';

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-brand-900">Platform Settings</h1>
                <p className="text-brand-600 mt-1">Configure extraction models and platform preferences</p>
            </div>

            <div className="card-premium divide-y divide-brand-100">

                {/* Profile Settings */}
                <div className="p-8">
                    <h2 className="text-lg font-bold text-brand-900 mb-4">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-700 mb-1">Full Name</label>
                            <input type="text" defaultValue="Jane Legal" className="w-full px-4 py-2 border border-brand-200 rounded-lg text-sm bg-brand-50 text-brand-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-700 mb-1">Email Address</label>
                            <input type="email" defaultValue="jane.legal@firm.com" className="w-full px-4 py-2 border border-brand-200 rounded-lg text-sm bg-brand-50 text-brand-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-700 mb-1">Company / Firm</label>
                            <input type="text" defaultValue="Acme Legal Services" className="w-full px-4 py-2 border border-brand-200 rounded-lg text-sm bg-brand-50 text-brand-900" />
                        </div>
                    </div>
                </div>

                {/* NLP Settings */}
                <div className="p-8">
                    <h2 className="text-lg font-bold text-brand-900 mb-4">NLP Engine Configuration</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-brand-200 rounded-lg bg-white">
                            <div>
                                <h4 className="font-semibold text-brand-900">Confidence Threshold</h4>
                                <p className="text-sm text-brand-600 mt-1">Minimum score required to automatically flag a clause (currently 85%).</p>
                            </div>
                            <div className="w-32">
                                <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-brand-600" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-brand-200 rounded-lg bg-white">
                            <div>
                                <h4 className="font-semibold text-brand-900">Custom Clause Dictionary</h4>
                                <p className="text-sm text-brand-600 mt-1">Enable firm-specific custom clause recognition models.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-brand-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-brand-200 rounded-lg bg-white">
                            <div>
                                <h4 className="font-semibold text-brand-900">Strict Risk Mode</h4>
                                <p className="text-sm text-brand-600 mt-1">Flag potential implicit risks even with low confidence.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-brand-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save */}
                <div className="p-8 bg-brand-50/50 flex justify-end">
                    <button className="btn-primary">
                        <Save className="w-4 h-4 mr-2" /> Save Configuration
                    </button>
                </div>

            </div>
        </div>
    );
}
