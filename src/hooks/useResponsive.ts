import { useState, useEffect } from 'react';

interface BreakpointValues {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const breakpoints: BreakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;

  const isAbove = (breakpoint: keyof BreakpointValues) => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBelow = (breakpoint: keyof BreakpointValues) => {
    return windowSize.width < breakpoints[breakpoint];
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isAbove,
    isBelow,
    breakpoints,
  };
}