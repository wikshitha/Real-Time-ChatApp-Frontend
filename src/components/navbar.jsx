import { useEffect, useState } from "react";
import { LogOut, MessageCircle, Settings, User, Moon, Sun, } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export default function Navbar() {
  const { user, disconnectSocket } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-base-100/80 backdrop-blur-md border-b border-base-300 fixed w-full top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
     {/* Brand */}
<Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
  <div className="size-9 rounded-xl bg-secondary/20 flex items-center justify-center">
    {/* Updated icon */}
    <MessageCircle className="w-5 h-5 text-action" />

  </div>
  <h1 className="text-lg font-bold text-action">LiveLink</h1>
</Link>



        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-sm btn-outline rounded-full gap-2">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="hidden sm:inline capitalize">{theme} Mode</span>
          </button>

          {user && (
            <>
              <Link to="/profile" className="btn btn-sm rounded-full gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                className="btn btn-sm rounded-full gap-2 btn-error text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  disconnectSocket();
                  window.location.href = "/login";
                }}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
