// Import d3 and d3-cloud
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

export const render = (rawData, processedData, options = {})  =>{
  console.log('Rendering Component with:', {
    rawData,
    processedData,
    options
  });
  const container = document.getElementById('container');
  const {style} = rawData;
  console.log('Style:', style);
  
  // Apply a clean modern style to the container
  container.style.fontFamily = "'Roboto', 'Segoe UI', Arial, sans-serif";
  container.style.backgroundColor = "transparent";
  container.style.overflow = "hidden";
  container.style.position = "relative";
  
  // Set dimensions with better responsiveness
  const margin = { top: 60, right: 40, bottom: 40, left: 40 };
  const width = Math.min(window.innerWidth - 40, 900) - margin.left - margin.right;
  const height = Math.min(window.innerHeight - 40, 650) - margin.top - margin.bottom;
  
  // Create wrapper div with gradient background
  const wrapper = document.createElement('div');
  wrapper.className = 'component-wrapper';
  wrapper.style.width = `${width + margin.left + margin.right}px`;
  wrapper.style.height = `${height + margin.top + margin.bottom}px`;
  // wrapper.style.background = 'linear-gradient(to bottom right, #fbf8f3, #f5f2ed)';
  wrapper.style.borderRadius = '8px';
  wrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
  container.appendChild(wrapper);

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width + margin.left + margin.right;
  canvas.height = height + margin.top + margin.bottom;
  canvas.style.display = 'block';
  wrapper.appendChild(canvas);
  
  // Get canvas context for drawing
  const ctx = canvas.getContext('2d');

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Extract style options
  const styleOpts = rawData.style || {};
  const minFont = styleOpts.minFontSize.value || styleOpts.minFontSize.defaultValue || 12;
  const maxFont = styleOpts.maxFontSize.value || styleOpts.maxFontSize.defaultValue || 48;
  const defaultColorObj = styleOpts.textColor.value || styleOpts.textColor.defaultValue || { color: '#1d1d1b' };
  const defaultColor = defaultColorObj.color;
  
  // Extract weight-based color options
  const enableWeightColors = styleOpts.enableWeightColors.value || styleOpts.enableWeightColors.defaultValue || false;

  // Create an array of color thresholds if weight coloring is enabled
  const colorThresholds = [];
  if (enableWeightColors) {
    // Low weight color and threshold
    const lowColorObj = styleOpts.lowWeightColor.value || styleOpts.lowWeightColor.defaultValue || { color: '#1d1d1b' };
    const lowThreshold = parseFloat(styleOpts.lowWeightThreshold.value || styleOpts.lowWeightThreshold.defaultValue || '0');
    colorThresholds.push({ threshold: lowThreshold, color: lowColorObj.color });
    
    // Medium weight color and threshold
    const midColorObj = styleOpts.midWeightColor.value || styleOpts.midWeightColor.defaultValue || { color: '#5a33ee' };
    const midThreshold = parseFloat(styleOpts.midWeightThreshold.value || styleOpts.midWeightThreshold.defaultValue || '10');
    colorThresholds.push({ threshold: midThreshold, color: midColorObj.color });
    
    // High weight color and threshold
    const highColorObj = styleOpts.highWeightColor.value || styleOpts.highWeightColor.defaultValue || { color: '#fd5304' };
    const highThreshold = parseFloat(styleOpts.highWeightThreshold.value || styleOpts.highWeightThreshold.defaultValue || '20');
    colorThresholds.push({ threshold: highThreshold, color: highColorObj.color });
    
    // Sort thresholds in ascending order
    colorThresholds.sort((a, b) => a.threshold - b.threshold);
  }
  
  // Function to determine color based on weight
  function getColorForWeight(weight) {
    if (!enableWeightColors || colorThresholds.length === 0) {
      return defaultColor;
    }
    
    // Find the highest threshold that the weight exceeds or equals
    let selectedColor = colorThresholds[0].color;
    for (let i = 0; i < colorThresholds.length; i++) {
      if (weight >= colorThresholds[i].threshold) {
        selectedColor = colorThresholds[i].color;
      } else {
        break;
      }
    }
    
    return selectedColor;
  }

  // Prepare data for word cloud
  const words = processedData || [];
  if (words.length === 0) return;
  
  // Format data for d3-cloud
  const weights = words.map(w => w.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  
  // Create word cloud data with the right format for d3-cloud
  const cloudWords = words.map(word => ({
    text: word.text,
    size: maxW === minW ? 
      (minFont + maxFont) / 2 : 
      minFont + (word.weight - minW) / (maxW - minW) * (maxFont - minFont),
    weight: word.weight,
    color: getColorForWeight(word.weight)
  }));

  // Create a d3-cloud layout
  const layout = d3Cloud()
    .size([canvas.width, canvas.height])
    .words(cloudWords)
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * 90) // Either 0 or 90 degrees
    .font('Roboto, Arial, sans-serif')
    .fontSize(d => d.size)
    .random(() => 0.5) // Consistent starting point
    .spiral('archimedean') // Use archimedean spiral for better layout
    .on('end', drawCanvas);

  // Start the layout algorithm
  layout.start();
  
  // Function to draw the word cloud on canvas once layout is calculated
  function drawCanvas(words) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw each word according to d3-cloud's calculated positions
    words.forEach(word => {
      ctx.save();
      ctx.translate(word.x + canvas.width / 2, word.y + canvas.height / 2);
      ctx.rotate(word.rotate * Math.PI / 180);
      ctx.font = `${word.size}px ${word.font}`;
      // Use word-specific color or default color
      ctx.fillStyle = word.color || defaultColor;
      ctx.fillText(word.text, 0, 0);
      ctx.restore();
    });
  }
};