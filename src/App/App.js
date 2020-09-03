import React, { Fragment, useState, useEffect } from 'react';
import GoogleSearch from './pageTypes/GoogleSearch/Search';
import GoogleSearchResults from './pageTypes/GoogleSearch/Results';
import GoogleFlightsSearch from './pageTypes/GoogleFlights/Search';
import GoogleFlightsSelection from './pageTypes/GoogleFlights/Selection';
import GoogleFlightsBooking from './pageTypes/GoogleFlights/Booking';
import GoogleFlightsCheckout from './pageTypes/GoogleFlights/Checkout';
// import './App.css';

function App() {
  const adapter = window.__CHROME_WEB_BROWSER_ADAPTER__;

  const [ contextUrl, setContextUrl ] = useState();
  const [ pageType, setPageType ] = useState();
  const [ DOMFlightDestination, setDOMFlightDestination ] = useState();
  const [ DOMFlightOrigin, setDOMFlightOrigin ] = useState();
  const [ DOMBookingProvider, setDOMBookingProvider ] = useState();
  const [ DOMSearchInputTerm, setDOMSearchInputTerm ] = useState();
  const [ DOMSearchResults, setDOMSearchResults ] = useState();
  const [ DOMSelectedFlights, setDOMSelectedFlights ] = useState();

  // NOTE: `useEffect` hooks are invoked by the react framework - serves to add state in functional components (instead of class components).

  // Effect to set the active `contextUrl` and `pageType`.
  useEffect(() => {
    let effectAborted = false;
  
    if (!effectAborted && adapter) {
      const { activeBrowserTabUrl, pageType } = adapter;
      const url = new URL(activeBrowserTabUrl);

      setContextUrl(url);
      setPageType(pageType);
    };
  
    return (() => {
      effectAborted = true;
    });
  }, [adapter]);

  // Effect to set the active context page DOM data, based on `pageType`.
  useEffect(() => {
    let effectAborted = false;

    if(!effectAborted) {
      if(pageType === 'GOOGLE_SEARCH') {
        const { DOMSearchInputTerm } = adapter;

        setDOMSearchInputTerm(DOMSearchInputTerm);
      } else if(pageType === 'GOOGLE_SEARCH_RESULTS') {
        const { DOMSearchInputTerm, DOMSearchResults } = adapter;

        setDOMSearchInputTerm(DOMSearchInputTerm);
        setDOMSearchResults(DOMSearchResults);
      } else if (pageType === 'GOOGLE_FLIGHTS_SEARCH' || pageType === 'GOOGLE_FLIGHTS_SELECTION') {
        const { DOMFlightDestination, DOMFlightOrigin, DOMSearchResults } = adapter;

        setDOMFlightDestination(DOMFlightDestination);
        setDOMFlightOrigin(DOMFlightOrigin);
        setDOMSearchResults(DOMSearchResults);
      } else if (pageType === 'GOOGLE_FLIGHTS_BOOKING') {
        const { DOMFlightDestination, DOMFlightOrigin, DOMSearchResults, DOMSelectedFlights } = adapter;
        
        setDOMFlightDestination(DOMFlightDestination);
        setDOMFlightOrigin(DOMFlightOrigin);
        setDOMSearchResults(DOMSearchResults);
        setDOMSelectedFlights(DOMSelectedFlights);
      } else if (pageType === 'GOOGLE_FLIGHTS_CHECKOUT') {
        const { DOMFlightDestination, DOMFlightOrigin, DOMSearchResults, DOMBookingProvider } = adapter;
        
        setDOMFlightDestination(DOMFlightDestination);
        setDOMFlightOrigin(DOMFlightOrigin);
        setDOMSearchResults(DOMSearchResults);
        setDOMBookingProvider(DOMBookingProvider);
      };
    };
  
    return (() => {
      effectAborted = true;
    });
  }, [adapter, pageType, DOMSearchResults, DOMSelectedFlights]);

  // Render app markup, based on the active context `pageType`.
  if(pageType === 'GOOGLE_SEARCH') {
    return (
      <GoogleSearch
        inputTerm={DOMSearchInputTerm}
      /> 
    );
  } else if(pageType === 'GOOGLE_SEARCH_RESULTS') {
    return (
      <GoogleSearchResults
        inputTerm={DOMSearchInputTerm}
        results={DOMSearchResults}
      /> 
    )
  } else if(pageType === 'GOOGLE_FLIGHTS_SEARCH') {
    return (
      <GoogleFlightsSearch
        origin={DOMFlightOrigin}
        destination={DOMFlightDestination}
        results={DOMSearchResults}
      />
    );
  } else if(pageType === 'GOOGLE_FLIGHTS_SELECTION') {
    return(
      <GoogleFlightsSelection
        origin={DOMFlightOrigin}
        destination={DOMFlightDestination}
        results={DOMSearchResults}
      />
    )
  } else if(pageType === "GOOGLE_FLIGHTS_BOOKING") {
    return (
      <GoogleFlightsBooking
        origin={DOMFlightOrigin}
        destination={DOMFlightDestination}
        results={DOMSearchResults}
        selectedFlights={DOMSelectedFlights}
      />
    );
  } else if(pageType === "GOOGLE_FLIGHTS_CHECKOUT") {
    return (
      <GoogleFlightsCheckout
        origin={DOMFlightOrigin}
        destination={DOMFlightDestination}
        results={DOMSearchResults}
        bookingProvider={DOMBookingProvider}
      />
    );
  } else {
    return (
      <Fragment>
        <p>WELCOME TO THE GOOGLE BROWSING UTILITY - PLEASE OPEN A NEW ADAPTER WINDOW TO SEE MORE.</p>
      </Fragment>
    )
  };
};

export default App;
