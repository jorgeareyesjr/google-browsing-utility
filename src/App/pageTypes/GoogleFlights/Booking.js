import React, { Fragment } from 'react';

function GoogleFlightsBooking(props) {
  const origin = props.origin ? `Origin Airport: ${props.origin}` : "Please enter a valid origin airport.";
  const destination = props.destination ? `Destination Airport: ${props.destination}` : "Please enter a valid destination airport.";

  const bookingOptions = props.results ?
    <ul>
      <h1>Available Booking Options</h1>
        {
        props.results.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of available booking options...';

    const selectedFlights = props.selectedFlights ?
    <ul>
      <h1>Selected Flights</h1>
        {
        props.selectedFlights.map((result, i) => {
          return (
            <li key={i*i}>{result.textContent}</li>
          )
        })
      }
    </ul> : 'Attempting to load the list of selected flights...';

    return (
      <Fragment>
        <h1>Google's FLIGHTS_BOOKING_PAGE</h1>
        <p>{origin}</p>
        <p>{destination}</p>
        { selectedFlights }
        { bookingOptions }
      </Fragment>
    );
};

export default GoogleFlightsBooking;