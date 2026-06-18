'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import api from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobApplication } from '../lib/schema';

interface Props {
  application: JobApplication;
  onClose: () => void;
}

export default function DeleteConfirmationModal({ application, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  // Axios network delete hook connecting directly to your Express route
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/applications/${application.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      onClose();
    },
    onError: (error) => {
      console.error("Delete call failure:", error?.message || error.message);
      alert("Failed to delete application from server database.");
    }
  });

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.25 });
  }, { scope: overlayRef });

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <dialog ref={modalRef} open className="relative p-0 m-0 bg-white rounded-xl shadow-2xl border border-slate-100 max-w-[460px] w-full flex flex-col overflow-hidden text-left animate-none">
        <div className="p-6 pb-4 flex gap-4 items-start">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 border border-red-100 text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Delete Application</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="mx-6 p-4 bg-slate-50 border border-slate-200/60 rounded-lg flex gap-3 items-center">
          <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block leading-none mb-1">Target Role</span>
            <h4 className="text-sm font-bold text-slate-800 leading-tight">{application.jobTitle}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <span>🏢</span> {application.companyName}
            </p>
          </div>
        </div>
        <div className="mx-6 mt-3 px-4 py-3 border-l-2 border-red-500 bg-red-50/40 text-[11px] leading-relaxed text-slate-600 flex gap-2 items-start">
          <span className="text-slate-400 font-semibold select-none">ⓘ</span>
          <p>Deleting this will permanently remove all interview notes, contact history, and associated documents from your pipeline.</p>
        </div>
        <div className="mt-6 px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors disabled:opacity-50"
          >
            Keep Application
          </button>
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors rounded-md shadow-sm inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </dialog>
    </div>
  );
}
