document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Retrieve stored credentials
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Get input values
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="psw"]').value;

    // Specific credentials for index.html
    const specificEmail = "anusn2914@gmail.com";
    const specificPassword = "Pakistan+92";

    // Validate credentials
    if (email === specificEmail && password === specificPassword) {
      // Update login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      // Redirect to index.html
      window.location.href = "./index2.html";
    } else if (email === storedEmail && password === storedPassword) {
      // Update login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      // Redirect to index2.html for other valid credentials
      window.location.href = "./index.html";
    } else {
      alert("Invalid email or password!");
    }
  });
});