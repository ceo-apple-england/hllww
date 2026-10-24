import { useState } from 'react';
import { CustomCursor } from './components/effects/CustomCursor';
import { FogCanvas } from './components/effects/FogCanvas';
import { GothicNav } from './components/navigation/GothicNav';
import { CinematicIntro } from './sections/Intro/CinematicIntro';
import { HauntedHero } from './sections/Hero/HauntedHero';
import { ForbiddenStory } from './sections/Story/ForbiddenStory';
import { EnterTheMansion } from './sections/Mansion/EnterTheMansion';
import { HauntedExperiences } from './sections/Experiences/HauntedExperiences';
import { HorrorMiniGames } from './sections/Games/HorrorMiniGames';
import { ParanormalGallery } from './sections/Gallery/ParanormalGallery';
import { TheRitual } from './sections/Ritual/TheRitual';
import { GothicFooter } from './sections/Footer/GothicFooter';

export function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#050507] text-moonlight-silver selection:bg-blood-red selection:text-white">
      {/* Custom Gothic Ring & Center Dot Cursor */}
      <CustomCursor />

      {/* Volumetric 2D Canvas Dust Motes & Drifting Fog */}
      <FogCanvas />

      {/* Cinematic Fullscreen Intro with Blood Moon Sequence */}
      {isIntroActive && (
        <CinematicIntro onEnter={() => setIsIntroActive(false)} />
      )}

      {/* Fixed Gothic Navigation Bar with Audio Widget */}
      <GothicNav />

      {/* Main Single Page Experience Sections */}
      <main className="relative z-10">
        <HauntedHero />
        <ForbiddenStory />
        <EnterTheMansion />
        <HauntedExperiences />
        <HorrorMiniGames />
        <ParanormalGallery />
        <TheRitual />
      </main>

      {/* Mysterious Closing Footer */}
      <GothicFooter />
    </div>
  );
}

export default App;
