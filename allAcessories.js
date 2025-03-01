
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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Update the profile link based on login status
  const profileLink = document.querySelector("#profileLink");
  if (profileLink) {
    if (isLoggedIn) {
      profileLink.href = "./logout.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> Logout
      `;
    } else {
      profileLink.href = "./login.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> Login
      `;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("products")) || [];
  const allProductsContainer = document.getElementById("allProducts");
  const productCardTemplate = document.getElementById("productCardTemplate");

  function displayAllProducts() {
    // Clear the container before displaying products
    allProductsContainer.innerHTML = "";

    if (productData.length > 0) {
      productData.forEach((product, index) => {
        const { name, price, images, discount, description } = product;
        const productCard = productCardTemplate.content.cloneNode(true);

        // Populate product details
        productCard.querySelector(".accessorieName").textContent = name;
        productCard.querySelector(".accessoriePrice").textContent = price;

        const discountElement = productCard.querySelector(".accessorieDiscount");
        discountElement.textContent = discount ? `${discount}%` : "No discount";
         productCard.querySelector(".product-description").textContent = description || "No description available";

        // Select the image container
        const imageContainer = productCard.querySelector(".acessorieImg");
        if (images && images.length > 0) {
            const img = document.createElement("img");
            img.src = images[0]; // Display only the first image
            img.alt = "Product Image";
            imageContainer.appendChild(img);
        } else {
            // Handle case where no images are available
            const placeholder = document.createElement("div");
            placeholder.textContent = "No image available";
            imageContainer.appendChild(placeholder);
        }

        // Add event listener to open details page on click
        const productButton = productCard.querySelector("button");
        productButton.addEventListener("click", () => {
          localStorage.setItem("selectedProduct", JSON.stringify(product));
          window.location.href = "acessorieDetail.html";
        });

        // Append the product card to the container
        allProductsContainer.appendChild(productCard);
      });
    } else {
      allProductsContainer.innerHTML = `<p>No products available.</p>`;
    }
  }

  displayAllProducts();
});

