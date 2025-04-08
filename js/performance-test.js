// Performance Testing Script for AJ Solutions Website

// This script will run various performance tests and log the results
console.log('Starting performance tests...');

// Performance metrics to track
const metrics = {
  loadTime: 0,
  firstPaint: 0,
  firstContentfulPaint: 0,
  domInteractive: 0,
  domComplete: 0,
  resourceCount: 0,
  resourceSize: 0,
  jsExecutionTime: 0,
  animationFPS: []
};

// Track page load time
const startTime = performance.now();
window.addEventListener('load', () => {
  metrics.loadTime = performance.now() - startTime;
  console.log(`Page load time: ${metrics.loadTime.toFixed(2)}ms`);
  
  // Get performance timing metrics
  const perfData = window.performance.timing;
  metrics.domInteractive = perfData.domInteractive - perfData.navigationStart;
  metrics.domComplete = perfData.domComplete - perfData.navigationStart;
  
  console.log(`DOM Interactive: ${metrics.domInteractive}ms`);
  console.log(`DOM Complete: ${metrics.domComplete}ms`);
  
  // Run additional tests after page load
  runResourceTests();
  testAnimationPerformance();
  testInteractionPerformance();
  testResponsiveness();
  
  // Final report
  setTimeout(generateReport, 5000);
});

// Test resource loading
function runResourceTests() {
  const resources = performance.getEntriesByType('resource');
  metrics.resourceCount = resources.length;
  
  let totalSize = 0;
  const resourceTypes = {
    js: { count: 0, size: 0 },
    css: { count: 0, size: 0 },
    img: { count: 0, size: 0 },
    font: { count: 0, size: 0 },
    other: { count: 0, size: 0 }
  };
  
  resources.forEach(resource => {
    const size = resource.transferSize || resource.decodedBodySize || 0;
    totalSize += size;
    
    // Categorize by resource type
    if (resource.name.endsWith('.js')) {
      resourceTypes.js.count++;
      resourceTypes.js.size += size;
    } else if (resource.name.endsWith('.css')) {
      resourceTypes.css.count++;
      resourceTypes.css.size += size;
    } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      resourceTypes.img.count++;
      resourceTypes.img.size += size;
    } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/)) {
      resourceTypes.font.count++;
      resourceTypes.font.size += size;
    } else {
      resourceTypes.other.count++;
      resourceTypes.other.size += size;
    }
  });
  
  metrics.resourceSize = totalSize;
  
  console.log(`Total resources: ${metrics.resourceCount}`);
  console.log(`Total size: ${(metrics.resourceSize / 1024 / 1024).toFixed(2)}MB`);
  console.log('Resource breakdown:', resourceTypes);
}

// Test animation performance
function testAnimationPerformance() {
  let lastTime = performance.now();
  let frames = 0;
  let totalFrameTime = 0;
  
  // Track FPS for 3 seconds
  const interval = setInterval(() => {
    const now = performance.now();
    const elapsed = now - lastTime;
    lastTime = now;
    
    frames++;
    totalFrameTime += elapsed;
    
    const fps = 1000 / (totalFrameTime / frames);
    metrics.animationFPS.push(fps);
    
  }, 16.7); // ~60fps sampling rate
  
  // Stop after 3 seconds
  setTimeout(() => {
    clearInterval(interval);
    
    const avgFPS = metrics.animationFPS.reduce((sum, fps) => sum + fps, 0) / metrics.animationFPS.length;
    console.log(`Average animation FPS: ${avgFPS.toFixed(2)}`);
    
    // Test cursor animation specifically
    testCursorAnimation();
  }, 3000);
}

