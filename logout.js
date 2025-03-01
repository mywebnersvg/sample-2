document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Update login status in localStorage
      localStorage.setItem("isLoggedIn", "false");

      // Redirect to the login page
      window.location.href = "./index.html";
    });
  }
});
