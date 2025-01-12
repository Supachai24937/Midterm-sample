/*
We start our code with an ajax request to fetch the data from json file.
*/
let http = new XMLHttpRequest();

http.open("get", "products.json", true);

//ส่ง request
http.send();

//ตั้งเงื่อนไขว่า readyState == 4 && this.status == 200 ระบบพร้อมสำหรับการส่งข้อมูล
http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    //เมื่อคำขอสำเร็จ เราจะเริ่มแปลงข้อมูล json เป็น javascript array
    let products = JSON.parse(this.responseText);

    //empty variable
    let output = "";

    //loop products
    for (let item of products) {
      
      if (item.tag === "Best Selling") {
      output += `
            <div class ="product">
            <div class="img">
            <img src="${item.image}" alt="${item.productname}" />
            </div>
            <div class = "name">${item.productname}</div>
            <div class = "tag">${item.tag}</div>
            <div class = "price">
            <span>&dollar;</span>
            <span>${item.price}</span>
          </div>
          <div class = "buttoncontainer">
            <div class = "button1" onclick="window.location.href='productdetail.html?id=${item.id}'">View Details</div>
          </div>
        </div>
      `;
      }
    }
    document.querySelector(".productspecial").innerHTML = output;
  }
};

/* Demo Scripts for Bootstrap Carousel and Animate.css article
*/
(function( $ ) {

	//Function to animate slider captions 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	
	//Variables on page load 
	var $myCarousel = $('#carousel-example-generic'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	$myCarousel.carousel();
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	// $myCarousel.carousel('pause');
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});  
	
})(jQuery);


