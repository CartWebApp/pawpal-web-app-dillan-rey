// Check for saved dark mode preference and apply immediately
const darkMode = localStorage.getItem('darkMode');

if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Wait for page to load before setting up toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmodetoggle');
    
    // If toggle exists on this page, set its state and add listener
    if (darkModeToggle) {
        // Set toggle to match current dark mode state
        if (darkMode === 'enabled') {
            darkModeToggle.checked = true;
        }
        
        // Listen for toggle changes
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                // Enable dark mode
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                // Disable dark mode
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});