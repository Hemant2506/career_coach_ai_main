import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let colorClasses = 'border-emerald-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg';
        let iconColor = 'text-emerald-500';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'border-rose-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg';
          iconColor = 'text-rose-500';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = 'border-blue-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg';
          iconColor = 'text-blue-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all duration-200 animate-in slide-in-from-bottom-2 ${colorClasses}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
