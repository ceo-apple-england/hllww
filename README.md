# NOCTURNE — The Haunted Realm

> **"Enter the darkness. Face your fears."**

NOCTURNE is an interactive, cinematic Gothic Horror digital experience website crafted with React 19, TypeScript, Vite, Tailwind CSS, Three.js WebGL, and Web Audio API procedural horror synthesis.

---

## 🌒 Features Overview

1. **Cinematic Intro**
   - 700ms absolute blackout prologue with rising crimson blood moon SVG.
   - Text reveal (*"THE NIGHT IS CALLING YOU"*) with blur-to-focus and cold wind audio.
   - Cinematic entry transition and skip intro option.

2. **Haunted Hero**
   - Fullscreen 3D WebGL Gothic Citadel with Blood Moon, gnarled dead trees, roaming specter, and flickering stained glass windows.
   - Interactive pointer parallax shifting realm perspectives with smooth interpolation.
   - Staggered gothic typography with direct CTA transitions.

3. **The Forbidden Story**
   - Narrative of the century-abandoned Blackwood Manor.
   - Interactive ancestral oil portrait with spreading crimson frame cracks and awakened glowing eyes.
   - Audio whisper feedback and responsive storytelling.

4. **Enter the Mansion**
   - Three interactive gothic thresholds:
     - **Door 01 — The Haunted Corridor**: Quivering wood, creaking hinge audio, and endless hallway walkthrough.
     - **Door 02 — The Witch’s Chamber**: Arcane purple glow, hovering relics, and coven lore.
     - **Door 03 — The Forgotten Crypt**: Subterranean frost, shifting shadows, and chained sarcophagi.
   - In-depth inspection chamber dossiers with keyboard & touch support.

5. **Haunted Experiences**
   - 6 classified paranormal artifacts & locations:
     - *The Haunted House* (Labyrinthine architecture)
     - *The Cursed Mirror* (Doppelgänger manifestation)
     - *The Ghost Detector* (EVP static transceiver)
     - *The Forbidden Library* (Autonomic grimoires)
     - *Witch’s Ritual Altar* (Consecrated pentacle)
     - *Midnight Cemetery* (Unconsecrated graves)
   - Unique motion signatures, hazard ratings, and entity dossiers.

6. **Horror Mini Games (3 Fully Playable Games)**
   - **Game 01: DON'T LOOK BACK**
     - Dark corridor survival with flashlight fog-of-war.
     - Stalking specter, increasing danger meter, timer, keyboard (WASD / Arrows) & mobile touch D-Pad controls.
   - **Game 02: THE CURSED MIRROR**
     - Multi-round anomaly detection game across warped mercury glass.
     - Time penalties on false clicks, live scoring, and local high scores (`localStorage`).
   - **Game 03: THE LAST RITUAL**
     - Occult runic puzzle arranging the 5 ancient sigils in chronological harmony.
     - Hint system, limited trials, and glowing pentagram unlock reward.

7. **Paranormal Gallery**
   - Asymmetric dark art exhibition with film grain and volumetric vignettes.
   - Fullscreen Lightbox modal with arrow navigation, swipe support, keyboard controls (Esc / Left / Right), and curatorial logs.

8. **The Ritual — Awaken What Sleeps**
   - Concentric rotating occult circles with runic alchemy glyphs.
   - Channeling progress with resonant audio drone and whispering frequencies.
   - Revelation of cryptic forgotten prophecies (with fictional entertainment disclosure).

9. **Horror Sound Engine & Web Audio Synthesizer**
   - Centralized `HorrorAudioManager` with zero external dependency failures.
   - Synthesizes dark ambient sub-bass drone, brown noise cold wind filters, sparse minor bell chimes, realistic dual-kick heartbeats, wooden door creaks, ghost whooshes, and ritual resonances.
   - Master volume slider, SFX volume slider, mute toggle, and tab visibility (`visibilitychange`) awareness.

10. **Gothic Design System**
    - **Color Palette**: Background `#050507`, Gothic Purple `#4A176D`, Blood Red `#A30D25`, Crimson Glow `#FF1838`, Moonlight Silver `#C7C4D5`, Ghost White `#F2EDF5`.
    - **Typography**: Cinzel Decorative, Cormorant Garamond, Inter.
    - **Accessibility & Motion**: `prefers-reduced-motion` compliance, semantic markup, full keyboard navigation, and custom silver ring cursor disabled on touch devices.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Custom Gothic Design Tokens
- **3D & Graphics**: Three.js WebGL with custom geometry and shaders, 2D Canvas particles
- **Audio**: Web Audio API Procedural Synthesizer & Sound FX engine
- **Icons**: Lucide Icons (only functional symbols; zero emojis)

---

## 🚀 How to Run the Project

1. Navigate to the project directory:
   ```bash
   cd nocturne-haunted-realm
   ```

2. Start the local Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local URL (typically `http://localhost:5173`).

4. Build for production:
   ```bash
   npm run build
   ```
