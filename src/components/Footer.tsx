/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Link as LinkIcon, Camera, Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email cannot be empty.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email.');
      return;
    }
    
    // Success flow
    setSubscribed(true);
    setEmail('');
    setError('');
  };

  return (
    <footer className="bg-on-background text-background mt-16 border-t border-on-background/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 py-16 w-full max-w-7xl mx-auto">
        
        {/* Brand & Subscribe */}
        <div className="flex flex-col gap-8 md:col-span-2">
          <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
            Stanford d.school
          </h2>
          <div className="max-w-md space-y-6">
            <p className="font-serif italic text-sm text-surface-variant/80">
              Updates from the d.school
            </p>
            <h3 className="font-sans text-xl md:text-2xl font-extrabold leading-snug text-white">
              Want to learn more & get involved? Subscribe for updates.
            </h3>
            
            {subscribed ? (
              <div className="bg-workshop-teal/20 p-4 border border-workshop-teal/50 flex items-center gap-3 text-workshop-teal" id="newsletter-success">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  You have subscribed successfully! Welcome to the d.school newsletter.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="name@domain.com"
                    className="flex-1 bg-white/10 text-white placeholder:text-white/40 border border-white/20 p-4 text-sm font-sans outline-none focus:border-white transition-colors"
                    id="newsletter-email-input"
                  />
                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-white text-on-background px-8 py-4 font-mono text-xs uppercase tracking-widest font-black hover:bg-primary hover:text-white transition-all cursor-pointer"
                    id="newsletter-submit-btn"
                  >
                    Get the latest <Mail className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-xs text-primary font-mono" id="newsletter-error">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest border-b border-background/20 pb-2 mb-4 font-bold text-white/90">
              About
            </h4>
            <ul className="space-y-2">
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Our Space</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Stories</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">News</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Directory</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest border-b border-background/20 pb-2 mb-4 font-bold text-white/90">
              Study
            </h4>
            <ul className="space-y-2">
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Undergraduate Degree</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Graduate Degree</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Electives</a></li>
            </ul>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-6 justify-between">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest border-b border-background/20 pb-2 mb-4 font-bold text-white/90">
              Innovate
            </h4>
            <ul className="space-y-2">
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Professional Education</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Shop</a></li>
              <li><a className="text-surface-variant hover:text-white text-sm font-sans transition-colors" href="#">Tools</a></li>
            </ul>
          </div>
          <div className="flex gap-3 pt-6 md:pt-0">
            <a 
              className="w-10 h-10 border border-background/30 flex items-center justify-center rounded-full hover:border-white text-background hover:text-white transition-colors" 
              href="#"
              aria-label="Link Icon"
            >
              <LinkIcon className="w-4 h-4" />
            </a>
            <a 
              className="w-10 h-10 border border-background/30 flex items-center justify-center rounded-full hover:border-white text-background hover:text-white transition-colors" 
              href="#"
              aria-label="Instagram"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a 
              className="w-10 h-10 border border-background/30 flex items-center justify-center rounded-full hover:border-white text-background hover:text-white transition-colors" 
              href="#"
              aria-label="Twitter/Send"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright and Sub-footer */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="px-6 md:px-16 py-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <span className="font-serif italic text-xs text-surface-variant/65">
              © 2026 Hasso Plattner Institute of Design at Stanford University.
            </span>
            <a className="font-serif italic text-xs text-surface-variant/65 hover:text-white underline" href="#">
              Privacy Policy
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-right">
            <span className="font-sans font-extrabold text-sm tracking-tighter text-white">
              Stanford ENGINEERING
            </span>
            <span className="font-serif text-xs uppercase tracking-widest text-white/40">
              STANFORD UNIVERSITY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
