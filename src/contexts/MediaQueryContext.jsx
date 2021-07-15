import React, { createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

//create context with initial values - mobile first
const MediaQueryContext = createContext({
  isSmartPhone: true,
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false
});

const MediaQueryProvider = (props) => {
  const isSmartPhone = useMediaQuery({ maxWidth: 576 }); //default
  const isMobile = useMediaQuery({ minWidth: 576, maxWidth: 767 }); //incl landscape phone sm
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 }); //md
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1200 }); //lg
  const isLargeDesktop = useMediaQuery({ minWidth: 1200 }); //xl

  return (
    <>
      <MediaQueryContext.Provider value={{ isSmartPhone, isMobile, isTablet, isDesktop, isLargeDesktop }}>
        {props.children}
      </MediaQueryContext.Provider>
    </>
  );
};

export { MediaQueryContext as default, MediaQueryProvider };

