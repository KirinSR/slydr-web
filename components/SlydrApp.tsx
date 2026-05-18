"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CalendlyModal } from "@/components/modal/CalendlyModal";
import { DemoModal, WaitlistModal } from "@/components/modal/LeadModals";
import { RawPage } from "@/components/pages/RawPage";
import { type SlydrPage } from "@/lib/page-content";

type LeadModal = "demo" | "waitlist";

declare global {
  interface Window {
    showPage?: (id: SlydrPage) => void;
    openModal?: (id: LeadModal) => void;
    closeModal?: (id: LeadModal) => void;
    openCalendly?: () => void;
    selectInquiry?: (element: HTMLElement) => void;
  }
}

const pages: SlydrPage[] = ["home", "features", "pricing", "about", "contact"];

function isSlydrPage(value: string): value is SlydrPage {
  return pages.includes(value as SlydrPage);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function validateField(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null, error: HTMLElement | null, valid: boolean) {
  if (!input) return valid;
  input.classList.toggle("err", !valid);
  error?.classList.toggle("show", !valid);
  return valid;
}

export function SlydrApp() {
  const [activePage, setActivePage] = useState<SlydrPage>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [leadModal, setLeadModal] = useState<LeadModal | null>(null);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3800);
  }, []);

  const initReveals = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll(".reveal:not(.in)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback(
    (page: SlydrPage) => {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(initReveals, 100);
    },
    [initReveals],
  );

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isLight = html.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("slydr-theme", next);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("slydr-theme");
    const preferLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", saved || (preferLight ? "light" : "dark"));
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const cursor = document.getElementById("cur");
    const ring = document.getElementById("cur-ring");
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const loop = () => {
      if (cursor && ring) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      frame = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove);
    frame = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => initReveals(), [activePage, initReveals]);

  useEffect(() => {
    const chartBars = Array.from(document.querySelectorAll<HTMLElement>("#chart .sv-b"));
    const baseHeights = [60, 80, 44, 90, 64];
    const chartInterval = window.setInterval(() => {
      chartBars.forEach((bar, index) => {
        const next = baseHeights[index] + Math.round((Math.random() - 0.5) * 28);
        bar.style.height = `${Math.max(18, Math.min(94, next))}%`;
      });
    }, 2400);

    const thumbs = Array.from(document.querySelectorAll<HTMLElement>(".pt"));
    let thumbIndex = 0;
    const thumbInterval = window.setInterval(() => {
      if (thumbs.length === 0) return;
      thumbs.forEach((thumb) => thumb.classList.remove("hot"));
      thumbIndex = (thumbIndex + 1) % thumbs.length;
      thumbs[thumbIndex].classList.add("hot");
    }, 2000);

    return () => {
      window.clearInterval(chartInterval);
      window.clearInterval(thumbInterval);
    };
  }, [activePage]);

  useEffect(() => {
    window.showPage = (id) => {
      if (isSlydrPage(id)) navigate(id);
    };
    window.openModal = (id) => setLeadModal(id);
    window.closeModal = () => setLeadModal(null);
    window.openCalendly = () => setCalendlyOpen(true);
    window.selectInquiry = (element) => {
      document.querySelectorAll(".iq-opt").forEach((option) => option.classList.remove("selected"));
      element.classList.add("selected");
      const value = element.dataset.val || "demo";
      const hidden = document.getElementById("cf-inquiry-hidden") as HTMLInputElement | null;
      if (hidden) hidden.value = value;
      const labels: Record<string, string> = {
        demo: "Request a walkthrough",
        enterprise: "Send enterprise inquiry",
        partner: "Apply as design partner",
        other: "Send message",
      };
      const button = document.getElementById("cf-submit");
      if (button) button.textContent = labels[value] || "Send inquiry";
    };
  }, [navigate]);

  useEffect(() => {
    const submitHandler = async (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      if (form.id === "wl-inline-form") {
        event.preventDefault();
        const email = document.getElementById("wli-email") as HTMLInputElement | null;
        const valid = validateField(email, document.getElementById("wli-err"), Boolean(email && isValidEmail(email.value)));
        if (!valid) return;

        const button = document.getElementById("wli-submit") as HTMLButtonElement | null;
        if (button) {
          button.disabled = true;
          button.textContent = "...";
        }
        await new Promise((resolve) => window.setTimeout(resolve, 650));
        form.style.display = "none";
        document.getElementById("wl-inline-success")?.classList.add("show");
        showToast("You're on the waitlist.");
      }

      if (form.id === "contact-form") {
        event.preventDefault();
        const firstName = document.getElementById("cf-fname") as HTMLInputElement | null;
        const email = document.getElementById("cf-email") as HTMLInputElement | null;
        const firstNameOk = validateField(firstName, document.getElementById("cf-fname-err"), Boolean(firstName?.value.trim()));
        const emailOk = validateField(email, document.getElementById("cf-email-err"), Boolean(email && isValidEmail(email.value)));
        if (!firstNameOk || !emailOk) return;

        const button = document.getElementById("cf-submit") as HTMLButtonElement | null;
        if (button) {
          button.disabled = true;
          button.textContent = "Sending...";
        }
        form.classList.add("form-loading");
        await new Promise((resolve) => window.setTimeout(resolve, 750));
        form.style.display = "none";
        document.getElementById("contact-success")?.classList.add("show");
        showToast("Message sent. We'll reply within 24 hours.");
      }
    };

    document.addEventListener("submit", submitHandler);
    return () => document.removeEventListener("submit", submitHandler);
  }, [showToast]);

  return (
    <>
      <div id="cur" />
      <div id="cur-ring" />
      <Navbar
        activePage={activePage}
        isScrolled={isScrolled}
        onNavigate={navigate}
        onOpenModal={setLeadModal}
        onToggleTheme={toggleTheme}
      />
      <AnimatePresence mode="wait">
        <RawPage key={activePage} page={activePage} />
      </AnimatePresence>
      <Footer onNavigate={navigate} />
      <DemoModal
        open={leadModal === "demo"}
        onClose={() => setLeadModal(null)}
        onCalendly={() => setCalendlyOpen(true)}
        onToast={showToast}
      />
      <WaitlistModal
        open={leadModal === "waitlist"}
        onClose={() => setLeadModal(null)}
        onToast={showToast}
      />
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
      <div className={`notif ${toast ? "show" : ""}`}>
        <div className="notif-dot" />
        <div className="notif-txt">{toast || "Done."}</div>
      </div>
    </>
  );
}
