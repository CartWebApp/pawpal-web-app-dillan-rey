/* Forgot Password Overlay Script */

const dialog = document.getElementById('reset-ps');
const openBtn = document.querySelector('.forgot-link');

// Open the dialog
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.showModal();
});

// (Optional) Close if user clicks outside
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    dialog.close();
  }
});


dialog.addEventListener('close', () => {
  console.log(dialog.returnValue); // "cancel" or "confirm"
});

