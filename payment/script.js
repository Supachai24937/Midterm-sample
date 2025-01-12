$(document).ready(function () {
  function loadCartItems() {
    // ดึงข้อมูล cartItems จาก localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // ตรวจสอบว่าตะกร้ามีสินค้าไหม
    if (cartItems.length === 0) {
      $("#payment-container").html("<div class='errortext'>No product in the cart</div>");
      return;
    }

    let cartItemHtml = "";

    // สร้าง HTML สำหรับสินค้าแต่ละรายการในตะกร้า
    for (let item of cartItems) {
      const totalProductPrice = (item.price * item.quantity).toFixed(2);
      cartItemHtml += `
      <div class="cart-item d-flex justify-content-between align-items-center mt-3 p-2 items rounded" data-id="${item.addedProductId}">
        <div class="d-flex flex-row"><img class="rounded" src="${item.img}" alt="${item.productname}">
          <div class="ml-2"><span class="font-weight-bold d-block">${item.productname}</span><span class="spec">Lorem ipsum, dolor sit</span></div>
          </div>
        <div class="d-flex flex-row align-items-center"><span class="d-block">${item.quantity}</span><span class="d-block ml-5 font-weight-bold">Total:$ ${totalProductPrice}</span><i class="fa fa-trash-o ml-3 text-black-50 delete-btn"></i></div>
      </div>
      `;
    };

    // เพิ่ม HTML ของสินค้าแต่ละชิ้นเข้าไปใน container
    document.querySelector("#payment-container").innerHTML = cartItemHtml;
    
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
      document.querySelector("#button-text").textContent = `$${Total.toFixed(2)}`;
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
    
    // เรียกใช้ฟังก์ชันเมื่อคลิกปุ่มลบ
    document.querySelectorAll(".delete-btn").forEach(button => {
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
  $("#submit").on("click", () => window.location.href = "https://www.paypal.com/ncp/payment/GHB4PQWZNKSCQ");
});