// Test cursor animation performance
function testCursorAnimation() {
  // Simulate mouse movement
  const startTime = performance.now();
  let eventCount = 0;
  
  function simulateMouseMove() {
    if (eventCount > 100) {
      const elapsed = performance.now() - startTime;
      console.log(`Cursor animation: ${eventCount} events in ${elapsed.toFixed(2)}ms`);
      console.log(`Average time per event: ${(elapsed / eventCount).toFixed(2)}ms`);
      return;
    }
    
    // Create and dispatch mouse event
    const event = new MouseEvent('mousemove', {
      clientX: Math.random() * window.innerWidth,
      clientY: Math.random() * window.innerHeight,
      bubbles: true
    });
    
    document.dispatchEvent(event);
    eventCount++;
    
    // Schedule next event
    setTimeout(simulateMouseMove, 16.7);
  }
  
  simulateMouseMove();
}

// Test interaction performance
function testInteractionPerformance() {
  // Test service card hover performance
  const cards = document.querySelectorAll('.service-card');
  if (cards.length > 0) {
    const card = cards[0];
    
    // Measure hover effect performance
    const startTime = performance.now();
    
    // Trigger mouseenter
    const enterEvent = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true
    });
    card.dispatchEvent(enterEvent);
    
    // Wait a bit then trigger mouseleave
    setTimeout(() => {
      const leaveEvent = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true
      });
      card.dispatchEvent(leaveEvent);
      
      const elapsed = performance.now() - startTime;
      console.log(`Service card hover effect: ${elapsed.toFixed(2)}ms`);
    }, 300);
  }
}

// Test responsiveness
function testResponsiveness() {
  // Test layout at different viewport sizes
  const viewportSizes = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1366, height: 768, name: 'Laptop' },
    { width: 1920, height: 1080, name: 'Desktop' }
  ];
  
  console.log('Testing responsive layouts...');
  
  // We can't actually resize the viewport in this test script,
  // but we can log the breakpoints for manual testing
  viewportSizes.forEach(size => {
    console.log(`Test at ${size.name} size: ${size.width}x${size.height}px`);
  });
}

// Generate final performance report
function generateReport() {
  console.log('=== PERFORMANCE REPORT ===');
  console.log(`Page Load Time: ${metrics.loadTime.toFixed(2)}ms`);
  console.log(`DOM Interactive: ${metrics.domInteractive}ms`);
  console.log(`DOM Complete: ${metrics.domComplete}ms`);
  console.log(`Resource Count: ${metrics.resourceCount}`);
  console.log(`Resource Size: ${(metrics.resourceSize / 1024 / 1024).toFixed(2)}MB`);
  
  const avgFPS = metrics.animationFPS.reduce((sum, fps) => sum + fps, 0) / metrics.animationFPS.length;
  console.log(`Average Animation FPS: ${avgFPS.toFixed(2)}`);
  
  // Performance score (simplified)
  let performanceScore = 100;
  
  // Deduct points for slow load time
  if (metrics.loadTime > 3000) performanceScore -= 20;
  else if (metrics.loadTime > 2000) performanceScore -= 10;
  else if (metrics.loadTime > 1000) performanceScore -= 5;
  
  // Deduct points for low FPS
  if (avgFPS < 30) performanceScore -= 20;
  else if (avgFPS < 45) performanceScore -= 10;
  else if (avgFPS < 55) performanceScore -= 5;
  
  // Deduct points for large resource size
  const resourceSizeMB = metrics.resourceSize / 1024 / 1024;
  if (resourceSizeMB > 5) performanceScore -= 20;
  else if (resourceSizeMB > 3) performanceScore -= 10;
  else if (resourceSizeMB > 1) performanceScore -= 5;
  
  console.log(`Overall Performance Score: ${performanceScore}/100`);
  
  // Recommendations
  console.log('=== RECOMMENDATIONS ===');
  if (metrics.loadTime > 2000) {
    console.log('- Consider optimizing resource loading for faster page load');
  }
  
  if (avgFPS < 55) {
    console.log('- Consider simplifying animations for better performance');
  }
  
  if (resourceSizeMB > 3) {
    console.log('- Consider optimizing asset sizes to reduce total page weight');
  }
  
  console.log('=== END REPORT ===');
}

// Log browser and device info
console.log('=== ENVIRONMENT INFO ===');
console.log(`User Agent: ${navigator.userAgent}`);
console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);
console.log(`Platform: ${navigator.platform}`);
