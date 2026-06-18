'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { JobApplication } from '../lib/schema';
import ApplicationFormModal from '../components/ApplicationFormModal';
import { APPLICATION_STATUSES } from '../lib/schema';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ViewApplicationModal from '../components/ViewApplicationModal';

export default function ApplicationListPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deletingApp, setDeletingApp] = useState<JobApplication | null>(null);
  const [viewingApp, setViewingApp] = useState<JobApplication | null>(null);

  const { data: applications, isLoading } = useQuery<JobApplication[]>({
    queryKey: ['applications'],
    queryFn: async () => (await api.get('/applications')).data
  });

  // Dynamic Filtering Logic
  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      || app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL'
      || String(app.status).toUpperCase() === String(statusFilter).toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING':
      case 'VIEWED':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'SHORTLISTED':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'OFFERED':
      case 'HIRED':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'REJECTED':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'WITHDRAWN':
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="text-sm font-medium text-slate-500 animate-pulse">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-blue-600">
            Job Tracker
          </span>
          <nav className="flex items-center gap-1 h-full">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 rounded-none relative top-[18px]">
              My Applications
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all"
          >
            Add Application
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3"></div>
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  Applications
                </button>
              </nav>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 space-y-1"></div>
        </aside>

        <main className="flex-1 p-8 max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Applications</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Track and manage your current job search pipeline.
            </p>
          </div>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Company or Job Title..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#f1f5f9]/60 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer min-w-[160px]"
            >
              <option value="ALL">All Statuses</option>
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status as string}>
                  {status
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-400 font-semibold text-[11px] tracking-wider uppercase">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Company</th>
                  <th className="px-6 py-3.5 font-semibold">Job Title</th>
                  <th className="px-6 py-3.5 font-semibold">Job Type</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold">Date Applied</th>
                  <th className="px-6 py-3.5 text-right pr-8 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications?.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                        {app.companyName[0].toUpperCase()}
                      </div>
                      <span className="truncate max-w-[160px]">
                        {app.companyName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {app.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-semibold tracking-wide">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 uppercase text-[10px]">
                        {app.jobType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight ${getStatusStyle(app.status)}`}>
                        {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(app.appliedDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <div className="inline-flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-md transition-colors"
                          title="View details"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingApp(app)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-md transition-colors"
                          title="Edit application"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button
                          // FIX: Removed native window.confirm check and hooked up state setter variable directly
                          onClick={() => setDeletingApp(app)}
                          className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-md transition-colors"
                          title="Delete application"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1a3 3 0 003 3h10M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplications?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                      No matching job applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* CARD BANNER METRICS */}
            <footer className="bg-[#f8fafc] border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div>
                Showing {filteredApplications?.length || 0} of {applications?.length || 0} applications
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-400 cursor-not-allowed font-semibold">Previous</button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 font-semibold shadow-sm">Next</button>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* FOOTER METRICS LEGAL */}
      <footer className="bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between text-xs text-slate-400 mt-auto">
        <div>© {new Date().getFullYear()} CareerPipeline. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
          <a href="#" className="hover:text-slate-600">Support</a>
        </div>
      </footer >

      {(isAddOpen || editingApp) && (
        <ApplicationFormModal onClose={() => { setIsAddOpen(false); setEditingApp(null); }} initialData={editingApp || undefined} />
      )}

      {/* FIX: Mount your newly built custom modal box dynamically */}
      {deletingApp && (
        <DeleteConfirmationModal
          application={deletingApp}
          onClose={() => setDeletingApp(null)}
        />
      )}
      {viewingApp && (
        <ViewApplicationModal
          application={viewingApp}
          onClose={() => setViewingApp(null)}
          onEdit={() => setEditingApp(viewingApp)}
        />
      )}
    </div >
  );
}
