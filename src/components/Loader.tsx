import React from 'react';

const Loader = () => {
  return (
      <div className="loader"></div>
  );
};

export default Loader;

// CSS styles for the loader
const styles = `


.loader {
  border: 8px solid #1d1d1d; /* Light gray border */
  border-top: 8px solid #3498db; /* Blue border on top */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* Spin animation */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Create a style element and append CSS styles to it
const styleEl = document.createElement('style');
styleEl.appendChild(document.createTextNode(styles));
document.head.appendChild(styleEl);
