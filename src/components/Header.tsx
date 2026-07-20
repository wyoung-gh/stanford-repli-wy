/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Grid } from 'lucide-react';
import { FilterCategory } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onSelectCategory: (category: FilterCategory) => void;
  currentCategory: FilterCategory;
}

export default function Header({ onOpenSearch, onSelectCategory, currentCategory }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-on-background flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-full">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => onSelectCategory('Everything')}
          className="text-2xl font-black text-on-background hover:text-primary transition-colors cursor-pointer text-left"
          id="brand-logo"
        >
          Stanford d.school
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onSelectCategory('Degree Programs')}
            className={`font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer ${
              currentCategory === 'Degree Programs' 
                ? 'italic underline text-primary font-bold' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Study
          </button>
          <button 
            onClick={() => onSelectCategory('Workshops')}
            className={`font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer ${
              currentCategory === 'Workshops' 
                ? 'italic underline text-primary font-bold' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Innovate
          </button>
          <button 
            onClick={() => onSelectCategory('Stories')}
            className={`font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer ${
              currentCategory === 'Stories' 
                ? 'italic underline text-primary font-bold' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Connect
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSearch}
          className="p-2 hover:scale-95 active:scale-90 transition-transform cursor-pointer text-on-background"
          aria-label="Search"
          id="search-btn"
        >
          <Search className="w-5 h-5 stroke-[2.5]" />
        </button>
        <button 
          onClick={() => onSelectCategory('Everything')}
          className="p-2 hover:scale-95 active:scale-90 transition-transform cursor-pointer text-on-background"
          aria-label="Reset View"
          id="grid-btn"
        >
          <Grid className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
}
