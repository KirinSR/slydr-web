"use client";

import { type SlydrPage } from "@/lib/page-content";
import { MoonIcon, SunIcon } from "@/components/ui/SlydrIcons";

const navItems: Array<{ id: SlydrPage; label: string }> = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar({
  activePage,
  isScrolled,
  onNavigate,
  onOpenModal,
  onToggleTheme,
}: {
  activePage: SlydrPage;
  isScrolled: boolean;
  onNavigate: (page: SlydrPage) => void;
  onOpenModal: (modal: "demo" | "waitlist") => void;
  onToggleTheme: () => void;
}) {
  return (
    <nav id="nav" className={isScrolled ? "scrolled" : undefined}>
      <a
        href="#"
        className="nav-logo"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("home");
        }}
      >
        slydr
      </a>
      <ul className="nav-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              data-page={item.id}
              className={activePage === item.id ? "active-link" : undefined}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="nav-btn ghost" onClick={() => onOpenModal("waitlist")}>
          Join waitlist
        </button>
        <button className="nav-btn gold" onClick={() => onOpenModal("demo")}>
          Request demo
        </button>
        <button
          className="theme-toggle"
          id="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle light/dark mode"
        >
          <MoonIcon />
          <SunIcon />
        </button>
      </div>
    </nav>
  );
}
