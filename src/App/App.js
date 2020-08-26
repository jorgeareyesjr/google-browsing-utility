import React, { Fragment, useState, useEffect } from 'react';
// import './App.css';

function App() {
  const adapter = window.__CHROME_WEB_BROWSER_ADAPTER__;

  const [ contextUrl, setContextUrl ] = useState();
  const [ pageType, setPageType ] = useState();
  const [ DOMFlightDestination, setDOMFlightDestination ] = useState();
  const [ DOMFlightOrigin, setDOMFlightOrigin ] = useState();
  const [ DOMSearchInputTerm, setDOMSearchInputTerm ] = useState();
  const [ DOMSearchResults, setDOMSearchResults ] = useState();
  const [ DOMSelectedFlights, setDOMSelectedFlights ] = useState();

  // NOTE: `useEffect` hook is invoked by the react framework - serves to add component state in functional components (instead of class components).

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

  // Effect to set the active context page DOM data.
  useEffect(() => {
    let effectAborted = false;

    if(!effectAborted ) {
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
        // const { DOMFlightDestination, DOMFlightOrigin, DOMSearchResults, DOMSelectedFlights } = adapter;
        
        // setDOMFlightDestination(DOMFlightDestination);
        // setDOMFlightOrigin(DOMFlightOrigin);
        // setDOMSearchResults(DOMSearchResults);
        // setDOMSelectedFlights(DOMSelectedFlights);
      };
    };
  
    return (() => {
      effectAborted = true;
    });
  }, [adapter, pageType, DOMSearchResults, DOMSelectedFlights]);

  // Render app markup, based on the active context `pageType`.
  if(pageType === 'GOOGLE_SEARCH') {
    return (
      <Fragment>
        <h1>Google's DEFAULT_SEARCH_ENGINE_PAGE</h1>
        <p>Search Term: {DOMSearchInputTerm}</p>
      </Fragment>
    );
  } else if(pageType === 'GOOGLE_SEARCH_RESULTS') {
    const searchResults = DOMSearchResults ?
    <ul>
      <h1>Search Results</h1>
      {
        DOMSearchResults.map((result, i) => {
          return (
            <li key={i*i}>{result.firstChildHref}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of search results...';

    return (
      <Fragment>
        <h1>Google's DEFAULT_SEARCH_ENGINE_RESULTS_PAGE</h1>
        <p>Search Term: {DOMSearchInputTerm}</p>
        { searchResults }
      </Fragment>
    );
  } else if(pageType === 'GOOGLE_FLIGHTS_SEARCH') {
    const popularDestinations = DOMSearchResults ?
    <ul>
      <h1>Popular Destinations</h1>
      {
        DOMSearchResults.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of popular travel destinations...';

    return (
      <Fragment>
        <h1>Google's FLIGHTS_SEARCH_ENGINE</h1>
        <p>Origin: {DOMFlightOrigin}</p>
        <p>Destination: {DOMFlightDestination}</p>
        { popularDestinations }
      </Fragment>
    );
  } else if(pageType === 'GOOGLE_FLIGHTS_SELECTION') {
    const availableFlights = DOMSearchResults ?
    <ul>
      <h1>Available Flights</h1>
        {
        DOMSearchResults.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of available flights...';

    return (
      <Fragment>
        <h1>Google's FLIGHTS_SELECTION_PAGE</h1>
        <p>Origin: {DOMFlightOrigin}</p>
        <p>Destination: {DOMFlightDestination}</p>
        { availableFlights }
      </Fragment>
    );
  } else if(pageType === "GOOGLE_FLIGHTS_BOOKING") {
    const bookingOptions = DOMSearchResults ?
    <ul>
      <h1>Available Booking Otions</h1>
        {
        DOMSearchResults.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of available booking options...';

    const selectedFlights = DOMSelectedFlights ?
    <ul>
      <h1>Selected Flights</h1>
        {
        DOMSelectedFlights.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of selected flights...';

    return (
      <Fragment>
        <h1>Google's FLIGHTS_BOOKING_PAGE</h1>
        <p>Origin: {DOMFlightOrigin}</p>
        <p>Destination: {DOMFlightDestination}</p>
        { selectedFlights }
        { bookingOptions }
      </Fragment>
    );
  } else if(pageType === "GOOGLE_FLIGHTS_CHECKOUT") {
    // TODO
    return (
      <Fragment>
        <h1>Google's FLIGHTS_CHECKOUT_PAGE</h1>
      </Fragment>
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
