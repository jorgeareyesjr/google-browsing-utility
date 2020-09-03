import React, { Fragment } from 'react';

function GoogleFlightsBooking(props) {
  const origin = props.origin ? `Origin Airport: ${props.origin}` : "Please enter a valid origin airport.";
  const destination = props.destination ? `Destination Airport: ${props.destination}` : "Please enter a valid destination airport.";
  const bookingProvider = props.bookingProvider ? `Booking Provider: ${props.bookingProvider}` : "Please enter a valid booking provider.";

  return (
    <Fragment>
      <h1>Google's FLIGHTS_CHECKOUT_PAGE</h1>
      <p>{origin}</p>
      <p>{destination}</p>
      <p>{bookingProvider}</p>
    </Fragment>
  );
};

export default GoogleFlightsBooking;