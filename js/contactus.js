document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Clear all previous error messages
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.style.display = "none"));

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let valid = true;

    if (!name) {
      valid = false;
      document.getElementById("nameError").style.display = "block";
    }

    if (!validateEmail(email)) {
      valid = false;
      document.getElementById("emailError").style.display = "block";
    }

    if (!validateMessage(message)) {
      valid = false;
      document.getElementById("telError").style.display = "block";
    }


    if (valid) {
      alert("Form submitted successfully!");
      this.submit();
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function validateMessage(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}
