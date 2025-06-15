const dscc = require('@google/dscc');
const local = require('./localMessage.js');
const dataProcessor = require('./processData.js');
const component = require('./component.js');

// Process the data for the WordCloud
const processData = dataProcessor.processData;

// Render the WordCloud using Canvas
const render = component.render;

// WordCloud
const drawViz = (data) => {
  // Clear any existing elements
  const container = document.getElementById('container');
  if (container) {
    container.innerHTML = '';
  } else {
    const newContainer = document.createElement('div');
    newContainer.id = 'container';
    document.body.appendChild(newContainer);
  }

  // Process the data
  const processedData = processData(data);

  // Render the WordCloud with current expanded state
  render(data, processedData); // allow third arggument options object
};

// Handle click events on the canvas
const handleCanvasClick = (event) => {
  // implement if needed
};

// Helper function to debounce resize events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Resize handler with debounce to improve performance
const handleResize = debounce(() => {
  const container = document.getElementById('container');
  if (container) {
    container.innerHTML = '';
    // Re-render with the last data
    if (lastData) {
      drawViz(lastData);
    }
  }
}, 250);

// Store the last data
let lastData = null;

// Add resize listener
window.addEventListener('resize', handleResize);

// Style on first load
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = 'transparent';
  
  // Set initial viewport meta tag for better mobile responsiveness
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
  
  // Add click event listener to handle quadrant expansion
  document.body.addEventListener('click', handleCanvasClick);
});

const isLocal = typeof DSCC_IS_LOCAL !== 'undefined' && DSCC_IS_LOCAL;

// renders locally
if (isLocal) {
  console.log('Running in local development mode');
  lastData = local.message;
  drawViz(local.message);
} else {
  dscc.subscribeToData(data => {
    lastData = data;
    drawViz(data);
  }, {transform: dscc.objectTransform});
}
