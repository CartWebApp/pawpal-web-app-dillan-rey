// Get the canvas element from your HTML
  const ctx = document.getElementById('myWeekChart').getContext('2d');

  // Create the new chart
  const myChart = new Chart(ctx, {
    type: 'bar', // This makes it a bar graph
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [{
        label: 'Miles Walked',
        
        // ---- THIS IS YOUR DATA ----
        data: [2.5, 3.1, 1.8, 4.0, 2.2, 5.0, 1.0], 
        
        backgroundColor: 'rgba(244, 147, 62, 0.6)', // Bar color
        borderColor: '#F4933E',     // Border color
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Distance (in miles)'
          }
        }
      }
    }
  });