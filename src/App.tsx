/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { GRID_ITEMS } from './data';
import { FilterCategory, GridItemData } from './types';
import Header from './components/Header';
import GridItem from './components/GridItem';
import SearchOverlay from './components/SearchOverlay';
import CardDetail from './components/CardDetail';
import Footer from './components/Footer';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('Everything');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GridItemData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Categories list
  const categories: FilterCategory[] = [
    'Everything',
    'Workshops',
    'Tools',
    'Stories',
    'Shop',
    'Degree Programs'
  ];

  // Map user categories to their respective data types
  const filterItem = (item: GridItemData) => {
    if (currentCategory === 'Everything') return true;
    if (currentCategory === 'Workshops') return item.type === 'Workshop';
    if (currentCategory === 'Tools') return item.type === 'Tool';
    if (currentCategory === 'Stories') return item.type === 'Story';
    if (currentCategory === 'Shop') return item.type === 'Shop';
    if (currentCategory === 'Degree Programs') return item.type === 'Degree Program' || item.id === 'graduate-degree';
    return true;
  };

  // Divide data into Primary Grid (first 10 items) and Secondary Grid (last 3 items)
  // when "Everything" is selected to preserve the exact d.school board layout.
  // When a filter is active, we consolidate them into a single fluid grid.
  const primaryItems = GRID_ITEMS.slice(0, 10).filter(filterItem);
  const secondaryItems = GRID_ITEMS.slice(10).filter(filterItem);

  const isFiltered = currentCategory !== 'Everything';

  return (
    <div className="bg-background text-on-background selection:bg-primary selection:text-white font-sans overflow-x-hidden min-h-screen flex flex-col">
      
      {/* Top App Bar */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setIsDropdownOpen(false);
        }}
        currentCategory={currentCategory}
      />

      {/* Discovery Selector Hero */}
      <section className="py-12 md:py-20 flex flex-col items-center justify-center text-center px-6 relative z-30">
        <p className="font-serif italic text-base md:text-lg mb-2 text-on-surface-variant">
          I'm curious about...
        </p>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="font-serif text-4xl md:text-7xl text-primary italic font-black border-b-4 md:border-b-8 border-primary pb-2 flex items-center gap-3 md:gap-4 hover:opacity-95 transition-all cursor-pointer"
            id="curiosity-dropdown-toggle"
          >
            {currentCategory}
            <ChevronDown className="w-8 h-8 md:w-12 md:h-12 stroke-[2.5]" />
          </button>

          {/* Brutalist Dropdown Panel */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 -translate-x-1/2 mt-4 bg-background border-4 border-on-background shadow-[6px_6px_0px_0px_rgba(31,28,6,1)] w-72 md:w-96 text-left overflow-hidden z-40"
                id="curiosity-dropdown-menu"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-4 font-sans font-bold text-sm md:text-base border-b-2 border-on-background last:border-b-0 transition-all cursor-pointer block ${
                      currentCategory === cat 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-on-background/5 text-on-background'
                    }`}
                    id={`filter-opt-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <main className="w-full px-2 md:px-0 bg-background flex-1">
        
        {isFiltered ? (
          /* Consolidated view when filtering to prevent empty gaps */
          <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">
            <div className="flex justify-between items-center mb-8 border-b border-on-background/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                Filtered Board / {currentCategory}
              </span>
              <button 
                onClick={() => setCurrentCategory('Everything')}
                className="font-mono text-[11px] uppercase text-primary font-black flex items-center gap-2 hover:underline cursor-pointer"
                id="reset-filter-link"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Show All Everything
              </button>
            </div>
            
            {primaryItems.length === 0 && secondaryItems.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-on-background/10">
                <p className="font-serif italic text-2xl text-on-surface-variant">
                  We are currently drafting new resources for this section.
                </p>
                <button
                  onClick={() => setCurrentCategory('Everything')}
                  className="mt-6 bg-on-background text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-primary transition-all cursor-pointer"
                >
                  Return to Everything
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[...primaryItems, ...secondaryItems].map(item => (
                  <GridItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => setSelectedItem(item)} 
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Classic d.school Asymmetric Multi-Grid Layout */
          <div className="space-y-2">
            
            {/* Primary Grid */}
            <div className="masonry-grid max-w-full">
              {primaryItems.map(item => (
                <GridItem 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </div>

            {/* Marquee Transition Banner */}
            <section className="w-full bg-primary py-4 border-y border-on-background ticker-container">
              <div className="ticker-content flex gap-12 items-center">
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                {/* Loop duplicates for continuous seamless scrolling */}
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
                <span className="text-white/40 text-3xl font-bold">·</span>
                <span className="text-white font-sans font-black text-2xl uppercase tracking-tighter">Workshops & Tools</span>
              </div>
            </section>

            {/* Secondary Grid */}
            <div className="masonry-grid max-w-full">
              {secondaryItems.map(item => (
                <GridItem 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Footer Branding & Social */}
      <Footer />

      {/* Search Takeover Dialog */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        )}
      </AnimatePresence>

      {/* Detailed Side Panel Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <CardDetail 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
