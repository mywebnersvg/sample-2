// Modal Logic
window.onclick = function (event) {
  const loginModal = document.getElementById("loginModal");
  const signUpModal = document.getElementById("signUpModal");

  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === signUpModal) {
    signUpModal.style.display = "none";
  }
};

// Open and Close Navigation
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.left = "40px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.left = "-20%";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting traditionally.

    // Get the email and password values from the form
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="psw"]').value;
    const repeatPassword = form.querySelector('input[name="psw-repeat"]').value;

    // Check if passwords match
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store email and password in localStorage (simulating saving user data)
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Redirect to login page
    window.location.href = "./login.html";
  });
});
