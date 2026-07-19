import React from 'react';

export function LyriqaTitle() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated SVG logo */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <svg
          className="relative h-16 w-16 text-primary transition-transform duration-500 group-hover:scale-105"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer dashed ring */}
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4" />
          
          {/* Flowing Wave lines representing verses */}
          <path
            d="M15 65C30 55 35 70 50 60C65 50 70 65 85 55"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M20 50C35 40 45 55 60 45C75 35 80 50 95 40"
            stroke="url(#waveGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.2"
          />

          {/* Quill Pen / Nib body */}
          <path
            d="M38 62 L55 45 C58 42 62 42 65 45 L69 49 C72 52 72 56 69 59 L52 76 Z"
            fill="url(#quillGradient)"
            opacity="0.9"
          />
          {/* Metal Nib tip */}
          <path
            d="M52 76 L28 85 C26 86 24 84 25 82 L34 58 Z"
            fill="url(#quillGradient)"
          />
          
          {/* Nib split/slit line */}
          <line x1="26" y1="84" x2="48" y2="62" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Tiny breather hole in the nib */}
          <circle cx="48" cy="62" r="2" fill="hsl(var(--background))" />

          {/* Magical sparks/stars representing poetic ideas */}
          <path d="M68 25 L70 28 L72 25 L70 22 Z" fill="hsl(var(--accent))" className="animate-pulse" />
          <path d="M25 35 L26.5 37 L28 35 L26.5 33 Z" fill="hsl(var(--primary))" />
          <path d="M82 72 L83.5 74 L85 72 L83.5 70 Z" fill="hsl(var(--accent))" />

          {/* Gradients */}
          <defs>
            <linearGradient id="quillGradient" x1="25" y1="85" x2="70" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <linearGradient id="waveGradient" x1="15" y1="55" x2="95" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="0.5" stopColor="hsl(var(--accent))" />
              <stop offset="1" stopColor="hsl(var(--foreground))" opacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-foreground">
          Lyriqa
        </h1>
        <p className="text-muted-foreground text-xs md:text-sm max-w-sm mx-auto font-sans leading-relaxed">
          Where human emotion meets artificial intelligence to craft stunning, structured poetry.
        </p>
      </div>
    </div>
  );
}
