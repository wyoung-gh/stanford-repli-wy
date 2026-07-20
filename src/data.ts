/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GridItemData } from './types';

export const GRID_ITEMS: GridItemData[] = [
  {
    id: 'book-club',
    type: 'Event',
    title: 'd.school Book Club: Creative Essentials',
    date: 'Jan 13–Dec 9, 2026',
    location: 'Online',
    bgColor: 'bg-surface-container-highest', // #ebe3bf
    textColor: 'text-on-surface-variant', // #5d3f3b
    details: {
      overview: 'Gather with curious minds around the globe to read, reflect, and practice creative acts from d.school resources. We dive deep into the mindsets that fuel extraordinary work.',
      objectives: [
        'Adopt robust experimental design habits',
        'Connect with international co-conspirators',
        'Practice low-fidelity prototyping from your living room'
      ],
      audience: 'Creatives, lifelong learners, educators, and anyone looking to shake up their routine.'
    }
  },
  {
    id: 'surgery-tools',
    type: 'Story',
    title: 'Laura Schütz: Developing Sound-Guided Surgery Tools',
    category: 'Impact',
    bgColor: 'bg-workshop-teal', // #79D7D9
    textColor: 'text-on-surface',
    details: {
      overview: 'Explore how design thinking and somatic listening techniques enabled Laura to pioneer audio-guided surgical instruments that improve surgeon precision and decrease fatigue.',
      objectives: [
        'Understand sensory translation in medical design',
        'Deconstruct acoustic prototyping',
        'Empathize with surgical staff through immersive field research'
      ],
      audience: 'Biomedical engineers, medical designers, acoustic specialists, and social impact advocates.'
    }
  },
  {
    id: 'secret-handshake',
    type: 'Tool',
    title: 'Secret Handshake',
    description: 'Introduce new collaborators to each other for the first time.',
    category: 'Educators',
    bgColor: 'bg-tool-blue', // #10AAF8 or #1faffd
    textColor: 'text-white',
    details: {
      overview: 'A signature d.school facilitation tool. Secret Handshake is a quick, high-energy exercise designed to break barriers, trigger laughter, and foster radical collaboration from minute one.',
      objectives: [
        'Lower performance anxiety in group setups',
        'Rapidly build psychological safety',
        'Establish a culture of playful testing'
      ],
      audience: 'Educators, workshop facilitators, team leads, and project orchestrators.'
    }
  },
  {
    id: 'undergrad-degree',
    type: 'Degree Program',
    title: 'Undergraduate Degree',
    actionText: 'Learn More',
    bgColor: 'bg-surface-variant', // #ebe3bf
    textColor: 'text-on-surface',
    colSpan: 'md:col-span-2',
    details: {
      overview: 'The d.school Undergraduate Program invites Stanford students from all majors to weave human-centered design into their primary academic discipline, tackling complex problems with hands-on practice.',
      objectives: [
        'Master the foundational d.school design cycle',
        'Collaborate on multi-disciplinary cohort projects',
        'Build a rigorous social impact portfolio'
      ],
      audience: 'Enrolled Stanford undergraduate students of all majors.'
    }
  },
  {
    id: 'radical-collaboration',
    type: 'Story',
    title: 'Practicing Radical Collaboration',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6WXbhAvynMXEHVhjcIxlKM4a-W6JbTKkPjyUULbMq3UejTx7WvQX1goxb5sdifeGAv4yCP8djtz36JQ2z8aBLWAbGaVPumtjjHM9LAeYkuL1MSoVnckJWRDooxtlHsqQhdvywUy9HeLr_2alpo1U4cIcbBsdDjfXmXwBT49vScxIns4hsbvLCd-sIQqYr8H8P3-BADAq7H1q0ATayNQtDJVyqDmHh0qS02bTUwHCOSBVwAy7g8W8orZhG7kajv-IoxmLHN6JIWm0',
    bgColor: 'bg-on-background', // image overlay fallback
    textColor: 'text-white',
    colSpan: 'md:col-span-2 md:row-span-2',
    details: {
      overview: 'Radical collaboration is the core engine of the d.school. Learn how diverse, multi-disciplinary squads leverage distinct perspectives, embrace failure as data, and move from abstract concepts to physical tests.',
      objectives: [
        'Navigate team tension creatively',
        'Establish shared visual vocabularies',
        'Co-create physical prototypes with multi-stakeholders'
      ],
      audience: 'Team leaders, creative managers, community organizers, and design facilitators.'
    }
  },
  {
    id: 'make-space',
    type: 'Shop',
    title: 'Make Space',
    description: 'Tools for creative spaces.',
    actionText: 'LEARN MORE',
    bgColor: 'bg-on-background', // #1f1c06
    textColor: 'text-white',
    details: {
      overview: 'Make Space is an action-oriented guide describing how to intentionally design environments—tools, furniture, and layouts—to inspire creative behaviors and foster collaborative mindsets.',
      objectives: [
        'Configure environments for creative work',
        'Implement fluid whiteboards and movable furniture',
        'Deconstruct spatial cues that hinder dialogue'
      ],
      audience: 'Studio managers, workspace designers, school leaders, and creative workers.'
    }
  },
  {
    id: 'human-centered-ai',
    type: 'Workshop',
    title: 'Human-Centered AI for Social Impact',
    description: 'How to leverage emerging technologies to solve real-world problems for communities that need it most.',
    date: 'Oct 7-9, 2026',
    location: '2.5-day Workshop · On Campus',
    bgColor: 'bg-tool-blue', // #10AAF8
    textColor: 'text-white',
    colSpan: 'md:row-span-2',
    details: {
      overview: 'This intensive workshop bridges the gap between emerging artificial intelligence systems and the real-world needs of marginalized communities. Students build tangible AI-driven products using ethical design frameworks.',
      objectives: [
        'Apply empathy-driven AI prompt engineering',
        'Evaluate ethical trade-offs of localized database architectures',
        'Conduct rapid wizard-of-oz user testing'
      ],
      audience: 'Product designers, AI researchers, software engineers, and public policy scholars.'
    }
  },
  {
    id: 'creative-acts',
    type: 'Shop',
    title: 'Creative Acts for Curious People',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsCPEgKNCpF9tm8Q4UFHHnD-iCrV0uponKDiSMpfkpYVz2-3xOKmLMifL4vib4JPHxrpXTkWza6DCWeoC-MPTYlma36eqUQEKbWEwxovxGhn_4XTsN2ktGlAYk7i1V2FRIzL8WCHwld1UEj-bFueC40Lh7m85VeH9sef4awOfuEJWpMy3VyaXpCuCgKLp6oBMdxJXyztYNBhcRHcDmidFvWRMgOexk_ljbJ4colTczkzy41EGJuw3YDvSfDAAxd8Hy1O7yO8UOQtk',
    actionText: 'BUY NOW',
    bgColor: 'bg-background', // #FCFCF7
    textColor: 'text-on-background',
    details: {
      overview: "Sarah Stein Greenberg's celebrated d.school handbook containing more than 80 innovative, field-tested assignments from the school's faculty to help you build your creative confidence.",
      objectives: [
        'Overcome creative blocks with brief exercises',
        'Hone powers of observation and active listening',
        'Develop experimental, risk-friendly daily habits'
      ],
      audience: 'Designers, leaders, writers, artists, and curious problem-solvers.'
    }
  },
  {
    id: 'edtech-remix',
    type: 'Story',
    title: 'EdTech Remix: Reimagining Learning',
    category: 'Share Out',
    bgColor: 'bg-story-yellow', // #E5D186
    textColor: 'text-on-surface',
    details: {
      overview: 'An exploratory story on rewriting the classroom experience. We detail how educators redesigned the digital classroom interface, prioritizing micro-moments of play and fluid student-led breakout zones.',
      objectives: [
        'Audit standard school workflows for hidden constraints',
        'Introduce gamified learning loops safely',
        'Iterate educational systems through co-design with students'
      ],
      audience: 'K-12 teachers, school principals, university instructors, and educational software designers.'
    }
  },
  {
    id: 'ethnography-field-guide',
    type: 'Tool',
    title: 'Ethnography Field Guide',
    description: 'Observation mindsets for designers.',
    category: 'Professionals',
    bgColor: 'bg-surface-container-high', // #f0e9c5
    textColor: 'text-on-surface',
    details: {
      overview: 'A pocket companion for designers entering the field. Learn how to observe non-verbal signals, conduct non-leading open-ended interviews, and organize qualitative data into actionable journey maps.',
      objectives: [
        'Conduct respectful, high-empathy field research',
        'Synthesize massive qualitative observation logs',
        'Isolate key insights that drive design decisions'
      ],
      audience: 'UX researchers, ethnographers, product designers, and social scientists.'
    }
  },
  {
    id: 'graduate-degree',
    type: 'Degree Program',
    title: 'Graduate Degree',
    actionText: 'Learn More',
    bgColor: 'bg-project-peach', // #FFCAC5
    textColor: 'text-on-surface',
    details: {
      overview: 'The d.school Graduate Program offers deep vertical training for graduate-level students, integrating advanced systems thinking, complex public sector challenges, and cutting-edge speculative futures design.',
      objectives: [
        'Apply advanced systems mapping techniques',
        'Design policy briefs and structural interventions',
        'Direct cross-industry design consultancy partnerships'
      ],
      audience: 'Stanford graduate students across all schools (Law, Medicine, Business, Humanities).'
    }
  },
  {
    id: 'design-project-guide',
    type: 'Tool',
    title: 'Design Project Guide',
    description: 'Discover new opportunities and better understand users.',
    category: 'Social Impact',
    bgColor: 'bg-workshop-teal', // #79D7D9
    textColor: 'text-on-surface',
    details: {
      overview: 'A comprehensive manual detailing how to run a human-centered design project from scratch. It contains structured worksheets, timeboxes, and scripts to guide you through empathy, definition, ideation, prototyping, and testing.',
      objectives: [
        'Formulate research guides that unpack user behaviors',
        'Facilitate generative brainstorming loops',
        'Build low-fidelity digital and physical prototypes quickly'
      ],
      audience: 'Design consulting practitioners, product team leads, and social sector innovators.'
    }
  },
  {
    id: 'design-social-change',
    type: 'Shop',
    title: 'Design Social Change',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjKzl82l0G-shHPzV9o26ch_aTDlqD_yZgj32iEwW2QFuOZX3Qnf6WMKJIN6AMi1LidFbyYD2yVghYK5mF2QNWdg6ST3K5idXF0bRu7OAcfvk4aP2Jhp6oQ9e6uBwRwnFGhrzjP7Rhe-uk1Yd0gYS7VloXHVx7Of0nEbMNYEztBMOqfEQ_CHZ3KXnD3SKYFtDJ_TunCmMOHXg7kzhOm-88s2qCy9QnrYAzN4o3MsrZJAIK2JZ9e1U8GstRsXEqbXd9K7Q-QzcNgoQ',
    actionText: 'BUY NOW',
    bgColor: 'bg-surface-container', // #f6eeca
    textColor: 'text-on-surface',
    colSpan: 'md:col-span-2',
    details: {
      overview: 'An award-winning d.school book showcasing how to apply design methodologies to real-world civic challenges, community organizing, and public service equity.',
      objectives: [
        'Co-create with communities, not just for them',
        'Identify power dynamics in social service delivery',
        'Build systemic resilience through design-led activism'
      ],
      audience: 'Non-profit founders, city planners, public service leads, and social activists.'
    }
  }
];
