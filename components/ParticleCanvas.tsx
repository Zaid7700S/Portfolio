"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  w: number;
  h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.4 + 0.4;
    this.baseSize = this.size;
  }
  update(mouse: { x: number; y: number }) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160 && dist > 0) {
      const force = (160 - dist) / 160;
      this.x -= dx * 0.025 * force;
      this.y -= dy * 0.025 * force;
      this.size = this.baseSize + force * 1.5;
    } else {
      this.size = this.baseSize;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(200, 255, 0, 0.55)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const particleMouse = { x: -1000, y: -1000 };
    let particles: Particle[] = [];
    let animationId = 0;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }
    resize();

    function initParticles() {
      particles = [];
      const count = Math.min(90, Math.floor((w * h) / 16000));
      for (let i = 0; i < count; i++) particles.push(new Particle(w, h));
    }
    initParticles();

    function onMouseMove(e: MouseEvent) {
      particleMouse.x = e.clientX;
      particleMouse.y = e.clientY;
    }
    function onMouseLeave() {
      particleMouse.x = -1000;
      particleMouse.y = -1000;
    }
    function onResize() {
      resize();
      initParticles();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    function connect() {
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = 0.14 * (1 - dist / maxDist);
            ctx!.strokeStyle = `rgba(200, 255, 0, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
        const dx = particles[i].x - particleMouse.x;
        const dy = particles[i].y - particleMouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const opacity = 0.25 * (1 - dist / 180);
          ctx!.strokeStyle = `rgba(255, 94, 58, ${opacity})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particleMouse.x, particleMouse.y);
          ctx!.stroke();
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update(particleMouse);
        p.draw(ctx!);
      });
      connect();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
