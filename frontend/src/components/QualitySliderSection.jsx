import { useState, useRef, useEffect } from 'react';
import productsBefore from '../assets/product-before.jpg';
import productsAfter from '../assets/product-after.png';
import peopleBefore from '../assets/people-before.jpg';
import peopleAfter from '../assets/people-after.png';
import animalsBefore from '../assets/animal-before.jpg';
import animalsAfter from '../assets/animal-after.png';
import carsBefore from '../assets/car-before.jpg';
import carsAfter from '../assets/car-after.png';
import graphicsBefore from '../assets/graphics-before.jpg';
import graphicsAfter from '../assets/graphics-after.png';

const categories = [
  { label: 'Products', value: 'products' },
  { label: 'People', value: 'people' },
  { label: 'Animals', value: 'animals' },
  { label: 'Cars', value: 'cars' },
  { label: 'Graphics', value: 'graphics' },
];

const samples = {
  products: {
    before: productsAfter,
    after: productsBefore,
  },
  people: {
    before: peopleAfter,
    after: peopleBefore,
  },
  animals: {
    before: animalsAfter,
    after: animalsBefore,
  },
  cars: {
    before: carsAfter,
    after: carsBefore,
  },
  graphics: {
    before: graphicsAfter,
    after: graphicsBefore,
  },
};

const QualitySliderSection = () => {
  const [selected, setSelected] = useState('products');
  const [sliderPos, setSliderPos] = useState(50); // percent
  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const handleDrag = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    let percent = ((x - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setSliderPos(percent);
  };

  const startDrag = () => { dragging.current = true; };
  const stopDrag = () => { dragging.current = false; };

  // Mouse/touch move event listeners
  const onMove = (e) => { if (dragging.current) handleDrag(e); };
  const onUp = () => { dragging.current = false; };

  // Attach/detach listeners
  useEffect(() => {
    const move = (e) => onMove(e);
    const up = () => onUp();
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, []);

  const { before, after } = samples[selected];

  return (
    <section className="mt-10 pt-10 pb-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-slate-900">Stunning quality</h2>
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 text-base focus:outline-none ${selected === cat.value ? 'bg-slate-100 text-slate-900 shadow' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <div
            ref={sliderRef}
            className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onMouseMove={dragging.current ? handleDrag : undefined}
            onTouchMove={dragging.current ? handleDrag : undefined}
            style={{ cursor: dragging.current ? 'ew-resize' : 'default' }}
          >
            {/* Before image - positioned absolutely to cover the container */}
            <img
              src={before}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            {/* After image, clipped container - controls the visible window width */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
            >
              {/* After image - positioned absolutely to align with the 'before' image */}
              <img
                src={after}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            {/* Slider handle - positioned based on sliderPos */}
            <div
              className="absolute top-1/2 z-10"
              style={{ left: `calc(${sliderPos}% - 24px)`, transform: 'translateY(-50%)' }}
            >
              <button
                className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 shadow flex items-center justify-center focus:outline-none cursor-ew-resize"
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                aria-label="Drag to compare"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="#" className="text-blue-600 font-medium hover:underline">See more samples &rarr;</a>
        </div>
      </div>
    </section>
  );
};

export default QualitySliderSection; 