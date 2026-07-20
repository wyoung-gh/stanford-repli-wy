/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ContentType = 'Event' | 'Story' | 'Tool' | 'Degree Program' | 'Shop' | 'Read More' | 'Workshop';

export interface GridItemData {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  category?: string;
  image?: string;
  actionText?: string;
  bgColor: string;
  textColor?: string;
  colSpan?: string;
  rowSpan?: string;
  details?: {
    overview: string;
    objectives: string[];
    audience: string;
    duration?: string;
    instructors?: string[];
  };
}

export type FilterCategory = 'Everything' | 'Workshops' | 'Tools' | 'Stories' | 'Shop' | 'Degree Programs';
