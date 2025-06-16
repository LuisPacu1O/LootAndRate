import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";
import { LogoutModal } from "./ui/LogoutModal";
import { ButtonLogout } from "./ui/ButtonLogout";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => setShowModal(true);
  const confirmLogout = () => {
    logout();
    setShowModal(false);
    setMenuOpen(false);
  };

  return (
    <>
     <nav className="bg-zinc-800 text-white rounded-lg shadow-md p-4 sm:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-400">
          <Link to={isAuthenticated ? "/" : "/"}>Loot&Rate</Link>
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <ul className="hidden sm:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <li className="text-xl">👋 Welcome <strong>{user.username}</strong></li>
              <li>
                <ButtonLink to="/profile">Profile</ButtonLink>
              </li>
              <li>
                <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {menuOpen && (
        <ul className="flex flex-col gap-3 mt-4 sm:hidden">
          {isAuthenticated ? (
            <>
              <li className="text-sm">👋 Welcome <strong>{user.username}</strong></li>
              <li>
                <ButtonLink to="/profile">Profile</ButtonLink>
              </li>
              <li>
                <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}

export default Navbar;
