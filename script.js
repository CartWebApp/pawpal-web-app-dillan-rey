/* Forgot Password Overlay Script with Fade, Success Message, Input Reset, and Password Match Check */

const dialog = document.getElementById('reset-ps');
const openBtn = document.querySelector('.forgot-link');
const cancelBtn = document.getElementById('cancel-btn');
const resetBtn = document.getElementById('reset-btn');

// Open dialog with fade-in and lock scroll
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.showModal();
  dialog.classList.add('showing');
  document.body.style.overflow = 'hidden';
  removeMessages(); // Clear old messages when reopening
});

// Cancel button: clear and close
cancelBtn.addEventListener('click', () => {
  clearInputs();
  removeMessages();
  fadeOutDialog();
});

// Reset button: check password match
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newPass = document.getElementById('new-ps').value.trim();
  const rePass = document.getElementById('re-enter-new-ps').value.trim();

  removeMessages();

  if (newPass === "" || rePass === "") {
    showErrorMessage("⚠️ Please fill out both password fields.");
    return;
  }

  if (newPass !== rePass) {
    showErrorMessage("❌ Passwords do not match.");
    return;
  }

  showSuccessMessage();
  clearInputs();
});

// Allow Esc to close normally
dialog.addEventListener('cancel', () => {
  clearInputs();
  removeMessages();
  document.body.style.overflow = '';
});

// Unlock scroll when dialog closes
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
});

// Fade-out helper
function fadeOutDialog() {
  dialog.classList.remove('showing');
  dialog.classList.add('hiding');
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove('hiding');
  }, 200);
}

// Clear all input fields inside the overlay
function clearInputs() {
  const inputs = dialog.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
}

// Remove old messages before showing a new one
function removeMessages() {
  const oldMsg = dialog.querySelector('.success-msg, .error-msg');
  if (oldMsg) oldMsg.remove();
}

// Success message
function showSuccessMessage() {
  const msg = document.createElement('p');
  msg.className = 'success-msg';
  msg.textContent = '✅ Password reset successfully!';
  msg.style.textAlign = 'center';
  msg.style.marginTop = '10px';
  msg.style.fontWeight = '600';
  msg.style.color = '#2ecc71';
  dialog.querySelector('form').appendChild(msg);

  msg.style.opacity = '1';
  setTimeout(() => {
    msg.style.transition = 'opacity 0.5s ease';
    msg.style.opacity = '0';
    fadeOutDialog();
  }, 1200);
}

// Error message
function showErrorMessage(text) {
  const msg = document.createElement('p');
  msg.className = 'error-msg';
  msg.textContent = text;
  msg.style.textAlign = 'center';
  msg.style.marginTop = '10px';
  msg.style.fontWeight = '600';
  msg.style.color = '#e74c3c';
  dialog.querySelector('form').appendChild(msg);
}



/* Birthday selector*/


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

