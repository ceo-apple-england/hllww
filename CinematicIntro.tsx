import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sliders } from 'lucide-react';
import { horrorAudio } from '../../services/audio/HorrorAudioManager';
import type { AudioSettings } from '../../types';

export const AudioWidget: React.FC = () => {
  const [settings, setSettings] = useState<AudioSettings>(horrorAudio.getSettings());
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const unsub = horrorAudio.subscribe(setSettings);
    return unsub;
  }, []);

  const handleToggleMute = () => {
    horrorAudio.toggleMute();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-bg-surface/80 border border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
        {/* Quick Mute/Unmute */}
        <button
          onClick={handleToggleMute}
          aria-label={settings.isMuted ? 'Unmute horror soundscape' : 'Mute horror soundscape'}
          title={settings.isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className={`p-1.5 rounded-full transition-colors duration-200 ${
            settings.isMuted
              ? 'text-muted hover:text-white'
              : 'text-blood-crimson hover:text-white'
          }`}
        >
          {settings.isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Adjust Slider toggle */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          aria-label="Audio controls panel"
          title="Audio Controls"
          className="p-1.5 text-muted hover:text-moonlight-silver transition-colors duration-200"
        >
          <Sliders size={15} />
        </button>
      </div>

      {/* Audio Panel Popover */}
      {isPanelOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-bg-secondary border border-moonlight-silver/20 rounded-xs shadow-xl shadow-black/80 p-4 z-50 text-xs backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="font-gothic-title text-ghost-white tracking-wider">Soundscape</span>
            <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${settings.isMuted ? 'bg-red-950/60 text-red-400' : 'bg-emerald-950/60 text-emerald-400'}`}>
              {settings.isMuted ? 'Muted' : 'Active'}
            </span>
          </div>

          {/* Ambient Volume */}
          <div className="mb-3">
            <div className="flex justify-between text-muted mb-1">
              <span>Dark Ambient</span>
              <span className="font-mono">{Math.round(settings.ambientVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.ambientVolume}
              onChange={(e) => horrorAudio.setAmbientVolume(parseFloat(e.target.value))}
              disabled={settings.isMuted}
              className="w-full accent-blood-crimson h-1 bg-white/10 rounded cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div className="mb-2">
            <div className="flex justify-between text-muted mb-1">
              <span>Spectral SFX</span>
              <span className="font-mono">{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => horrorAudio.setSfxVolume(parseFloat(e.target.value))}
              disabled={settings.isMuted}
              className="w-full accent-blood-crimson h-1 bg-white/10 rounded cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
