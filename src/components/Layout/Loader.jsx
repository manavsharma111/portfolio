import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const onComplete = () => setIsVisible(false);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    // 700ms wait karenge animation complete hone ke liye, fir component remove karenge
    setTimeout(() => {
      onComplete();
    }, 700); 
  };

  useEffect(() => {
    // Hide scrollbar while loader is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Use another effect to restore overflow when isVisible becomes false
  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = '';
    }
  }, [isVisible]);

  // Keyboard shortcut to close the loader (Enter key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && progress === 100) {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [progress, isExiting]);

  if (!isVisible) return null;

  return (
    <>
      {/* Importing the monospace font directly in the component for the exact look */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');`}
      </style>
      
      <div 
        className={`fixed inset-0 z-[10000] flex flex-col justify-between h-full w-full bg-[#0b0b0b] text-[#4a4a4a] p-8 box-border select-none transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        {/* Top corners text */}
        <div className="flex justify-between text-xs tracking-[0.2em] uppercase">
          <span>SYS.INIT</span>
          <span>v2.0</span>
        </div>

        {/* Center counter and brackets */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="relative py-8 px-12 flex flex-col items-center">
            {/* Custom corner borders using Tailwind */}
            <div className="absolute top-0 left-0 w-[15px] h-[15px] border-t border-l border-[#4a4a4a]"></div>
            <div className="absolute top-0 right-0 w-[15px] h-[15px] border-t border-r border-[#4a4a4a]"></div>
            <div className="absolute bottom-0 left-0 w-[15px] h-[15px] border-b border-l border-[#4a4a4a]"></div>
            <div className="absolute bottom-0 right-0 w-[15px] h-[15px] border-b border-r border-[#4a4a4a]"></div>
            
            <h1 className="text-[9rem] text-[#f1f1f1] m-0 leading-none font-normal">
              {progress}
            </h1>
            <div className="w-4/5 h-[1px] bg-[#f1f1f1] mt-6"></div>
          </div>

          {/* Enter to continue prompt */}
          <div className="mt-12 text-[0.85rem] tracking-[0.15em] h-6">
            {progress === 100 ? (
              <span 
                className={`animate-pulse cursor-pointer hover:text-[#f1f1f1] transition-colors ${isExiting ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleExit} 
                role="button" 
                tabIndex={0}
              >
                ENTER TO CONTINUE
              </span>
            ) : null}
          </div>
        </div>

        {/* Bottom corners text */}
        <div className="flex justify-between text-xs tracking-[0.2em] uppercase">
          <span>LOADING...</span>
          <span>PLEASE WAIT</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
