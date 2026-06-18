'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationSchema, ApplicationFormData, JobApplication } from '../lib/schema';
import api from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APPLICATION_STATUSES } from '../lib/schema';

interface Props {
  onClose: () => void;
  initialData?: JobApplication | null;
}

export default function AddApplicationModal({ onClose, initialData }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: initialData ? {
      companyName: initialData.companyName,
      jobTitle: initialData.jobTitle,
      jobType: initialData.jobType as "FULL_TIME" | "INTERNSHIP" | "PART_TIME",
      status: initialData.status as typeof APPLICATION_STATUSES[number],
      appliedDate: new Date(initialData.appliedDate).toISOString().split('T')[0],
      notes: initialData.notes || ''
    } : {
      status: 'PENDING',
      jobType: 'FULL_TIME',
      companyName: '',
      jobTitle: '',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ApplicationFormData) => {
      return initialData
        ? api.put(`/applications/${initialData.id}`, data)
        : api.post('/applications', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 2000);
    }
  });

  useGSAP(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
    );
  }, { scope: modalRef });

  return (
    <>
      {/* Backdrop overlay layer */}
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <dialog
          ref={modalRef}
          open
          className="relative z-50 p-0 m-0 bg-white rounded-xl shadow-2xl border border-slate-100 max-w-[540px] w-full flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="text-base font-bold text-slate-900">
              {initialData ? 'Edit Application' : 'Add Application'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Company Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Company Name *</label>
                <input
                  {...register('companyName')}
                  placeholder="e.g. Google"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.companyName ? 'border-red-300' : 'border-slate-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.companyName.message}</p>}
              </div>

              {/* Title Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Job Title *</label>
                <input
                  {...register('jobTitle')}
                  placeholder="e.g. Product Designer"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.jobTitle ? 'border-red-300' : 'border-slate-200'}`}
                />
                {errors.jobTitle && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.jobTitle.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Job Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Job Type</label>
                <select
                  {...register('jobType')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-800"
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="PART_TIME">Part-time</option>
                </select>
              </div>

              {/* Status Selector synced to APPLICATION_STATUSES */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Status</label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-800"
                >
                  {APPLICATION_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Applied Date *</label>
              <input
                type="date"
                {...register('appliedDate')}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Notes (Optional)</label>
              <textarea
                rows={3}
                {...register('notes')}
                placeholder="Add details about interview processes, referrals, requirements etc..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400 text-slate-800"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-70"
              >
                {mutation.isPending ? 'Saving...' : 'Save Application'}
              </button>
            </div>
          </form>
        </dialog>
      </div>

      {/* Floating Success Notification Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-slate-800/50 transition-all">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xs font-medium tracking-wide">Application saved successfully.</span>
        </div>
      )}
    </>
  );
}
