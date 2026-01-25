import React, { useEffect, useRef } from 'react';

const MouseParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // CONFIGURATION
    const PARTICLE_COUNT = 150; // Number of dust specks
    const MOUSE_RADIUS = 120;   // How far away they react to mouse
    const REPEL_FORCE = 5;      // How fast they run away

    // Setup Canvas
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse State
    const mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    // Reset mouse when leaving window so particles drift back
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        // Random initial position
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Remember original position to return to
        this.baseX = this.x;
        this.baseY = this.y;
        // Random size and speed
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        // Random colors from your palette
        const colors = ['#0D8A9E', '#23717B', '#12B2C1', '#1F2B2D'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Physics Calculations
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        // Calculate Repel Force (Stronger when closer)
        let maxDistance = MOUSE_RADIUS;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < MOUSE_RADIUS && mouse.x !== null) {
          // Move away from mouse
          this.x -= directionX * REPEL_FORCE;
          this.y -= directionY * REPEL_FORCE;
        } else {
          // Return to original position (drift back)
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20; // Ease back factor
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
        this.draw();
      }
    }

    // Initialize Particles
    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };
    init();

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      // Clean up other listeners if strictly necessary, 
      // but simpler to just let component unmount handle it.
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />;
};

export default MouseParticles;