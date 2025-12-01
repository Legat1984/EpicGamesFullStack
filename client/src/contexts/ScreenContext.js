// ScreenContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

export const ScreenContext = createContext();

export const useScreen = () => {
    return useContext(ScreenContext);
};

export const ScreenProvider = ({ children }) => {
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  const [device, setDevice] = useState(Math.min(window.innerWidth, window.innerHeight) >= 768 ? 'pc' : 'mobile');
  const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isFullScreen, setIsFullScreen] = useState(() => 
    document.fullscreenElement || 
    document.mozFullScreenElement || 
    document.webkitFullscreenElement || 
    document.msFullscreenElement
  );
  const [wMin, setWmin] = useState(Math.min(window.innerWidth, window.innerHeight));
  const [wMax, setWmax] = useState(Math.max(window.innerWidth, window.innerHeight))

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
      setDevice(Math.min(window.innerWidth, window.innerHeight) >= 768 ? 'pc' : 'mobile');
      setResolution({ width: window.innerWidth, height: window.innerHeight });
      setWmin(Math.min(window.innerWidth, window.innerHeight));
      setWmax(Math.max(window.innerWidth, window.innerHeight));
    };

    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement || 
        document.mozFullScreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement
      );
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ orientation, device, resolution, isFullScreen, wMin, wMax }}>
      {children}
    </ScreenContext.Provider>
  );
};