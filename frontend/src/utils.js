// toastUtils.js
import { toast } from "react-hot-toast";

export function showSuccess(message) {
  toast.success(message, {
    style: {
      background: '#dcfce7', // Tailwind's green-100
      color: '#166534',      // Tailwind's green-800
      border: '1px solid #22c55e', // green-500
    },
    iconTheme: {
      primary: '#22c55e',
      secondary: '#f0fdf4',
    },
  });
}

export function showError(message) {
  toast.error(message, {
    style: {
      background: '#fee2e2', // red-100
      color: '#7f1d1d',      // red-800
      border: '1px solid #ef4444', // red-500
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fef2f2',
    },
  });
}