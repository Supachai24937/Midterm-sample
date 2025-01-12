document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const productsContainer = document.querySelector(".products");

  let allProducts = []; // เก็บข้อมูลสินค้าทั้งหมด

  // ฟังก์ชันโหลดสินค้าและแสดงผล
  const loadProducts = (products) => {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
      productsContainer.innerHTML = "<h2>No product found</h2>";
    } else {
      let output = "";
      for (let item of products) {
        output += `
          <div class="product">
            <div class="img">
              <img src="${item.image}" alt="${item.productname}" />
            </div>
            <div class="name">${item.productname}</div>
            <div class="price">
              <span>&dollar;</span>
              <span>${item.price}</span>
            </div>
            <div class="buttoncontainer">
              <div class="button1" onclick="window.location.href='productdetail.html?id=${item.id}'">View Details</div>
            </div>
          </div>
        `;
      }
      productsContainer.innerHTML = output;
    }
  };

  // โหลดข้อมูลจาก products.json
  const fetchProducts = (callback) => {
    let http = new XMLHttpRequest();
    http.open("get", "products.json", true);
    http.send();
    http.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        allProducts = JSON.parse(this.responseText);
        if (callback) callback(allProducts);
      }
    };
  };

  // ฟังก์ชันค้นหาสินค้า
  const searchProducts = (query) => {
    const filteredProducts = allProducts.filter((product) =>
      product.productname.toLowerCase().includes(query)
    );
    loadProducts(filteredProducts);
  };

  // ตรวจสอบว่าอยู่ในหน้า product.html หรือไม่
  if (productsContainer) {
    // ดึงคำค้นหาจาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("search") || ""; // ค่าค้นหา (ถ้าไม่มีให้เป็นค่าว่าง)

    fetchProducts((products) => {
      if (query) {
        const filteredProducts = products.filter((product) =>
          product.productname.toLowerCase().includes(query.toLowerCase())
        );
        loadProducts(filteredProducts);
      } else {
        loadProducts(products); // ถ้าไม่มีคำค้นหา แสดงสินค้าทั้งหมด
      }
    });
  }

  // การคลิกปุ่ม Search ในหน้าอื่น
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
      // นำทางไปที่ product.html พร้อมส่งคำค้นหาใน URL
      window.location.href = `product.html?search=${query}`;
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();
        // นำทางไปที่ product.html พร้อมส่งคำค้นหาใน URL
        window.location.href = `product.html?search=${query}`;
      }
    });
  }
});
