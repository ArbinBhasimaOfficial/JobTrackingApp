'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationSchema, ApplicationFormData, JobApplication, APPLICATION_STATUSES } from '../lib/schema';
import api from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  onClose: () => void;
  initialData?: JobApplication | null;
}

export default function ApplicationFormModal({ onClose, initialData }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Safely formats initial data for HTML5 inputs
  const formatInitialData = (): ApplicationFormData => {
    if (!initialData) {
      return {
        status: 'Pending',
        jobType: 'Full_time',
        companyName: '',
        jobTitle: '',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: ''
      };
    }

    return {
      companyName: initialData.companyName,
      jobTitle: initialData.jobTitle,
      jobType: initialData.jobType as "Full_time" | "Internship" | "Part_time",
      status: initialData.status as typeof APPLICATION_STATUSES[number],
      appliedDate: new Date(initialData.appliedDate).toISOString().split('T')[0],
      notes: initialData.notes || ''
    };
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: formatInitialData()
  });

  // TanStack Mutation hitting your Axios API (http://localhost:8080/api/v1)
  const mutation = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      if (initialData) {
        const response = await api.patch(`/applications/${initialData.id}`, data);
        return response.data;
      } else {
        const response = await api.post('/applications', data);
        return response.data;
      }
    },
    onSuccess: () => {
      // Instantly forces the application dashboard list to refetch from your database
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      onClose();
    },
    onError: (error) => {
      console.error("Form submittal failure:", error?.message || error.message);
      alert(error?.message || "Failed to save application to server database.");
    }
  });

  // Animations
  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 });
  }, { scope: overlayRef });

  const inputStyles = (hasError: boolean) => `
    w-full px-3 py-2 text-sm bg-white border rounded-lg text-slate-800 transition-all placeholder:text-slate-400
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    ${hasError ? 'border-red-500 bg-red-50/20' : 'border-slate-200 hover:border-slate-300'}
  `;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <dialog ref={modalRef} open className="relative p-0 m-0 bg-white rounded-xl shadow-2xl border border-slate-100 max-w-[500px] w-full flex flex-col overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">{initialData ? 'Edit' : 'Add'} Application</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Company Name *</label>
            <input {...register('companyName')} placeholder="e.g. Google" className={inputStyles(!!errors.companyName)} />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Job Title *</label>
            <input {...register('jobTitle')} placeholder="e.g. Software Engineer" className={inputStyles(!!errors.jobTitle)} />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Job Type</label>
              <select {...register('jobType')} className={inputStyles(false)}>
                <option value="Full_time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part_time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Status</label>
              <select {...register('status')} className={inputStyles(false)}>
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Applied Date *</label>
            <input type="date" {...register('appliedDate')} className={inputStyles(!!errors.appliedDate)} />
            {errors.appliedDate && <p className="text-red-500 text-xs mt-1">{errors.appliedDate.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Notes (Optional)</label>
            <textarea rows={3} {...register('notes')} placeholder="Referrals, context link, stacks..." className={`${inputStyles(false)} resize-none`} />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50">
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
