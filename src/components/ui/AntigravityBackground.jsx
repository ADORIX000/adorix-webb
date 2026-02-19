import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Constants for "Charm" feel
        const PARTICLE_COUNT = 150;
        const MOUSE_RADIUS = 200;
        const FLOAT_SPEED = -0.3; // Gentle upward drift
        const REPELLENT_STRENGTH = 0.4;

        const mouse = { x: null, y: null };
        let particles = [];
        let width, height;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 1.5; // Slightly larger charms
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = FLOAT_SPEED + (Math.random() - 0.5) * 0.1;

                // Original subtle blue palette
                const colors = [
                    'rgba(14, 165, 233, 0.4)', // Sky-500
                    'rgba(56, 189, 248, 0.4)', // Sky-400
                    'rgba(125, 211, 252, 0.4)', // Sky-300
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Twinkle properties
                this.opacity = Math.random();
                this.twinkleSpeed = 0.01 + Math.random() * 0.02;
                this.maxOpacity = 0.3 + Math.random() * 0.5;
            }

            update() {
                // Subtle Mouse Interaction (Airy Repulsion)
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < MOUSE_RADIUS) {
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                        this.vx += (dx / distance) * force * REPELLENT_STRENGTH;
                        this.vy += (dy / distance) * force * REPELLENT_STRENGTH;
                    }
                }

                // Apply velocity and friction
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.95;
                this.vy = FLOAT_SPEED + (this.vy - FLOAT_SPEED) * 0.95;

                // Twinkle Logic
                this.opacity += this.twinkleSpeed;
                if (this.opacity > this.maxOpacity || this.opacity < 0) {
                    this.twinkleSpeed *= -1;
                }

                // Screen Wrap / Reset (Upward)
                if (this.y < -10) {
                    this.y = height + 10;
                    this.x = Math.random() * width;
                }
                if (this.x < -10) this.x = width + 10;
                if (this.x > width + 10) this.x = -10;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.opacity);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        setCanvasSize();
        initParticles();
        animate();

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            setCanvasSize();
            initParticles();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default AntigravityBackground;
