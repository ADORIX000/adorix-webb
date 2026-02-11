import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationFrameId;

        // CONFIGURATION
        const PARTICLE_COUNT = 70; // Ultra-Minimalist
        const MOUSE_LAG = 0.003;   // Even slower inertia

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const mouse = { x: null, y: null };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.pow(Math.random(), 0.5) * Math.min(width, height) * 0.15;
                this.homeX = width / 2 + Math.cos(angle) * radius;
                this.homeY = height / 2 + Math.sin(angle) * radius;

                this.x = Math.random() * width;
                this.y = Math.random() * height;

                const swarmAngle = Math.random() * Math.PI * 2;
                const swarmRadius = 30 + Math.random() * 80;
                this.targetOffsetX = Math.cos(swarmAngle) * swarmRadius;
                this.targetOffsetY = Math.sin(swarmAngle) * swarmRadius;

                this.isOrb = Math.random() > 0.8;
                // Even smaller sizes for "advanced" minimalist feel
                this.size = this.isOrb ? Math.random() * 4 + 1.5 : Math.random() * 1.0 + 0.3;
                this.speedScale = (Math.random() * 0.4) + 0.3;

                this.color = ['#0EA5E9', '#FFFFFF', '#38BDF8'][Math.floor(Math.random() * 3)];

                this.vx = 0;
                this.vy = 0;

                // Breathing phase for opacity pulses
                this.breath = Math.random() * Math.PI * 2;
                this.breathSpeed = 0.005 + Math.random() * 0.01;
            }

            draw() {
                this.breath += this.breathSpeed;
                const breathFactor = (this.isOrb) ? (Math.sin(this.breath) * 0.15 + 0.25) : 0.45;

                ctx.fillStyle = this.color;

                if (this.isOrb) {
                    ctx.globalAlpha = breathFactor;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                } else {
                    ctx.globalAlpha = breathFactor;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;
            }

            update() {
                let targetX, targetY;

                if (mouse.x !== null) {
                    targetX = mouse.x + this.targetOffsetX;
                    targetY = mouse.y + this.targetOffsetY;
                } else {
                    targetX = this.homeX;
                    targetY = this.homeY;
                }

                const dx = targetX - this.x;
                const dy = targetY - this.y;

                const acc = 0.0003 * this.speedScale;
                this.vx += dx * acc;
                this.vy += dy * acc;

                this.vx *= 0.97; // Ultra-smooth
                this.vy *= 0.97;

                this.x += this.vx;
                this.y += this.vy;

                // Micro-parallax
                if (mouse.x !== null) {
                    this.x += (mouse.x - width / 2) * 0.00005;
                    this.y += (mouse.y - height / 2) * 0.00005;
                }

                this.draw();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-100"
        />
    );
};

export default AntigravityBackground;
