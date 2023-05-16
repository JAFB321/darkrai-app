self.onmessage = function(event) {
    // Perform some heavy work...
    const result = event.data * 2;
  
    // Send the result back to the main thread.
    postMessage(result);
  };

  console.log(10);