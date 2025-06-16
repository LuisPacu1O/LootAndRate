import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);
