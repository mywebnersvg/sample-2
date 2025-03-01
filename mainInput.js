document.addEventListener("DOMContentLoaded", () => {
    const productData = JSON.parse(localStorage.getItem("products")) || [];
    const boysProductsContainer = document.getElementById("boysProducts");
    const girlsProductsContainer = document.getElementById("girlsProducts");
    const bothProductsContainer = document.getElementById("bothProducts");
    const productCardTemplate = document.getElementById("productCardTemplate");
  
    function displayProducts() {
      // Clear all containers before displaying products
      boysProductsContainer.innerHTML = "";
      girlsProductsContainer.innerHTML = "";
      bothProductsContainer.innerHTML = "";
  
      if (productData.length > 0) {
        productData.forEach((product, index) => {
          const { name, price, images, discount, category, description } = product;
          const productCard = productCardTemplate.content.cloneNode(true);
  
          // Populate the product card
          productCard.querySelector(".product-name").textContent = name;
          productCard.querySelector(".product-price").textContent = price;
          const discountElement = productCard.querySelector(".product-discount");
          discountElement.textContent = discount ? `${discount}%` : "No discount";
          productCard.querySelector(".product-description").textContent = description || "No description available";
  
          const imageContainer = productCard.querySelector(".image-container");
          images.forEach((image) => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = "Product Image";
            imageContainer.appendChild(img);
          });
  
          // Add delete functionality
          const deleteButton = productCard.querySelector("svg");
          deleteButton.addEventListener("click", () => {
            const updatedProducts = productData.filter((_, i) => i !== index);
            productData.length = 0;
            productData.push(...updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            displayProducts(); // Refresh the display
          });
  
          // Append the product card to the correct container based on category
          if (category === "Boys") {
            boysProductsContainer.appendChild(productCard);
          } else if (category === "Girls") {
            girlsProductsContainer.appendChild(productCard);
          } else if (category === "Both") {
            bothProductsContainer.appendChild(productCard);
          }
        });
      } else {
        // If no products are found, display a message in all containers
        boysProductsContainer.innerHTML = `<p>No products found for Boys.</p>`;
        girlsProductsContainer.innerHTML = `<p>No products found for Girls.</p>`;
        bothProductsContainer.innerHTML = `<p>No products found for Both.</p>`;
      }
    }
  
    // Initial display of products
    displayProducts();
  });
  