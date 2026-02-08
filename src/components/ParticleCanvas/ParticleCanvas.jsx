import { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 35;
const CONNECTION_DIST = 120;
const SPOTLIGHT_RADIUS = 150;

function getColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    particle: isDark ? '212, 176, 74' : '196, 154, 42',
    line: isDark ? '212, 176, 74' : '196, 154, 42',
    glow: isDark ? '212, 176, 74' : '196, 154, 42',
  };
}

function createParticles(width, height) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    baseRadius: 1.5 + Math.random() * 1.5,
    baseOpacity: 0.12 + Math.random() * 0.15,
  }));
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const colorsRef = useRef(getColors());
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(rect.width, rect.height);
      } else {
        particlesRef.current.forEach((p) => {
          p.x = Math.min(p.x, rect.width);
          p.y = Math.min(p.y, rect.height);
        });
      }
    }

    resize();
    window.addEventListener('resize', resize);

    // Theme change observer
    const observer = new MutationObserver(() => {
      colorsRef.current = getColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Mouse tracking
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    }
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    function draw() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const particles = particlesRef.current;
      const colors = colorsRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      // Update positions (skip if reduced motion)
      if (!reducedMotion.current) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        });
      }

      // Draw spotlight glow at cursor
      if (mouse.x !== null && mouse.y !== null) {
        const grad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, SPOTLIGHT_RADIUS
        );
        grad.addColorStop(0, `rgba(${colors.glow}, 0.07)`);
        grad.addColorStop(1, `rgba(${colors.glow}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(${colors.line}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        let radius = p.baseRadius;
        let opacity = p.baseOpacity;

        // Spotlight effect: enlarge & brighten near cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < SPOTLIGHT_RADIUS) {
            const factor = 1 - dist / SPOTLIGHT_RADIUS;
            radius += factor * 3;
            opacity = Math.min(0.7, opacity + factor * 0.45);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.particle}, ${opacity})`;
        ctx.fill();

        // Glow on bright particles
        if (opacity > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.particle}, ${(opacity - 0.3) * 0.3})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
