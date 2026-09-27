import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function PhysicsTextHover({ text, className = "" }) {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [isFallen, setIsFallen] = useState(false);
  const [positions, setPositions] = useState([]);
  const engineRef = useRef(null);
  const charRefs = useRef([]);

  const characters = text.split('');

  useEffect(() => {
    // Only initialize physics when hovered/fallen
    if (!isFallen || !containerRef.current || !textContainerRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });
    
    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Get initial positions of each character
    const charBodies = characters.map((char, i) => {
      const el = charRefs.current[i];
      if (!el) return null;
      
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate position relative to container
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      // Apply a slight random force on creation so they scatter immediately
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.02,
        density: 0.001
      });
      
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.05,
        y: -Math.random() * 0.05 - 0.02
      });
      
      return body;
    }).filter(Boolean);

    Composite.add(engine.world, charBodies);

    // Add mouse control so you can throw them around
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    // Animation Loop
    let animationFrameId;
    const updateDOM = () => {
      setPositions(charBodies.map(body => ({
        x: body.position.x,
        y: body.position.y,
        angle: body.angle
      })));
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    updateDOM();

    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [isFallen, characters]);

  return (
    <div 
      className={`inline-block relative cursor-crosshair ${className}`}
      onMouseEnter={() => setIsFallen(true)}
    >
      <div 
        ref={textContainerRef}
        className="flex flex-wrap"
        style={{ opacity: isFallen ? 0 : 1 }}
      >
        {characters.map((char, i) => (
          <span 
            key={`orig-${i}`} 
            ref={el => charRefs.current[i] = el}
            className="inline-block whitespace-pre"
          >
            {char}
          </span>
        ))}
      </div>

      {isFallen && (
        <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none">
          {positions.length > 0 && characters.map((char, i) => {
            const pos = positions[i];
            if (!pos) return null;
            
            return (
              <span
                key={`phys-${i}`}
                className="absolute inline-block whitespace-pre text-white pointer-events-auto"
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${pos.angle}rad)`,
                  fontSize: getComputedStyle(charRefs.current[i]).fontSize,
                  fontFamily: getComputedStyle(charRefs.current[i]).fontFamily,
                  fontWeight: getComputedStyle(charRefs.current[i]).fontWeight,
                  color: getComputedStyle(charRefs.current[i]).color,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
