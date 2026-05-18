"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { BaseModal } from "@/components/modal/BaseModal";
import { CheckIcon } from "@/components/ui/SlydrIcons";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function SuccessState({
  title,
  children,
  onCalendly,
}: {
  title: string;
  children: ReactNode;
  onCalendly?: () => void;
}) {
  return (
    <div className="form-success show">
      <div className="success-ico">
        <CheckIcon />
      </div>
      <div className="success-title">{title}</div>
      <p className="success-sub">{children}</p>
      {onCalendly ? (
        <div style={{ marginTop: 24 }}>
          <button className="btn-calendly" style={{ margin: "0 auto" }} onClick={onCalendly}>
            Book a call now
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function DemoModal({
  open,
  onClose,
  onCalendly,
  onToast,
}: {
  open: boolean;
  onClose: () => void;
  onCalendly: () => void;
  onToast: (message: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({ firstName: false, email: false });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = {
      firstName: String(form.get("first_name") || "").trim().length === 0,
      email: !isValidEmail(String(form.get("email") || "")),
    };
    setErrors(nextErrors);
    if (nextErrors.firstName || nextErrors.email) return;

    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setBusy(false);
    setSubmitted(true);
    onToast("Request received. We'll be in touch within 24 hours.");
  };

  return (
    <BaseModal open={open} onClose={onClose} titleId="demo-title">
      <div className="modal-header">
        <div>
          <div className="modal-eyebrow">Early access</div>
          <div className="modal-title" id="demo-title">
            Request a<br />
            <em>live walkthrough.</em>
          </div>
          <p className="modal-sub">
            Tell us about your team and we&apos;ll reach out within 24 hours to book a call — or jump straight onto our calendar below.
          </p>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="modal-body">
        <div className="calendly-row">
          <div>
            <div className="calendly-label">Book a call directly</div>
            <div className="calendly-sub">Pick a time that works — 30 min walkthrough</div>
          </div>
          <button className="btn-calendly" onClick={onCalendly}>Book a call</button>
        </div>
        <div className="modal-divider" />
        {submitted ? (
          <SuccessState title="Request received." onCalendly={onCalendly}>
            We&apos;ll be in touch within 24 hours.
            <br />
            Or book a time directly on our calendar.
          </SuccessState>
        ) : (
          <form onSubmit={submit} noValidate className={busy ? "form-loading" : undefined}>
            <div className="f-row">
              <div className="f-group">
                <label className="f-label" htmlFor="df-fname">First name</label>
                <input className={`f-input ${errors.firstName ? "err" : ""}`} id="df-fname" name="first_name" type="text" placeholder="Alex" autoComplete="given-name" />
                <span className={`f-err-msg ${errors.firstName ? "show" : ""}`}>Required</span>
              </div>
              <div className="f-group">
                <label className="f-label" htmlFor="df-lname">Last name</label>
                <input className="f-input" id="df-lname" name="last_name" type="text" placeholder="Johnson" autoComplete="family-name" />
              </div>
            </div>
            <div className="f-group">
              <label className="f-label" htmlFor="df-email">Work email</label>
              <input className={`f-input ${errors.email ? "err" : ""}`} id="df-email" name="email" type="email" placeholder="alex@company.com" autoComplete="email" />
              <span className={`f-err-msg ${errors.email ? "show" : ""}`}>Please enter a valid work email</span>
            </div>
            <div className="f-row">
              <div className="f-group">
                <label className="f-label" htmlFor="df-company">Company</label>
                <input className="f-input" id="df-company" name="company" type="text" placeholder="Acme Corp" />
              </div>
              <div className="f-group">
                <label className="f-label" htmlFor="df-size">Team size</label>
                <select className="f-select" id="df-size" name="team_size">
                  <option value="">Select...</option>
                  <option>1-10</option><option>11-50</option><option>51-200</option><option>200+</option>
                </select>
              </div>
            </div>
            <div className="f-group">
              <label className="f-label" htmlFor="df-msg">What&apos;s the slide problem you&apos;re solving? <span style={{ color: "var(--faint)" }}>(optional)</span></label>
              <textarea className="f-textarea" id="df-msg" name="message" placeholder="How many decks does your team manage? What's frustrating about finding slides today?" />
            </div>
            <button type="submit" className="btn-gold" style={{ width: "100%", textAlign: "center", padding: 15, marginTop: 4 }} disabled={busy}>
              {busy ? "Sending..." : "Request a walkthrough"}
            </button>
            <p style={{ fontSize: 11, color: "var(--faint)", textAlign: "center", marginTop: 12, letterSpacing: ".04em" }}>
              No commitment. We&apos;ll follow up within 24 hours.
            </p>
          </form>
        )}
      </div>
    </BaseModal>
  );
}

export function WaitlistModal({
  open,
  onClose,
  onToast,
}: {
  open: boolean;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "");
    const invalid = !isValidEmail(email);
    setEmailError(invalid);
    if (invalid) return;

    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setBusy(false);
    setSubmitted(true);
    onToast("You're on the list. We'll be in touch.");
  };

  return (
    <BaseModal open={open} onClose={onClose} titleId="wl-title">
      <div className="modal-header">
        <div>
          <div className="modal-eyebrow">Limited rollout</div>
          <div className="modal-title" id="wl-title">
            Join the<br />
            <em>waitlist.</em>
          </div>
          <p className="modal-sub">
            slydr is in a limited design partner program. Leave your email and we&apos;ll reach out when your spot opens.
          </p>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="modal-body">
        {submitted ? (
          <SuccessState title="You're on the list.">
            We&apos;ll notify you when your spot opens. In the meantime, follow our build-in-public updates on LinkedIn and X.
          </SuccessState>
        ) : (
          <form onSubmit={submit} noValidate className={busy ? "form-loading" : undefined}>
            <div className="f-group">
              <label className="f-label" htmlFor="wl-email">Work email</label>
              <input className={`f-input ${emailError ? "err" : ""}`} id="wl-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
              <span className={`f-err-msg ${emailError ? "show" : ""}`}>Please enter a valid email</span>
            </div>
            <div className="f-group">
              <label className="f-label" htmlFor="wl-company">Company <span style={{ color: "var(--faint)" }}>(optional)</span></label>
              <input className="f-input" id="wl-company" name="company" type="text" placeholder="Your company" />
            </div>
            <div className="f-group">
              <label className="f-label" htmlFor="wl-role">Role <span style={{ color: "var(--faint)" }}>(optional)</span></label>
              <select className="f-select" id="wl-role" name="role">
                <option value="">Select...</option>
                <option>Sales / BD</option><option>Marketing</option><option>Strategy / Consulting</option><option>Product</option><option>Engineering</option><option>Leadership / Executive</option><option>Other</option>
              </select>
            </div>
            <button type="submit" className="btn-gold" style={{ width: "100%", textAlign: "center", padding: 15, marginTop: 8 }} disabled={busy}>
              {busy ? "Sending..." : "Join the waitlist"}
            </button>
            <p style={{ fontSize: 11, color: "var(--faint)", textAlign: "center", marginTop: 12, letterSpacing: ".04em" }}>
              No spam. Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </BaseModal>
  );
}
