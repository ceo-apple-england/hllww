import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeCastleHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
        return;
      }
    } catch {
      setHasWebGLError(true);
      return;
    }

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);
    scene.fog = new THREE.FogExp2(0x050507, 0.032);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 150);
    camera.position.set(0, 2.5, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for entire realm (for mouse parallax)
    const realmGroup = new THREE.Group();
    scene.add(realmGroup);

    // 1. BLOOD MOON
    const moonGeo = new THREE.SphereGeometry(6, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xff1838,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(2.5, 9, -24);
    realmGroup.add(moon);

    // Moon Glow Halo (disk)
    const haloGeo = new THREE.RingGeometry(6.1, 10.5, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xa30d25,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(moon.position);
    halo.position.z += 0.1;
    realmGroup.add(halo);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x231d2b, 0.85);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xff2244, 1.2);
    moonLight.position.set(2.5, 12, -20);
    scene.add(moonLight);

    // 3. GROUND / TERRAIN (dark misty hills)
    const groundGeo = new THREE.PlaneGeometry(80, 80, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07070a,
      roughness: 0.95,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    realmGroup.add(ground);

    // 4. GOTHIC CASTLE ARCHITECTURE (Procedural silhouette structures)
    const castleMat = new THREE.MeshStandardMaterial({
      color: 0x09080d,
      roughness: 0.9,
    });

    const windowMat = new THREE.MeshBasicMaterial({
      color: 0xff1838,
      transparent: true,
      opacity: 0.8,
    });

    // Central Citadel Nave
    const mainKeep = new THREE.Mesh(new THREE.BoxGeometry(6, 9, 7), castleMat);
    mainKeep.position.set(0, 2.5, -4);
    realmGroup.add(mainKeep);

    // High Central Spire
    const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 9, 6), castleMat);
    mainRoof.position.set(0, 11, -4);
    realmGroup.add(mainRoof);

    // Spire cross/finial
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.5), castleMat);
    finial.position.set(0, 16, -4);
    realmGroup.add(finial);

    // Left Flanking Tower
    const towerL = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 11, 8), castleMat);
    towerL.position.set(-5, 3.5, -3);
    const roofL = new THREE.Mesh(new THREE.ConeGeometry(2.1, 6, 8), castleMat);
    roofL.position.set(-5, 12, -3);
    realmGroup.add(towerL, roofL);

    // Right Flanking Tower
    const towerR = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 11, 8), castleMat);
    towerR.position.set(5, 3.5, -3);
    const roofR = new THREE.Mesh(new THREE.ConeGeometry(2.1, 6, 8), castleMat);
    roofR.position.set(5, 12, -3);
    realmGroup.add(towerR, roofR);

    // Outer Gate Walls & Battlements
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(7, 4.5, 2), castleMat);
    wallL.position.set(-7.5, 0.25, -2);
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(7, 4.5, 2), castleMat);
    wallR.position.set(7.5, 0.25, -2);
    realmGroup.add(wallL, wallR);

    // Gothic Lancet Windows (with flickering crimson light)
    const windows: THREE.Mesh[] = [];
    const windowPositions = [
      [0, 3.5, -0.4],
      [0, 6, -0.4],
      [-5, 5, -1.3],
      [5, 5, -1.3],
      [-1.8, 2, -0.4],
      [1.8, 2, -0.4],
    ];

    windowPositions.forEach(([wx, wy, wz]) => {
      const win = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 1.2, 4, 8), windowMat);
      win.position.set(wx, wy, wz);
      realmGroup.add(win);
      windows.push(win);
    });

    // 5. DEAD GNARLED TREES (Silhouettes)
    const treeMat = new THREE.MeshBasicMaterial({ color: 0x060609 });
    const createTree = (tx: number, tz: number, scale = 1) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.35 * scale, 4 * scale, 5), treeMat);
      trunk.position.set(tx, -2 + (2 * scale), tz);
      trunk.rotation.z = (Math.random() - 0.5) * 0.2;
      realmGroup.add(trunk);

      // Branches
      for (let b = 0; b < 3; b++) {
        const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * scale, 0.15 * scale, 2.2 * scale, 4), treeMat);
        branch.position.set(tx + (b % 2 === 0 ? 0.6 : -0.6) * scale, trunk.position.y + 0.8 * scale * b, tz);
        branch.rotation.z = (b % 2 === 0 ? 0.65 : -0.65) + (Math.random() - 0.5) * 0.3;
        realmGroup.add(branch);
      }
    };

    createTree(-9, 5, 1.4);
    createTree(-12, 1, 1.7);
    createTree(10, 4, 1.3);
    createTree(13, 2, 1.6);
    createTree(-4.5, 9, 0.9);
    createTree(6.5, 8, 1.0);

    // 6. DISTANT SHROUDED SPECTER
    const specterGeo = new THREE.CapsuleGeometry(0.3, 1.4, 4, 8);
    const specterMat = new THREE.MeshBasicMaterial({
      color: 0xc7c4d5,
      transparent: true,
      opacity: 0.35,
    });
    const specter = new THREE.Mesh(specterGeo, specterMat);
    specter.position.set(1.5, -0.6, 3);
    realmGroup.add(specter);

    // 7. SUPERNATURAL SPECTRAL WISPS (floating orbiting lights)
    const wispLight1 = new THREE.PointLight(0xff1838, 1.5, 7);
    const wispLight2 = new THREE.PointLight(0x7a22b0, 1.8, 8);
    realmGroup.add(wispLight1, wispLight2);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 1.6;
      camera.position.y = 2.5 - targetY * 1.0;
      camera.lookAt(0, 3.5, 0);

      // Flickering window lights
      const flickerVal = Math.sin(elapsedTime * 4.2) * Math.cos(elapsedTime * 7.5);
      windowMat.opacity = 0.55 + Math.abs(flickerVal) * 0.45;

      // Floating Wisps
      wispLight1.position.x = Math.sin(elapsedTime * 0.8) * 6;
      wispLight1.position.y = 1 + Math.cos(elapsedTime * 1.3) * 1.5;
      wispLight1.position.z = 2 + Math.cos(elapsedTime * 0.8) * 4;

      wispLight2.position.x = Math.cos(elapsedTime * 0.6) * 7;
      wispLight2.position.y = 0.5 + Math.sin(elapsedTime * 1.1) * 1.2;
      wispLight2.position.z = 3 + Math.sin(elapsedTime * 0.6) * 5;

      // Shrouded Specter floating oscillation
      specter.position.y = -0.6 + Math.sin(elapsedTime * 1.2) * 0.2;
      specterMat.opacity = 0.2 + Math.abs(Math.sin(elapsedTime * 0.7)) * 0.25;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasWebGLError) {
    // Elegant gothic CSS/SVG fallback if WebGL is disabled
    return (
      <div className="absolute inset-0 z-0 bg-[#050507] overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 w-48 h-48 rounded-full bg-blood-crimson/80 shadow-[0_0_80px_#ff1838] opacity-70 blur-xs" />
        <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black via-[#0B0A10] to-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none"
    />
  );
};
