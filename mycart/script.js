$(document).ready(function () {
  function loadCartItems() {
    // ดึงข้อมูล cartItems จาก localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // ตรวจสอบว่าตะกร้ามีสินค้าไหม
    if (cartItems.length === 0) {
      $("#cart-container").html("<div class='errortext'>No product in the cart</div>");
      return;
    }

    let cartItemHtml = "";

    // สร้าง HTML สำหรับสินค้าแต่ละรายการในตะกร้า
    for (let item of cartItems) {
      const totalProductPrice = (item.price * item.quantity).toFixed(2);
      cartItemHtml += `
<hr />
         <div class="cart-item py-2" data-id="${item.addedProductId}">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="d-flex justify-content-between mb-3">
              <div id="cart-image" class="cart-image">
                <img src="${item.img}" alt="${item.productname}" />
              </div>
              <div class="mx-3">
                <div id="product-name">${item.productname}</div>
                <p>Lorem ipsum, dolor sit</p>
                <div id="ProductPrice">Price:$ ${item.price}</div>
                <div id="totalProductPrice">Total:$ ${totalProductPrice}</div>
                <small class="custom-bg-black d-inline-block mt-2">In Stock</small>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="d-flex justify-content-between">
              <div class="qtybox">
                <div class="qtyminus">-</div>
                <input type="text" class="qty" id="qty-${item.addedProductId}" value="${item.quantity}" readonly />
                <div class="qtyplus">+</div>
              </div>
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
      `;
    };

    // เพิ่ม HTML ของสินค้าแต่ละชิ้นเข้าไปใน container
    document.querySelector("#cart-container").innerHTML = cartItemHtml;

    // คำนวณยอดรวมทั้งหมด
    function updateTotalPrice() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let subtotalPrice = 0;

      for (let item of cartItems) {
        subtotalPrice += item.price * item.quantity;
      }

      const shippingCost = 20;  // ตัวอย่างค่าจัดส่ง
      let Total = subtotalPrice + shippingCost;

      document.querySelector("#sumRevenue").textContent = `$${subtotalPrice.toFixed(2)}`;
      document.querySelector("#charge").textContent = `$${shippingCost.toFixed(2)}`;
      document.querySelector("#totalValue").textContent = `$${Total.toFixed(2)}`;
    }

    // ฟังก์ชันสำหรับเพิ่มหรือลดจำนวนสินค้า
    function updateQuantity(productId, action) {
      // ดึงข้อมูลจาก localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex(item => item.addedProductId == productId);

      if (itemIndex !== -1) {
        const item = cartItems[itemIndex];

        // เพิ่มหรือลดจำนวน
        if (action === "plus") {
          item.quantity += 1;
        } else if (action === "minus" && item.quantity > 1) {
          item.quantity -= 1;
        }

        // อัปเดตข้อมูลใน localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // อัปเดตการแสดงผลใหม่
        document.querySelector(`#qty-${productId}`).value = item.quantity;
      }
      
      // เรียกใช้ฟังก์ชันเมื่อมีการเปลี่ยนแปลงในตะกร้า
      updateTotalPrice();
    }

    function removeItem(productId) {
      // ดึงข้อมูล cartItems จาก localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // ลบสินค้าออกจาก cartItems
      const updatedCartItems = cartItems.filter(item => item.addedProductId !== productId);

      // อัปเดตข้อมูลใน localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // อัปเดตการแสดงผลใหม่
      loadCartItems(); // รีเฟรชการแสดงผลตะกร้าใหม่
    }
    
    
    // เรียกใช้ฟังก์ชันเมื่อคลิกปุ่ม qty-plus หรือ qty-minus
    document.querySelectorAll(".qtyplus").forEach(button => {
      button.addEventListener("click", function() {
        const productId = this.closest(".cart-item").getAttribute("data-id");
        updateQuantity(productId, "plus");
      });
    });

    document.querySelectorAll(".qtyminus").forEach(button => {
      button.addEventListener("click", function() {
        const productId = this.closest(".cart-item").getAttribute("data-id");
        updateQuantity(productId, "minus");
      });
    });
    
    // เรียกใช้ฟังก์ชันเมื่อคลิกปุ่มลบ
    document.querySelectorAll(".btn-close").forEach(button => {
      button.addEventListener("click", function() {
        const productId = this.closest(".cart-item").getAttribute("data-id");
        removeItem(productId);
      });
    });
    
    // เรียกฟังก์ชันเพื่อคำนวณยอดรวมเมื่อโหลดตะกร้าครั้งแรก
    updateTotalPrice();
  }

  // เรียกครั้งแรกตอนโหลดหน้าเว็บ
  loadCartItems();
  $("#submit").on("click", () => window.location.href = "/payment.html");
});

