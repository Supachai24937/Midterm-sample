$(document).ready(function () {
  // ฟังก์ชันดึงค่า "id" จาก URL
  function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  // ฟังก์ชันโหลดข้อมูลสินค้า
  function loadProductData() {
    const productId = getProductIdFromUrl();

    $.getJSON("products.json", function (products) {
      const selectedProduct = products.find(
        (product) => product.id == productId
      );

      if (selectedProduct) {
        $("#image-container").html(
          `<img src="${selectedProduct.image}" alt="${selectedProduct.productname}" />`
        );
        $("#product-name").html(`<h2>${selectedProduct.productname}</h2>`);
        $("#price").text(`$ ${selectedProduct.price}`);
      }
    });
  }

  // ฟังก์ชันจัดการปุ่มเพิ่ม/ลดจำนวนสินค้า
  function setupQuantityControls() {
    $(".qtyminus").on("click", function () {
      let currentQty = parseInt($(".qty").val());
      if ($.isNumeric(currentQty) && currentQty > 1) {
        $(".qty").val(currentQty - 1);
      }
    });

    $(".qtyplus").on("click", function () {
      let currentQty = parseInt($(".qty").val());
      if ($.isNumeric(currentQty)) {
        $(".qty").val(currentQty + 1);
      }
    });
  }

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
  function addProductToCart() {
    const productId = getProductIdFromUrl();
    const quantity = parseInt($(".qty").val());

    $.getJSON("products.json", function (products) {
      const selectedProduct = products.find(
        (product) => product.id == productId
      );

      if (!selectedProduct) return;

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingProductIndex = cartItems.findIndex(
        (item) => item.addedProductId === productId
      );

      if (existingProductIndex !== -1) {
        // ถ้าสินค้าซ้ำ อัปเดต quantity
        cartItems[existingProductIndex].quantity += quantity;
      } else {
        // ถ้าไม่มีในตะกร้า เพิ่มสินค้าใหม่
        cartItems.push({
          addedProductId: productId,
          img: selectedProduct.image,
          productname: selectedProduct.productname,
          price: selectedProduct.price,
          quantity: quantity,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.location.href = "/mycart.html";
    });
  }

  // เรียกใช้ฟังก์ชัน
  loadProductData();
  setupQuantityControls();

  $("#addToCart").on("click", addProductToCart);
});
