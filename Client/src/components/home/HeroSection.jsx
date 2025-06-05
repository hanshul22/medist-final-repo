import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAsync from "../../hooks/useAsync";
import BannerServices from "../../services/BannerService";

const slides = [
  {
    id: 1,
    tag: "STAY SAFE",
    title: "Stop virus transmission",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1600",
    discount: "40% OFF",
  },
  {
    id: 2,
    tag: "BOOST HEALTH",
    title: "Enhance your wellness",
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1600",
    discount: "60% OFF",
  },
  {
    id: 3,
    tag: "SHINE BRIGHT",
    title: "Smile with confidence",
    image: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=1600",
    discount: "80% OFF",
  },
];

function HeroSection() {
  useEffect(() => {
    // Replace with your actual API URL
    BannerServices.getWebsiteBanner()
      .then((data) => {console.log(data)})
      .catch((err) => console.error('Error fetching services:', err));
  }, []);


  
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden bg-gradient-to-r from-secondary to-primary">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/80" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl">
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="inline-block text-red-500 font-semibold mb-4"
              >
                — {slides[currentSlide].tag}
              </motion.span>
              
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-5xl md:text-6xl font-bold text-white mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/services"
                  className="btn-primary"
                >
                  Book Now
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full">
                  <span className="font-bold">{slides[currentSlide].discount}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        onClick={() => paginate(1)}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;