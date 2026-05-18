"use client";

import Script from "next/script";
import { BaseModal } from "@/components/modal/BaseModal";

const calendlyUrl = "https://calendly.com/YOUR_CALENDLY_LINK/30min";

export function CalendlyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseModal open={open} onClose={onClose} titleId="calendly-title" wide>
      <div className="modal-header">
        <div>
          <div className="modal-eyebrow">Book directly</div>
          <div className="modal-title" id="calendly-title">
            Pick a<br />
            <em>demo slot.</em>
          </div>
          <p className="modal-sub">
            Choose a 30-minute walkthrough time without leaving the site.
          </p>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="modal-body">
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <div
          className="calendly-inline-widget calendly-frame"
          data-url={calendlyUrl}
        />
        <noscript>
          <iframe className="calendly-frame" src={calendlyUrl} title="Book a slydr demo" />
        </noscript>
      </div>
    </BaseModal>
  );
}
