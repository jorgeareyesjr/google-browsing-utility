import React, { Fragment } from 'react';

function GoogleSearch(props) {
  const searchTerm = props.inputTerm ? `Search Term: ${props.inputTerm}` : "Please enter a valid search input term.";
  return (
    <Fragment>
      <h1>Google's SEARCH_PAGE</h1>
      <p>{searchTerm}</p>
    </Fragment>
  );
};

export default GoogleSearch;