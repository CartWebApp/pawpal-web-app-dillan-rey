// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Get references to the necessary elements
    const chatMessages = document.getElementById("chat-messages");
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");

    // Get all the "Pal" figures that can be clicked
    const palFigures = document.querySelectorAll(".Pal");
    
    // Get the chat container itself
    const chatContainer = document.querySelector(".chat-container");
    
    // Get the new close button
    const closeChatBtn = document.querySelector(".chat-close-btn");

    // Add a click listener to each Pal figure
    palFigures.forEach(pal => {
        pal.addEventListener("click", () => {
            // Only open the overlay if we are on a mobile-sized screen
            if (window.innerWidth <= 640) {
                chatContainer.classList.add("chat-overlay-open");
            }
        });
    });

    // Add a click listener to the close button
    closeChatBtn.addEventListener("click", () => {
        chatContainer.classList.remove("chat-overlay-open");
    });

    // Listen for the form submission
    chatForm.addEventListener("submit", (event) => {
        // Prevent the default form submission (which reloads the page)
        event.preventDefault();

        // Get the message text from the input, trimming whitespace
        const messageText = messageInput.value.trim();

        // If the message isn't empty, add it to the chat
        if (messageText !== "") {
            addMessage(messageText);
            
            // Clear the input field
            messageInput.value = "";
            
            // Scroll to the bottom of the chat messages
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    /**
     * Creates a new message element and adds it to the chat window.
     * @param {string} text - The text of the message to add.
     */
    function addMessage(text) {
        // Create a new div for the message
        const messageElement = document.createElement("div");
        
        // Add the necessary classes for an outgoing message
        messageElement.classList.add("message", "outgoing");
        
        // Create a paragraph element for the text
        const textElement = document.createElement("p");
        textElement.textContent = text;
        
        // Add the paragraph to the message div
        messageElement.appendChild(textElement);
        
        // Add the new message to the chat container
        chatMessages.appendChild(messageElement);
    }

});





    // Dark mode script toggle for settings.html

    const toggle = document.getElementById("darkModeToggle");

    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggle.checked);
    });