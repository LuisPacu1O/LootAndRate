import React from "react";

export function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Do you want to logout?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
