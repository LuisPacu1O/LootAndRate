export function ButtonLogout({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}
