'use client';

import Link from "next/link";
import { useState } from 'react';
import PrivacyPolicyModal from '@/components/PrivacyPolicy';
import TermsOfServiceModal from '@/components/TermsOfService';

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterMessage('Your email has sent to the administrator, wait for confirmation if you are qualified to brew some cache!');
        setNewsletterEmail('');
      } else {
        setNewsletterMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setNewsletterMessage('Oops! Something went wrong. Please try again.');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">BC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif">Brew Cache</h3>
                <p className="text-xs text-white/80">Craft Beer Chronicles</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Your ultimate destination for craft beer stories, brewing insights, and beer culture chronicles from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                  Beer Blogs
                </Link>
              </li>
              <li>
                <Link href="/beers" className="text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                  Beers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-serif">Stay Updated</h4>
            <p className="text-white/80 text-sm mb-4">
              Get the latest beer news and brewing tips delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                required
              />
              <button 
                type="submit"
                disabled={isNewsletterSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterMessage && (
              <p className="mt-2 text-sm font-medium text-accent">{newsletterMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-baseline space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-white/60 text-sm">
                © 2025 Brew Cache. All rights reserved.
              </p>
              <button type="button" onClick={() => setPrivacyOpen(true)} className="text-white/60 hover:text-accent text-sm transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </button>
              <button type="button" onClick={() => setTermsOpen(true)} className="text-white/60 hover:text-accent text-sm transition-colors duration-200 cursor-pointer">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}