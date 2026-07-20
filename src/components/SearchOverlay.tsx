/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { GridItemData } from '../types';
import { GRID_ITEMS } from '../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: GridItemData) => void;
}

export default function SearchOverlay({ isOpen, onClose, onSelectItem }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = query.trim() === '' 
    ? [] 
    : GRID_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-impact-red text-white z-[60] flex flex-col p-6 md:p-16 overflow-y-auto no-scrollbar"
      id="search-overlay-container"
    >
      <div className="flex justify-between items-center w-full">
        <span className="font-mono text-xs uppercase tracking-widest text-white/75">d.school search engine</span>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-impact-red transition-all cursor-pointer"
          aria-label="Close search"
          id="close-search-btn"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto my-12">
        <h2 className="font-serif text-4xl md:text-6xl italic font-bold mb-8 text-center text-white/90">
          I'm curious about...
        </h2>
        
        <div className="relative border-b-4 md:border-b-8 border-white pb-4 mb-12 flex items-center gap-4">
          <Search className="w-8 h-8 md:w-12 md:h-12 text-white/70 stroke-[2.5]" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your design topic, tool, or class..."
            className="w-full bg-transparent text-3xl md:text-5xl font-serif italic outline-none placeholder:text-white/30 text-white border-none focus:ring-0 p-0"
            id="search-input-field"
          />
        </div>

        {query.trim() !== '' && (
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">
              Found {filteredItems.length} matching resources
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="bg-white/10 hover:bg-white/20 text-left p-6 border border-white/20 transition-all cursor-pointer group flex flex-col justify-between"
                  id={`search-result-${item.id}`}
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/75 bg-white/10 px-2 py-0.5 rounded-sm">
                      {item.type}
                    </span>
                    <h3 className="font-sans text-xl font-bold mt-3 leading-tight group-hover:underline">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="font-sans text-sm mt-2 text-white/80 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-serif italic text-xs text-white/60 mt-4 block">
                    Click to view activity details &rarr;
                  </span>
                </button>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <p className="font-serif italic text-lg text-white/70 text-center py-8">
                No matching guides found. Try searching "Tool", "Book", "AI", "Collaboration", or "Surgery".
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
