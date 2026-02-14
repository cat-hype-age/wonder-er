import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Play, Mic, Settings, BookOpen, Presentation } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Begin Session", path: "/session?mode=reflection", icon: Mic },
  { label: "Watch Demo", path: "/demo", icon: Play },
  { label: "Slide Deck", path: "/slides", icon: Presentation },
  { label: "About Wonder", path: "/framework", icon: BookOpen },
  { label: "Settings", path: "/settings", icon: Settings },
];

const WonderNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    setOpen(false);
    setTimeout(() => navigate(path), 200);
  };

  const isActive = (path: string) => {
    const base = path.split("?")[0];
    return location.pathname === base;
  };

  return (
    <>
      {/* Hamburger trigger — fixed top-left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-wonder-navy-light/80 backdrop-blur-md border border-wonder-purple/20 flex items-center justify-center text-wonder-teal/70 hover:text-wonder-teal hover:border-wonder-purple/40 transition-all shadow-lg"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.nav
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-wonder-navy border-r border-wonder-purple/15 flex flex-col safe-top safe-bottom shadow-2xl shadow-wonder-navy/80"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-wonder-purple/10">
                <span className="text-wonder-teal font-display text-lg">Wonder</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-wonder-teal/50 hover:text-wonder-teal transition-colors"
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 px-4 py-6 flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-body text-sm transition-all text-left ${
                      isActive(item.path)
                        ? "bg-wonder-purple/20 text-wonder-teal border border-wonder-purple/25"
                        : "text-wonder-teal/60 hover:text-wonder-teal hover:bg-wonder-navy-light/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-wonder-purple/10">
                <p className="text-wonder-purple/30 font-body text-xs">
                  No account needed · No data collected
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WonderNav;
