"use client";

import { type MouseEvent } from "react";
import { type SlydrPage } from "@/lib/page-content";
import { LinkedInIcon, XIcon } from "@/components/ui/SlydrIcons";

export function Footer({ onNavigate }: { onNavigate: (page: SlydrPage) => void }) {
  const link = (page: SlydrPage) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="foot-brand">
          <a href="#" className="nav-logo" onClick={link("home")}>
            slydr
          </a>
          <p className="foot-tagline">Organizational presentation memory. Stop rebuilding slides.</p>
          <div className="foot-socials">
            <a href="#" className="soc-btn" title="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="#" className="soc-btn" title="Twitter/X">
              <XIcon />
            </a>
          </div>
        </div>
        <div className="foot-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#" onClick={link("features")}>Features</a></li>
            <li><a href="#" onClick={link("pricing")}>Pricing</a></li>
            <li><a href="#" onClick={link("home")}>How it works</a></li>
            <li><a href="#" onClick={link("contact")}>Request demo</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#" onClick={link("about")}>About</a></li>
            <li><a href="#" onClick={link("contact")}>Contact</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter / X</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Cookie policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="foot-copy">© 2026 slydr. All rights reserved.</span>
        <div className="foot-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
}
