import React, { Fragment } from 'react';

function GoogleFlightsSearch(props) {
  const origin = props.origin ? `Origin Airport: ${props.origin}` : "Please enter a valid origin airport.";
  const destination = props.destination ? `Destination Airport: ${props.destination}` : "Please enter a valid destination airport.";

  const popularDestinations = props.results ?
  <ul>
    <h1>Popular Destinations</h1>
    {
      props.results.map((node, i) => {
        return (
          <li key={i*i}>{node.textContent}</li>
        )
      })
    }
  </ul> : 'Attempting to load the list of popular travel destinations...';

  return (
    <Fragment>
      <h1>Google's FLIGHTS_SEARCH_PAGE</h1>
      <p>{origin}</p>
      <p>{destination}</p>
      { popularDestinations }
    </Fragment>
  );
};

export default GoogleFlightsSearch;