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
  
  // Mobile search toggle functionality
  const mobileSearchToggle = document.getElementById("mobileSearchToggle");
  const mobileSearchContainer = document.getElementById("mobileSearchContainer");
  
  mobileSearchToggle.addEventListener("click", () => {
    mobileSearchContainer.classList.toggle("active");
    if (mobileSearchContainer.classList.contains("active")) {
      document.getElementById("mobileSearchInput").focus();
    }
  });
});

// Product display and search functionality
document.addEventListener("DOMContentLoaded", async () => {
  const boysProductsContainer = document.getElementById("boysProducts");
  const girlsProductsContainer = document.getElementById("girlsProducts");
  const bothProductsContainer = document.getElementById("bothProducts");
  const productCardTemplate = document.getElementById("productCardTemplate");
  
  // Common function to display products
  function displayProducts(products) {
    boysProductsContainer.innerHTML = "";
    girlsProductsContainer.innerHTML = "";
    bothProductsContainer.innerHTML = "";
    
    products.forEach((product, index) => {
      const productCard = productCardTemplate.content.cloneNode(true);

      productCard.querySelector(".product-name").textContent = product.name;
      productCard.querySelector(".product-price").textContent = product.price;
      const discountElement = productCard.querySelector(".product-discount");
      discountElement.textContent = product.discount ? `${product.discount}%` : "No discount";
      productCard.querySelector(".product-description").textContent = product.description || "No description available";

      const imageContainer = productCard.querySelector(".image-container");
      product.images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = "Product Image";
        imageContainer.appendChild(img);
      });

      const deleteButton = productCard.querySelector("svg");
      deleteButton.addEventListener("click", async () => {
        try {
          const deleteResponse = await fetch(`http://localhost:3000/api/products/${index}`, {
            method: "DELETE",
          });

          if (deleteResponse.ok) {
            alert("Product deleted successfully!");
            window.location.reload();
          } else {
            alert("Failed to delete product.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });

      if (product.category === "Boys") {
        boysProductsContainer.appendChild(productCard);
      } else if (product.category === "Girls") {
        girlsProductsContainer.appendChild(productCard);
      } else if (product.category === "Both") {
        bothProductsContainer.appendChild(productCard);
      }
    });
  }

  // Fetch and display products
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const productData = await response.json();
    displayProducts(productData);
    
    // Set up search functionality for both desktop and mobile
    setupSearch(document.querySelector("input[type='search']"), document.getElementById("suggestionsBox"), displayProducts);
    setupSearch(document.getElementById("mobileSearchInput"), document.getElementById("mobileSuggestionsBox"), displayProducts);
    
    // Set up search button for mobile
    document.getElementById("mobileSearchButton").addEventListener("click", () => {
      const query = document.getElementById("mobileSearchInput").value;
      performSearch(query, displayProducts);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

// Common search setup function
function setupSearch(inputElement, suggestionsBox, displayFunction) {
  inputElement.addEventListener("input", async (e) => {
    const products = await filterProducts(e.target.value);
    displaySuggestions(products, suggestionsBox);
  });
  
  // Handle pressing Enter key
  inputElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch(inputElement.value, displayFunction);
      suggestionsBox.style.display = "none";
    }
  });
}

// Common function to filter products
async function filterProducts(query) {
  if (!query) return [];
  
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Common function to display suggestions
function displaySuggestions(products, suggestionsBox) {
  suggestionsBox.innerHTML = "";
  
  if (products.length === 0) {
    suggestionsBox.innerHTML = "<p>No matching products found.</p>";
  } else {
    products.forEach(product => {
      const suggestion = document.createElement("div");
      suggestion.classList.add(products === document.getElementById("mobileSuggestionsBox") ? "mobile-suggestion-item" : "suggestionItem");
      
      const suggestionContent = document.createElement("div");
      suggestionContent.style.display = "flex";
      suggestionContent.style.alignItems = "center";
      suggestionContent.style.gap = "10px";
      
      if (product.images && product.images.length > 0) {
        const img = document.createElement("img");
        img.src = product.images[0];
        img.alt = product.name;
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.objectFit = "cover";
        suggestionContent.appendChild(img);
      }
      
      const nameSpan = document.createElement("span");
      nameSpan.textContent = product.name;
      suggestionContent.appendChild(nameSpan);
      
      const priceSpan = document.createElement("span");
      priceSpan.textContent = `$${product.price}`;
      priceSpan.style.marginLeft = "auto";
      priceSpan.style.fontWeight = "bold";
      suggestionContent.appendChild(priceSpan);
      
      suggestion.appendChild(suggestionContent);
      
      suggestion.addEventListener("click", () => {
        const inputElement = suggestionsBox === document.getElementById("mobileSuggestionsBox") 
          ? document.getElementById("mobileSearchInput")
          : document.querySelector("input[type='search']");
        
        inputElement.value = product.name;
        suggestionsBox.style.display = "none";
        highlightProduct(product);
      });
      
      suggestionsBox.appendChild(suggestion);
    });
  }
  
  suggestionsBox.style.display = "block";
}

// Common function to perform search
async function performSearch(query, displayFunction) {
  const products = await filterProducts(query);
  if (products.length > 0) {
    displayFunction(products);
    if (products.length === 1) {
      highlightProduct(products[0]);
    }
  }
}

// Common function to highlight product
function highlightProduct(product) {
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.border = 'none';
  });
  
  const allProducts = document.querySelectorAll('.product-card');
  for (const card of allProducts) {
    const nameElement = card.querySelector('.product-name');
    if (nameElement && nameElement.textContent === product.name) {
      card.style.border = '2px solid #ff0000';
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    }
  }
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  const desktopSearch = document.querySelector(".searchBoxMain");
  const mobileSearch = document.getElementById("mobileSearchContainer");
  
  if (!desktopSearch.contains(e.target)) {
    document.getElementById("suggestionsBox").style.display = "none";
  }
  
  if (!mobileSearch.contains(e.target) && e.target !== document.getElementById("mobileSearchToggle")) {
    document.getElementById("mobileSuggestionsBox").style.display = "none";
  }
});