"use client";

import { MapPin, Mail } from "lucide-react";
import { useState } from "react";

function Modal({
  open,
  onClose,
  title,
  content,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-figma-bg-dark max-w-2xl w-full rounded-xl shadow-lg p-0 relative flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-figma-bg-dark rounded-t-xl px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-figma-white">{title}</h2>
          <button
            className="text-gray-400 hover:text-figma-white text-2xl font-bold ml-4"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div
          className="px-6 pb-6 pt-2 overflow-y-auto text-sm text-gray-400 custom-scrollbar"
          style={{ height: "60vh", scrollBehavior: "smooth" }}
        >
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #18181b;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #3f3f46;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #facc15;
            }
            .custom-scrollbar {
              scrollbar-color: #3f3f46 #18181b;
              scrollbar-width: thin;
            }
          `}</style>
          {loading ? (
            <div className="text-center py-8 text-figma-white font-semibold">
              Loading...
            </div>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyText, setPrivacyText] = useState("");
  const [termsText, setTermsText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenPrivacy = async () => {
    setLoading(true);
    setPrivacyOpen(true);
    const text = await fetch("/policies/privacy-policy.txt").then((r) =>
      r.text()
    );
    setPrivacyText(text);
    setLoading(false);
  };
  const handleOpenTerms = async () => {
    setLoading(true);
    setTermsOpen(true);
    const text = await fetch("/policies/terms-and-conditions.txt").then((r) =>
      r.text()
    );
    setTermsText(text);
    setLoading(false);
  };

  return (
    <footer className="bg-figma-bg-dark text-figma-text-white">
      <Modal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
        content={privacyText}
        loading={loading}
      />
      <Modal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms and Conditions"
        content={termsText}
        loading={loading}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col flex-wrap md:flex-row justify-between items-start gap-4">
          {/* Company Info */}
          <div className="lg:w-1/4 mb-2">
            <div className="mb-6">
              <div className="text-figma-text-white font-bold text-xl sm:text-2xl leading-tight">
                VEENA ENTERPRISES
              </div>
              <div className="text-figma-text-white text-sm tracking-widest mt-1">
                SOLAR SERVICES
              </div>
            </div>
            <p className="text-figma-text-muted text-sm leading-relaxed max-w-md">
              Leading solar panel installation and solar services in Jaipur. We
              help you go green while saving money on your electricity bills.
            </p>
          </div>

          <div className="flex justify-start gap-12 w-full lg:w-2/4 lg:justify-between">
            {/* Quick Links */}
            <div>
              <h3 className="text-figma-white text-sm font-semibold mb-6 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#why-choose-us"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-figma-white text-sm font-semibold mb-6 uppercase tracking-wider">
                Our Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#services"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Solar Panel Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    On-Grid & Off-Grid Systems
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Solar Inverters & Batteries
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-figma-text-muted hover:text-figma-white transition-colors text-sm"
                  >
                    Maintenance & AMC Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-figma-border-dark">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h3 className="lg:w-1/4 text-figma-white text-sm font-semibold uppercase tracking-wider">
              Contact Info
            </h3>
            <div className="flex flex-wrap sm:flex-nowrap justify-start gap-12 w-full lg:w-2/4 lg:justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-figma-white mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-figma-text-white text-sm mb-1">
                    Visit Us
                  </div>
                  <div className="text-figma-text-muted text-sm">
                    57, Govind Nagar West, Amer Road, Jaipur
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-figma-white mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-figma-text-white text-sm mb-1">
                    Email Us
                  </div>
                  <div className="text-figma-text-muted text-sm">
                    info@veenaenterprises.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-figma-border-dark">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-figma-text-muted text-xs text-center md:text-left">
              © 2024 Veena Enterprises Solar Services. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button
                className="text-figma-text-muted hover:text-figma-white text-xs transition-colors underline"
                onClick={handleOpenPrivacy}
              >
                Privacy Policy
              </button>
              <button
                className="text-figma-text-muted hover:text-figma-white text-xs transition-colors underline"
                onClick={handleOpenTerms}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
