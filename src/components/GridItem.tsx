/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { GridItemData } from '../types';

interface GridItemProps {
  item: GridItemData;
  onClick: () => void;
  key?: string;
}

export default function GridItem({ item, onClick }: GridItemProps) {
  const isImageCard = !!item.image;

  // Let's determine custom font sizes and alignment to match the visual reference exactly
  if (isImageCard) {
    if (item.id === 'radical-collaboration') {
      return (
        <motion.div
          layoutId={`card-container-${item.id}`}
          onClick={onClick}
          className={`relative group overflow-hidden border border-on-background/10 min-h-[400px] cursor-pointer ${item.colSpan || ''} ${item.rowSpan || ''}`}
          id={`grid-card-${item.id}`}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={item.image} 
            alt={item.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="font-mono text-xs uppercase tracking-wider text-white/95">
              {item.type}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-2 leading-tight group-hover:underline">
              {item.title}
            </h2>
          </div>
        </motion.div>
      );
    }

    // Product Card style (e.g. Creative Acts for Curious People or Design Social Change)
    const isDesignSocialChange = item.id === 'design-social-change';
    return (
      <motion.div
        layoutId={`card-container-${item.id}`}
        onClick={onClick}
        className={`bg-background p-6 border border-on-background/10 flex flex-col justify-between group cursor-pointer ${item.colSpan || ''} ${item.rowSpan || ''}`}
        id={`grid-card-${item.id}`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {item.type}
          </span>
          <h3 className="font-serif text-2xl font-bold text-on-background mt-2 leading-tight group-hover:underline">
            {item.title}
          </h3>
        </div>

        <div className={`my-6 flex justify-center items-center ${isDesignSocialChange ? 'min-h-[280px]' : ''}`}>
          <img 
            className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
              isDesignSocialChange ? 'max-h-[260px] drop-shadow-2xl' : 'max-h-[220px] drop-shadow-lg'
            }`} 
            src={item.image} 
            alt={item.title}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex justify-between items-center border-t border-on-background/10 pt-4 mt-auto">
          <span className="font-mono text-xs uppercase tracking-wider border-b border-on-background pb-0.5 inline-block font-bold">
            {item.actionText || 'BUY NOW'}
          </span>
          <ShoppingCart className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    );
  }

  // Text-based Cards (Events, Stories, Tools, Degree Programs)
  const isDegree = item.type === 'Degree Program';
  const isReadMore = item.type === 'Read More';
  
  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      onClick={onClick}
      className={`${item.bgColor} ${item.textColor || 'text-on-background'} p-6 flex flex-col justify-between border border-on-background/10 min-h-[220px] cursor-pointer group ${item.colSpan || ''} ${item.rowSpan || ''}`}
      id={`grid-card-${item.id}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <span className="font-mono text-[11px] uppercase tracking-wider opacity-85 block font-bold">
          {item.type}
        </span>
        
        <h2 className={`font-sans font-extrabold mt-4 leading-snug group-hover:underline ${
          isDegree ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
        }`}>
          {item.title}
        </h2>
        
        {item.description && (
          <p className="mt-3 font-sans text-sm opacity-90 leading-relaxed max-w-sm">
            {item.description}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        {item.date ? (
          <div className="font-serif italic text-xs space-y-0.5">
            <p className="opacity-95">{item.date}</p>
            {item.location && <p className="opacity-75">{item.location}</p>}
          </div>
        ) : item.category ? (
          <span className="font-serif italic text-xs opacity-90 bg-black/5 px-2 py-1 rounded-sm">
            {item.category}
          </span>
        ) : isDegree || isReadMore || item.actionText ? (
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-on-background group-hover:text-background transition-all">
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="font-serif italic text-sm font-bold">
              {item.actionText || 'Learn More'}
            </span>
          </div>
        ) : (
          <span className="font-serif italic text-xs opacity-60">View Details &rarr;</span>
        )}
      </div>
    </motion.div>
  );
}
