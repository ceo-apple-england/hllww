import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Touch detection
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], .interactive, .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Silver Ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '44px' : '26px',
          height: isHovered ? '44px' : '26px',
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : 1})`,
          border: isHovered
            ? '1.5px solid rgba(255, 24, 56, 0.75)'
            : '1px solid rgba(199, 196, 213, 0.45)',
          boxShadow: isHovered
            ? '0 0 15px rgba(255, 24, 56, 0.4)'
            : '0 0 8px rgba(199, 196, 213, 0.15)',
        }}
      />
      {/* Center Crimson Dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-all duration-75 will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FF1838',
          boxShadow: '0 0 6px #FF1838',
        }}
      />
    </>
  );
};
