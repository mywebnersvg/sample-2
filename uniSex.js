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
    const bothProductsContainer = document.getElementById("bothProducts");
    const productCardTemplate = document.getElementById("productCardTemplate");
    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestionsBox");
    const searchInputOutside = document.getElementById("searchInputOutside");
    const suggestionsBoxOutside = document.getElementById("suggestionsBoxOutside");
  
    const productsPerPage = 15; // Number of products per page
    let currentPage = 1; // Current page
    let allProducts = []; // Store all products fetched from localStorage
    let filteredProducts = []; // Store filtered products for search
  
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");
  
    // Load products from localStorage
    allProducts = JSON.parse(localStorage.getItem("products")) || [];
    filteredProducts = allProducts.filter(product => product.category === "Both"); // Filter for Both category
    displayProducts();
  
    // Function to display products with pagination
    function displayProducts() {
      bothProductsContainer.innerHTML = "";
  
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
      if (paginatedProducts.length > 0) {
        paginatedProducts.forEach((product) => {
          const productCard = productCardTemplate.content.cloneNode(true);
          productCard.querySelector(".accessorieName").textContent = product.name;
          productCard.querySelector(".accessoriePrice").textContent = product.price;
          productCard.querySelector(".accessorieDiscount").textContent = product.discount ? `${product.discount}%` : "";
  
          const imageContainer = productCard.querySelector(".acessorieImg");
          if (product.images && product.images.length > 0) {
            const img = document.createElement("img");
            img.src = product.images[0];
            img.alt = product.name;
            imageContainer.appendChild(img);
          }
  
          const productButton = productCard.querySelector("button");
          productButton.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "acessorieDetail.html";
          });
  
          bothProductsContainer.appendChild(productCard);
        });
      } else {
        bothProductsContainer.innerHTML = `<p>No products available.</p>`;
      }
  
      updatePaginationControls();
    }
  
    // Function to update pagination controls
    function updatePaginationControls() {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  
      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage === totalPages;
    }
  
    // Function to show search suggestions
    function showSuggestions(filteredProducts, suggestionsBox) {
      suggestionsBox.innerHTML = "";
      if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
          const suggestion = document.createElement("div");
          suggestion.textContent = product.name;
          suggestion.classList.add("suggestion");
          suggestion.addEventListener("click", () => {
            searchInput.value = product.name;
            filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(product.name.toLowerCase()));
            currentPage = 1;
            displayProducts();
            suggestionsBox.classList.add("hidden");
          });
          suggestionsBox.appendChild(suggestion);
        });
        suggestionsBox.classList.remove("hidden");
      } else {
        suggestionsBox.classList.add("hidden");
      }
    }
  
    // Event listener for search input
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === "") {
        filteredProducts = allProducts.filter(product => product.category === "Both");
        suggestionsBox.classList.add("hidden");
      } else {
        filteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) && product.category === "Both"
        );
        showSuggestions(filteredProducts, suggestionsBox);
      }
      currentPage = 1;
      displayProducts();
    });
  
    // Event listener for outside search input
    searchInputOutside.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === "") {
        filteredProducts = allProducts.filter(product => product.category === "Both");
        suggestionsBoxOutside.classList.add("hidden");
      } else {
        filteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) && product.category === "Both"
        );
        showSuggestions(filteredProducts, suggestionsBoxOutside);
      }
      currentPage = 1;
      displayProducts();
    });
  
    // Event listener for previous page button
    prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayProducts();
      }
    });
  
    // Event listener for next page button
    nextPageButton.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
      }
    });
  });
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("input[type='search']");
    const suggestionsBox = document.getElementById("suggestionsBox");
    const searchButton = document.getElementById("searchButton");
  
    // Load products from localStorage
    const productData = JSON.parse(localStorage.getItem("products")) || [];
  
    // Function to filter products based on search query
    function filterProducts(query) {
      if (!query) {
        suggestionsBox.innerHTML = ""; // Clear when input is empty
        suggestionsBox.classList.add("hidden");
        return;
      }
  
      const filteredProducts = productData.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
  
      // Display results
      displaySuggestions(filteredProducts);
    }
  
    // Function to display filtered products
    function displaySuggestions(products) {
      suggestionsBox.innerHTML = ""; // Clear previous suggestions
  
      if (products.length === 0) {
        suggestionsBox.innerHTML = "<p>No matching products found.</p>";
      } else {
        products.forEach(product => {
          const suggestion = document.createElement("div");
          suggestion.classList.add("suggestionItem");
          suggestion.textContent = product.name;
          suggestion.addEventListener("click", () => {
            searchInput.value = product.name; // Set input to selected product
            suggestionsBox.innerHTML = ""; // Clear suggestions
            suggestionsBox.classList.add("hidden");
          });
          suggestionsBox.appendChild(suggestion);
        });
      }
  
      suggestionsBox.classList.remove("hidden"); // Show suggestions
    }
  
    // Attach event listeners
    searchInput.addEventListener("input", (e) => {
      filterProducts(e.target.value);
    });
  
    // Hide suggestions when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.add("hidden");
      }
    });
  
    // Enable search button click functionality
    searchButton.addEventListener("click", () => {
      filterProducts(searchInput.value);
    });
  });
  
  const marqueeText = document.querySelector('.marquee-text');
  let position = window.innerWidth;
  
  function animateMarquee() {
      position -= 2; // Adjust speed by changing the decrement value
      if (position < -marqueeText.offsetWidth) {
          position = window.innerWidth; // Reset position after it moves out
      }
      marqueeText.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateMarquee);
  }
  
  animateMarquee();

