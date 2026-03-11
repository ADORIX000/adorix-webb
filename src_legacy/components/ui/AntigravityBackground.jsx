import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Constants for enhanced "Charm" feel
        const PARTICLE_COUNT = 150;
        const MOUSE_RADIUS = 200;
        const BASE_FLOAT_SPEED = -0.3; // Gentle upward drift
        const REPELLENT_STRENGTH = 0.5;

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
                
                // Varied sizes for depth
                this.size = Math.random() * 3.5 + 1; 
                
                this.vx = 0;
                // Randomize vertical speed slightly per particle
                this.vy = BASE_FLOAT_SPEED + (Math.random() - 0.5) * 0.2;

                // For organic horizontal sway
                this.angle = Math.random() * Math.PI * 2;
                this.swaySpeed = 0.01 + Math.random() * 0.02;
                this.swayAmplitude = 0.2 + Math.random() * 0.4;

                // Brand colors
                const colors = [
                    'rgba(13, 138, 158, 0.6)',   // primary
                    'rgba(18, 178, 193, 0.6)',   // accent
                    'rgba(35, 113, 123, 0.5)',   // secondary
                    'rgba(229, 249, 248, 0.4)',  // light hint
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Twinkle properties
                this.opacity = Math.random();
                this.twinkleSpeed = 0.005 + Math.random() * 0.015;
                this.maxOpacity = 0.4 + Math.random() * 0.6;
                this.minOpacity = 0.1 + Math.random() * 0.2;
            }

            update() {
                // Organic horizontal sway
                this.angle += this.swaySpeed;
                const sway = Math.sin(this.angle) * this.swayAmplitude;

                // Subtle Mouse Interaction (Airy Repulsion)
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < MOUSE_RADIUS) {
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                        // Exponential falloff for smoother push
                        const smoothForce = force * force; 
                        this.vx += (dx / distance) * smoothForce * REPELLENT_STRENGTH;
                        this.vy += (dy / distance) * smoothForce * REPELLENT_STRENGTH;
                    }
                }

                // Apply velocity, friction, and sway
                this.x += this.vx + sway;
                this.y += this.vy;
                
                // Friction for mouse interactions to settle down
                this.vx *= 0.92;
                this.vy = BASE_FLOAT_SPEED + (this.vy - BASE_FLOAT_SPEED) * 0.95;

                // Twinkle Logic
                this.opacity += this.twinkleSpeed;
                if (this.opacity > this.maxOpacity) {
                    this.opacity = this.maxOpacity;
                    this.twinkleSpeed *= -1;
                } else if (this.opacity < this.minOpacity) {
                    this.opacity = this.minOpacity;
                    this.twinkleSpeed *= -1;
                }

                // Screen Wrap / Reset (Upward)
                if (this.y < -20) {
                    this.y = height + 20;
                    this.x = Math.random() * width;
                    // Re-randomize size/speed slightly to keep it fresh
                    this.size = Math.random() * 3.5 + 1;
                    this.vy = BASE_FLOAT_SPEED + (Math.random() - 0.5) * 0.2;
                }
                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                
                // Add a subtle glow/blur effect
                ctx.shadowBlur = this.size * 2;
                ctx.shadowColor = this.color;
                
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
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-transparent"
        />
    );
};

export default AntigravityBackground;
