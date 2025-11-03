//JS for App Pet Overlay
// Wait for the HTML document to be fully loaded before running script
document.addEventListener("DOMContentLoaded", function() {

    // --- Get Elements ---
    const addPetButton = document.getElementById("addpet");
    const modal = document.getElementById("addPetModal");
    const closeButton = document.querySelector(".close-button");
    const addPetForm = document.getElementById("addPetForm");
    const petsContainer = document.getElementById("Ppage");

    // --- Functions ---
    
    /**
     * Shows the modal by removing the 'hidden' class.
     */
    function openModal() {
        modal.classList.remove("hidden");
    }

    /**
     * Hides the modal by adding the 'hidden' class.
     */
    function closeModal() {
        modal.classList.add("hidden");
    }

    /**
     * Creates a new pet <figure> element and adds it to the page.
     * @param {string} name - The name of the pet.
     * @param {string} imageUrl - The URL or data string for the pet's image.
     */
    function createPetFigure(name, imageUrl) {
        // 1. Create the new <figure> element
        const newPetFigure = document.createElement("figure");
        newPetFigure.classList.add("Ppage_pet");

        // 2. Create the <a> link
        const petLink = document.createElement("a");
        petLink.href = "pet-1.html"; // Placeholder link, same as your others

        // 3. Create the <img>
        const petImage = document.createElement("img");
        petImage.src = imageUrl;
        petImage.alt = "Image of " + name;

        // 4. Create the <p> for the name
        const petName = document.createElement("p");
        petName.textContent = name;

        // 5. Assemble the elements
        petLink.appendChild(petImage);
        petLink.appendChild(petName);
        newPetFigure.appendChild(petLink);

        // 6. Add the new pet figure to the page
        // We insert it *before* the "addpet" button
        petsContainer.insertBefore(newPetFigure, addPetButton);
    }

    /**
     * Handles the form submission event.
     * @param {Event} event - The form submit event.
     */
    function handleFormSubmit(event) {
        event.preventDefault(); // Stop the form from reloading the page

        // Get data from the form
        const petName = document.getElementById("petName").value;
        const petImageFile = document.getElementById("petImage").files[0];
        
        // You can also get the other data if you need to store it
        // const petType = document.getElementById("petType").value;
        // const petWeight = document.getElementById("petWeight").value;
        // const petMedical = document.getElementById("petMedical").value;

        // Check if the user uploaded an image
        if (petImageFile) {
            // Use FileReader to read the file and get a data URL
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // When the file is loaded, create the pet figure
                const imageUrl = e.target.result;
                createPetFigure(petName, imageUrl);
            };
            
            reader.readAsDataURL(petImageFile);
        } else {
            // No image uploaded, use the default dog icon
            const defaultImageUrl = "images/dogicon.png";
            createPetFigure(petName, defaultImageUrl);
        }

        // Reset the form and close the modal
        addPetForm.reset();
        closeModal();
    }


    // --- Event Listeners ---

    // Click "Add Pets" button to open modal
    addPetButton.addEventListener("click", openModal);

    // Click the "X" button to close modal
    closeButton.addEventListener("click", closeModal);

    // Click outside the modal content (on the overlay) to close it
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Listen for the form submission
    addPetForm.addEventListener("submit", handleFormSubmit);

});