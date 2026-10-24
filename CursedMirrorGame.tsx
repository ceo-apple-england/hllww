@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg-primary: #050507;
  --color-bg-secondary: #0B0A10;
  --color-gothic-purple: #4A176D;
  --color-blood-red: #A30D25;
  --color-crimson-glow: #FF1838;
  --color-moonlight: #C7C4D5;
  --color-ghost-white: #F2EDF5;
  --color-muted: #8D8998;
}

html {
  background-color: var(--color-bg-primary);
  color: var(--color-moonlight);
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg-primary);
  overflow-x: hidden;
}

/* Custom Gothic Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #07070a;
}

::-webkit-scrollbar-thumb {
  background: #231d2b;
  border-radius: 4px;
  border: 1px solid rgba(163, 13, 37, 0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: #4a176d;
  box-shadow: 0 0 10px rgba(255, 24, 56, 0.5);
}

/* Typography Helpers */
.font-gothic-title {
  font-family: 'Cinzel Decorative', serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.font-story {
  font-family: 'Cormorant Garamond', serif;
}

/* Film Grain Overlay */
.film-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}

/* Vignette overlay */
.vignette-radial {
  background: radial-gradient(circle at center, transparent 35%, rgba(5, 5, 7, 0.75) 85%, #050507 100%);
}

.vignette-heavy {
  background: radial-gradient(circle at center, transparent 15%, rgba(5, 5, 7, 0.85) 75%, #050507 100%);
}

/* Gothic Border Glows */
.border-gothic {
  border: 1px solid rgba(199, 196, 213, 0.12);
  transition: all 0.35s ease;
}

.border-gothic:hover {
  border-color: rgba(255, 24, 56, 0.45);
  box-shadow: 0 0 20px rgba(163, 13, 37, 0.2);
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