//JS for Feeding and Medication history
// Get the HTML elements
    const logForm = document.getElementById('log-form');
    const eventType = document.getElementById('event-type');
    const eventBrand = document.getElementById('event-brand');
    const eventTime = document.getElementById('event-time');
    const historyList = document.getElementById('history-list');
    
    // NEW: Get the "Delete All" button
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Load the saved history
    let history = JSON.parse(localStorage.getItem('petLogHistory')) || [];

    // Function to save and re-render
    function updateHistory(newHistory) {
      history = newHistory;
      localStorage.setItem('petLogHistory', JSON.stringify(history));
      renderHistory();
    }

    // Function to display the history on the page
    function renderHistory() {
      historyList.innerHTML = '';
      
      if (history.length === 0) {
        historyList.innerHTML = '<li class="empty-message">No events logged yet.</li>';
        // NEW: Hide the "Delete All" button if there's no history
        deleteAllBtn.style.display = 'none';
      } else {
        // NEW: Show the "Delete All" button if there is history
        deleteAllBtn.style.display = 'block';
      }

      history.slice().reverse().forEach(event => {
        const time = new Date(event.time).toLocaleString();
        
        const li = document.createElement('li');
        
        // NEW: Updated HTML includes a wrapper div and the delete button
        // The button has a `data-id` attribute holding the event's unique ID
        li.innerHTML = `
          <div class="history-item-text">
            <span class="history-details">
              <strong>${event.type}</strong> (${event.brand})
            </span>
            <span class="history-time">${time}</span>
          </div>
          <button class="delete-btn" data-id="${event.id}">Delete</button>
        `;
        historyList.appendChild(li);
      });
    }

    // Handle the form submission
    logForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newEvent = {
        // NEW: Give each event a unique ID (using the current timestamp)
        id: Date.now(), 
        type: eventType.value,
        brand: eventBrand.value,
        time: eventTime.value
      };

      // Create a new array with the old history and the new event
      const updatedHistory = [...history, newEvent];
      updateHistory(updatedHistory);
      
      logForm.reset();
    });

    // NEW: Event listener for the "Delete All" button
    deleteAllBtn.addEventListener('click', () => {
      // Show a confirmation popup
      if (confirm('Are you sure you want to delete all history? This cannot be undone.')) {
        updateHistory([]); // Save an empty array
      }
    });

    // NEW: Event listener for the individual "Delete" buttons
    // We listen for clicks on the whole list, then check if a delete button was clicked
    historyList.addEventListener('click', (e) => {
      // Check if the clicked element has the class "delete-btn"
      if (e.target.classList.contains('delete-btn')) {
        // Get the unique ID from the button's `data-id` attribute
        const eventId = Number(e.target.dataset.id);
        
        // Create a new array, filtering out the event with that ID
        const updatedHistory = history.filter(event => event.id !== eventId);
        
        // Save the new, filtered array
        updateHistory(updatedHistory);
      }
    });

    // Run this function once when the page loads
    renderHistory();

// JS for food alarm reminders
// Get the new reminder elements
  const reminderForm = document.getElementById('reminder-form');
  const reminderName = document.getElementById('reminder-name');
  const reminderTime = document.getElementById('reminder-time');
  const remindersList = document.getElementById('reminders-list');

  // Load reminders from a *different* localStorage key
  let reminders = JSON.parse(localStorage.getItem('petLogReminders')) || [];

  // Function to save and re-render reminders
  function updateReminders(newReminders) {
    reminders = newReminders;
    localStorage.setItem('petLogReminders', JSON.stringify(reminders));
    renderReminders();
  }

  // Function to format time from "14:30" to "2:30 PM"
  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    const ampm = hour < 12 ? "AM" : "PM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  }

  // Function to display reminders on the page
  function renderReminders() {
    remindersList.innerHTML = ''; // Clear the list

    if (reminders.length === 0) {
      remindersList.innerHTML = '<li class="empty-message">No daily reminders set.</li>';
      return;
    }
    
    // Sort reminders by time
    const sortedReminders = reminders.sort((a, b) => a.time.localeCompare(b.time));

    sortedReminders.forEach(reminder => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="reminder-text">
          <span class="reminder-time">${formatTime(reminder.time)}</span>
          <span class="reminder-name">${reminder.name}</span>
        </div>
        <button class="delete-reminder-btn" data-id="${reminder.id}">Delete</button>
      `;
      remindersList.appendChild(li);
    });
  }

  // Handle new reminder form submission
  reminderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newReminder = {
      id: Date.now(),
      name: reminderName.value,
      time: reminderTime.value
    };
    
    const updatedReminders = [...reminders, newReminder];
    updateReminders(updatedReminders);
    
    reminderForm.reset();
  });

  // Handle clicks to delete a single reminder
  remindersList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-reminder-btn')) {
      const reminderId = Number(e.target.dataset.id);
      
      const updatedReminders = reminders.filter(r => r.id !== reminderId);
      updateReminders(updatedReminders);
    }
  });

  // Initial render when the page loads
  renderReminders();
