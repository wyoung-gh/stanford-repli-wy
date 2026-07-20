/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, Sparkles, Send, CheckCircle2, Award, RefreshCw } from 'lucide-react';
import { GridItemData } from '../types';

interface CardDetailProps {
  item: GridItemData | null;
  onClose: () => void;
}

export default function CardDetail({ item, onClose }: CardDetailProps) {
  const [warmupStep, setWarmupStep] = useState(0);
  const [timerCount, setTimerCount] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [creativeInput, setCreativeInput] = useState('');
  const [creativeLogs, setCreativeLogs] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  // Reset states when item changes
  useEffect(() => {
    setWarmupStep(0);
    setTimerCount(60);
    setIsTimerRunning(false);
    setCreativeInput('');
    setQuizAnswers({});
    setQuizResult(null);
    
    if (item?.id === 'creative-acts' || item?.id === 'design-project-guide' || item?.id === 'design-social-change') {
      const challenges = [
        "Find any object on your desk. Describe 5 unconventional ways a squirrel could use it to build a home.",
        "Take 30 seconds to design a public transit map for a city where citizens can only travel by jumping.",
        "Draw your current mood using only 3 concentric circles and 2 straight lines. Describe the emotion.",
        "Redesign the alarm clock for heavy sleepers. What is the absolute wildest sensory trigger it activates?"
      ];
      setCurrentChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
    }
  }, [item]);

  // Active Timer for Creative sprint
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount(prev => prev - 1);
      }, 1000);
    } else if (timerCount === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerCount]);

  if (!item) return null;

  // Custom interactive experiences depending on card
  const isFacilitationTool = item.type === 'Tool' || item.id === 'book-club';
  const isSprintBook = item.id === 'creative-acts' || item.id === 'design-project-guide' || item.id === 'design-social-change';
  const isStoryOrDegree = item.type === 'Story' || item.type === 'Degree Program';

  // Warmup steps for Secret Handshake, Field Guide, Book Club, etc.
  const warmupSteps = item.id === 'secret-handshake' ? [
    { title: "Step 1: The Eye Lock", desc: "Turn to your partner (or imagine one). Make friendly eye contact and take a synchronized deep breath." },
    { title: "Step 2: The Acoustic Beat", desc: "Clap your hands twice, then tap your elbows together. Make a dynamic 'whoosh' sound out loud." },
    { title: "Step 3: The Custom Gesture", desc: "Invent a 3-second hand gesture together—a combination of a high-five, a spin, or a finger-snap." },
    { title: "Step 4: Radical Launch!", desc: "Perform the full handshake in one continuous motion and celebrate with a loud 'Eureka!'" }
  ] : [
    { title: "Step 1: Frame the Lens", desc: "Identify one specific behavior or detail you usually take for granted in your immediate surroundings." },
    { title: "Step 2: Embrace Beginners Mind", desc: "Write down 3 'Why?' questions about this behavior as if you are visiting Earth for the first time." },
    { title: "Step 3: Capture Somatic Audio", desc: "Close your eyes for 30 seconds. Write down the 3 quietest sounds you can detect in this room." }
  ];

  const handleNextWarmup = () => {
    if (warmupStep < warmupSteps.length - 1) {
      setWarmupStep(prev => prev + 1);
    } else {
      setWarmupStep(0);
    }
  };

  const handleStartTimer = () => {
    setTimerCount(60);
    setIsTimerRunning(true);
  };

  const handleSaveCreativeIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (creativeInput.trim()) {
      setCreativeLogs(prev => [creativeInput.trim(), ...prev]);
      setCreativeInput('');
    }
  };

  // Archetype quiz questions
  const quizQuestions = [
    {
      q: "When launching a new challenge, your absolute first instinct is to...",
      options: [
        "Immediately grab cardboard, tape, and hot glue to build a prototype.",
        "Leave the room to interview, observe, and talk to people on the street.",
        "Call a massive group brainstorm to gather as many wild perspectives as possible."
      ]
    },
    {
      q: "A prototype fails spectacularly during user testing. You think...",
      options: [
        "Fantastic! That was the fastest way to learn what doesn't work.",
        "Fascinating. The user's frustration gives me deep insights into their true needs.",
        "Great! Let's get the group together to co-design a completely new pivot."
      ]
    }
  ];

  const handleAnswerQuiz = (qIndex: number, optIndex: number) => {
    const newAnswers = { ...quizAnswers, [qIndex]: optIndex };
    setQuizAnswers(newAnswers);

    if (Object.keys(newAnswers).length === quizQuestions.length) {
      // Calculate archetype
      const values = Object.values(newAnswers) as number[];
      const score = values.reduce((a, b) => a + b, 0);
      if (score === 0) {
        setQuizResult("The Spontaneous Builder: You think with your hands. You believe a prototype is worth a thousand meetings and learn through concrete testing.");
      } else if (score <= 2) {
        setQuizResult("The Empathy Explorer: You start and end with people. Your design superpower is active listening and synthesizing deep qualitative insights.");
      } else {
        setQuizResult("The Radical Orchestrator: You spark collective genius. Your superpower is facilitation, mapping systems, and uniting diverse teams.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="card-detail-overlay">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black cursor-pointer"
        id="detail-backdrop"
      />

      {/* Drawer */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-background border-l-4 border-on-background h-full shadow-2xl flex flex-col z-10 overflow-hidden"
        id="detail-drawer"
      >
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b-2 border-on-background bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-black">
              {item.type}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-on-background flex items-center justify-center hover:bg-on-background hover:text-white transition-all cursor-pointer"
            aria-label="Close panel"
            id="close-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Main card info */}
          <div className="space-y-4">
            <h1 className="font-sans text-3xl md:text-4xl font-extrabold text-on-background leading-tight">
              {item.title}
            </h1>
            
            {item.category && (
              <span className="inline-block font-serif italic text-sm text-primary bg-primary/5 px-3 py-1 border border-primary/20">
                Category: {item.category}
              </span>
            )}
          </div>

          {/* Image banner if any */}
          {item.image && (
            <div className="border-2 border-on-background overflow-hidden bg-surface-container-low max-h-[300px] flex justify-center items-center">
              <img 
                src={item.image} 
                alt={item.title} 
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Overview Section */}
          <div className="space-y-3 bg-surface-container/30 p-6 border border-on-background/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold">
              The Blueprint Overview
            </h3>
            <p className="font-serif text-lg leading-relaxed text-on-background">
              {item.details?.overview}
            </p>
          </div>

          {/* Objectives & Mindsets */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-on-background/10 pb-2">
              Core Design Mindsets You'll Practice
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {item.details?.objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-workshop-teal shrink-0 mt-0.5" />
                  <span className="font-sans text-base text-on-background leading-normal">
                    {obj}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="space-y-2 border-t border-on-background/10 pt-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold">
              Who is this for?
            </h4>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              {item.details?.audience}
            </p>
          </div>

          {/* INTERACTIVE COMPONENT: Live d.school facilitator simulator */}
          <div className="border-4 border-dashed border-on-background/30 p-6 bg-surface-bright space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-sans text-lg font-black text-on-background uppercase tracking-tight">
                Live Prototype Simulator
              </h3>
            </div>

            {/* Faciliation warmups (Secret Handshake, guides, etc.) */}
            {isFacilitationTool && (
              <div className="space-y-4">
                <p className="font-sans text-sm text-on-surface-variant">
                  Run through a live creative warmup sequence to break spatial tension and ready your brain.
                </p>
                <div className="bg-background border-2 border-on-background p-4 space-y-2">
                  <span className="font-mono text-[10px] uppercase text-primary font-bold">
                    {warmupSteps[warmupStep].title}
                  </span>
                  <p className="font-serif italic text-base text-on-background">
                    {warmupSteps[warmupStep].desc}
                  </p>
                </div>
                <button
                  onClick={handleNextWarmup}
                  className="w-full bg-on-background text-white hover:bg-primary font-mono text-xs py-3 px-4 uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2"
                  id="warmup-step-next-btn"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  {warmupStep === warmupSteps.length - 1 ? 'Start Over' : 'Next Step'}
                </button>
              </div>
            )}

            {/* Creative writing challenge sprints (Books, guides) */}
            {isSprintBook && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase bg-primary text-white px-2 py-0.5 rounded-sm">
                    1-Minute Idea Sprint
                  </span>
                  <p className="font-serif italic text-base text-on-background font-bold bg-white p-4 border border-on-background/10">
                    "{currentChallenge}"
                  </p>
                </div>

                {isTimerRunning ? (
                  <div className="flex items-center justify-between bg-primary/5 p-3 border border-primary/20">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span className="font-mono text-sm">Sprint ends in: {timerCount}s</span>
                    </div>
                    <span className="text-xs font-mono text-primary animate-pulse">KEEP TYPING!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleStartTimer}
                    className="w-full bg-primary text-white hover:bg-on-background py-3 font-mono text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2"
                    id="start-sprint-btn"
                  >
                    <Play className="w-4 h-4" /> Launch Sprint Timer
                  </button>
                )}

                <form onSubmit={handleSaveCreativeIdea} className="flex gap-2">
                  <input
                    type="text"
                    value={creativeInput}
                    onChange={(e) => setCreativeInput(e.target.value)}
                    placeholder="Type a wild idea and press Enter..."
                    className="flex-1 bg-white border border-on-background p-3 font-sans text-sm outline-none focus:ring-1 focus:ring-primary"
                    id="sprint-idea-input"
                  />
                  <button
                    type="submit"
                    className="bg-on-background text-white p-3 hover:bg-primary cursor-pointer transition-all"
                    aria-label="Submit idea"
                    id="submit-idea-btn"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {creativeLogs.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase text-on-surface-variant font-bold">Your Idea Backlog:</span>
                    <div className="max-h-24 overflow-y-auto space-y-1 pr-2 no-scrollbar">
                      {creativeLogs.map((log, i) => (
                        <div key={i} className="bg-white border-l-2 border-workshop-teal p-2 text-xs font-mono text-on-background">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Archetype questionnaire (Stories & Degrees) */}
            {isStoryOrDegree && (
              <div className="space-y-4">
                <p className="font-sans text-sm text-on-surface-variant">
                  Discover your design thinking archetype based on how you react to this program's real-world challenge.
                </p>

                {!quizResult ? (
                  <div className="space-y-4">
                    {quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-2">
                        <p className="font-sans text-sm font-bold text-on-background">{q.q}</p>
                        <div className="flex flex-col gap-1">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                              className={`text-left text-xs p-2.5 border transition-all cursor-pointer font-sans ${
                                quizAnswers[qIdx] === optIdx
                                  ? 'bg-workshop-teal text-on-background border-on-background font-bold'
                                  : 'bg-white hover:bg-on-background/5 border-on-background/10 text-on-surface-variant'
                              }`}
                              id={`quiz-q${qIdx}-opt${optIdx}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-workshop-teal/20 p-4 border-2 border-workshop-teal space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Award className="w-5 h-5 shrink-0" />
                      <span className="font-mono text-xs uppercase font-bold tracking-wider">Your Archetype Found</span>
                    </div>
                    <p className="font-serif italic text-base text-on-background leading-relaxed">
                      {quizResult}
                    </p>
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizResult(null);
                      }}
                      className="font-mono text-[10px] uppercase text-primary font-bold underline cursor-pointer hover:text-on-background transition-colors"
                      id="retake-quiz-btn"
                    >
                      Retake Archetype Assessment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
