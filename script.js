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


