import React, { useState, useCallback } from 'react';
import Slide1 from './components/Slide1';
import Slide2 from './components/Slide2';
import Slide3 from './components/Slide3';
import Slide4 from './components/Slide4';
import Slide5 from './components/Slide5';
import { ArrowRightIcon, ArrowLeftIcon } from './components/icons/MiscIcons';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides are now defined in an array for easier mapping
  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />];

  const handleNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const handlePrevious = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.1] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      
      <header className="absolute top-0 left-0 w-full p-6 sm:p-8 flex justify-between items-center z-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wider">
          潮光影<span className="text-slate-400 font-light"> · 智能体平台战略</span>
        </h1>
        <div className="text-slate-400 font-mono text-base sm:text-lg">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>
      
      <main className="w-full flex-grow relative flex items-center justify-center mt-12 mb-20 sm:mt-16 sm:mb-24">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              currentSlide === index
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            {slide}
          </div>
        ))}
      </main>

      {currentSlide > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute bottom-8 left-8 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full p-4 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-20"
          aria-label="上一张"
        >
          <div className="flex items-center space-x-2 px-2">
            <ArrowLeftIcon className="w-6 h-6" />
            <span className="text-lg">上一张</span>
          </div>
        </button>
      )}

      {!isLastSlide && (
        <button
          onClick={handleNext}
          className="absolute bottom-8 right-8 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full p-4 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-20"
          aria-label="下一张"
        >
          <div className="flex items-center space-x-2 px-2">
            <span className="text-lg">下一张</span>
            <ArrowRightIcon className="w-6 h-6" />
          </div>
        </button>
      )}
    </div>
  );
};

export default App;
