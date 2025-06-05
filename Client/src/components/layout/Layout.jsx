import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '../ui/ScrollToTop';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Header from "./Header"
import Footer from "./Footer"

gsap.registerPlugin(ScrollTrigger);

function Layout() {
  const containerRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    let locoScroll = null;

    const initLocomotiveScroll = async () => {
      try {
        // Dynamically import Locomotive Scroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        // Initialize Locomotive Scroll
        locoScroll = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
          smartphone: {
            smooth: true
          },
          tablet: {
            smooth: true
          }
        });

        // Store the instance
        locomotiveScrollRef.current = locoScroll;

        // Set up ScrollTrigger
        if (locoScroll) {
          // Use addEventListener instead of .on
          locoScroll.scroll.instance.scroll.on('scroll', () => {
            ScrollTrigger.update();
          });

          // Setup ScrollTrigger scroller proxy
          ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
              return arguments.length 
                ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
              };
            }
          });
        }

        // Initial GSAP animations
        const ctx = gsap.context(() => {
          // Fade in animation for all sections
          gsap.utils.toArray('section').forEach((section) => {
            gsap.fromTo(section,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: section,
                  scroller: containerRef.current,
                  start: 'top 80%',
                  end: 'top 20%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });

          // Stagger animation for cards
          gsap.utils.toArray('.card').forEach((card) => {
            gsap.fromTo(card,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: card,
                  scroller: containerRef.current,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        });

        // Handle window resize
        ScrollTrigger.addEventListener('refresh', () => {
          if (locoScroll) {
            locoScroll.update();
          }
        });
        ScrollTrigger.refresh();

        return ctx;
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    };

    // Initialize with a small delay
    const timeoutId = setTimeout(initLocomotiveScroll, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main 
        ref={containerRef} 
        className="flex-grow" 
        data-scroll-container
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;