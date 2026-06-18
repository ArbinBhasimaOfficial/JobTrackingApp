'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JobApplication } from '../lib/schema';

interface Props {
  application: JobApplication;
  onClose: () => void;
  onEdit: () => void; // Quick link to open edit form from details view
}

export default function ViewApplicationModal({ application, onClose, onEdit }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.25 });
  }, { scope: overlayRef });

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <dialog ref={modalRef} open className="relative p-0 m-0 bg-white rounded-xl shadow-2xl border border-slate-100 max-w-[500px] w-full flex flex-col overflow-hidden text-left">

        {/* Header strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Application Details</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        </div>

        {/* Core content information grids */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl flex items-center justify-center text-lg font-bold shrink-0">
              {application.companyName[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{application.jobTitle}</h3>
              <p className="text-sm font-medium text-slate-600 mt-1">🏢 {application.companyName}</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-0.5">Job Type</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-700 font-semibold text-[11px] inline-block uppercase tracking-wide">
                {application.jobType.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-0.5">Pipeline Status</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block">
                {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-xs font-semibold text-slate-400 block mb-0.5">Date Applied</span>
              <p className="text-slate-700 font-medium">
                {new Date(application.appliedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tracking Notes</span>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mt-1">
              {application.notes?.trim() ? application.notes : "No custom interview logs or notes saved for this tracking pipeline yet."}
            </p>
          </div>
        </div>

        {/* Bottom button controls footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 bg-white rounded-lg shadow-sm transition-colors"
          >
            Close Details
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            ✏️ Edit Application
          </button>
        </div>

      </dialog>
    </div>
  );
}
