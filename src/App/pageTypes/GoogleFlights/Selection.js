import React, { Fragment } from 'react';

function GoogleFlightsSelection(props) {
  const origin = props.origin ? `Origin Airport: ${props.origin}` : "Please enter a valid origin airport.";
  const destination = props.destination ? `Destination Airport: ${props.destination}` : "Please enter a valid destination airport.";

  const availableFlights = props.results ?
    <ul>
      <h1>Available Flights</h1>
        {
        props.results.map((node, i) => {
          return (
            <li key={i*i}>{node.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of available flights...';

    return (
      <Fragment>
        <h1>Google's FLIGHTS_SELECTION_PAGE</h1>
        <p>{origin}</p>
        <p>{destination}</p>
        { availableFlights }
      </Fragment>
    );
};

export default GoogleFlightsSelection;