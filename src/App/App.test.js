import React from 'react';
// import { render, unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Verify App renders', () => {
  const { container } = render(<App />);

  expect(container).toHaveTextContent("WELCOME TO THE GOOGLE BROWSING UTILITY - PLEASE OPEN A NEW ADAPTER WINDOW TO SEE MORE.");
});


// JEST TEST to check useEffect
test('Verify useEffect works', () => {
  const app = render(<App />);
  beforeEach(() => {
    // This will execute your useEffect() hook on your component
    // NOTE: You should use exactly React.useEffect() in your component,
    // but not useEffect() with React.useEffect import
  });
  // console.log(app.container)

  // rerender();

  // expect(result.current).toBe('string');


});
