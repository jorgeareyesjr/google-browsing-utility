import React, { Fragment } from 'react';

function GoogleSearchResults(props) {
  const searchTerm = props.inputTerm ? `Search Term: ${props.inputTerm}` : "Please enter a valid search input term.";
  const searchResults = props.results ?
    <ul>
      <h1>Search Results</h1>
      {
        props.results.map((result, i) => {
          return (
            <li key={i*i}>{result.firstChildHref}</li>
          )
        })
      }
    </ul> : 'Attempting to load the search results...';

  return (
    <Fragment>
      <h1>Google's SEARCH_RESULTS_PAGE</h1>
      <p>{searchTerm}</p>
      { searchResults }
    </Fragment>
  );
};

export default GoogleSearchResults;