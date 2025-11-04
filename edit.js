document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach(button => {
    const input = button.previousElementSibling; // the input before each button
    button.addEventListener("click", () => {
      const isReadonly = input.hasAttribute("readonly");

      // When user clicks "Edit"
      if (isReadonly) {
        input.removeAttribute("readonly");
        input.classList.add("editing");
        input.focus();
        button.innerHTML = "💾"; // change to save
      } 
      // When user clicks "Save"
      else {
        const id = input.getAttribute("type"); // check field type (tel/email/password/text)
        const value = input.value.trim();
        let isValid = true;

        // 📱 Validate phone
        if (id === "tel") {
          const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
          if (!phonePattern.test(value)) {
            alert("Please enter a valid phone number format, e.g. (555)-123-4567");
            input.focus();
            isValid = false;
          }
        }

        // 📧 Validate email
        if (id === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            alert("Please enter a valid email address.");
            input.focus();
            isValid = false;
          }
        }

        // If valid, save and lock field again
        if (isValid) {
          input.setAttribute("readonly", true);
          input.classList.remove("editing");
          button.innerHTML = "&#9665;"; // revert to triangle
          input.style.borderColor = "#ccc";
        }
      }
    });
  });
});
