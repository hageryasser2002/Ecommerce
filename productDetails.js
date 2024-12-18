function getCookie(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") == 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return "";
}

var username = getCookie("username");
if (username) {
  document.getElementById("h1").innerHTML = "Hello, " + username;
}
var productId = localStorage.getItem("productId");
var btn = document.getElementById("btn");
if (productId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products/" + productId, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var product = JSON.parse(xhr.responseText);
      console.log(product);

      document.getElementById("productImg").src = product.image;
      document.getElementById("productTitle").innerText = product.title;
      document.getElementById("productPrice").innerText = "$" + product.price;
      document.getElementById("productDescription").innerText =
        product.description;

        btn.addEventListener("click", function () {
          const productData = {
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.price,
              quantity: 1
          };
      
          let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      
          const existingProductIndex = cart.findIndex(item => item.id === productData.id);
          if (existingProductIndex === -1) {
              cart.push(productData);
          } else {
              cart[existingProductIndex].quantity += productData.quantity; 
          }
      
          sessionStorage.setItem("cart", JSON.stringify(cart)); 
          alert("تم إضافة المنتج إلى السلة!");
      });
      
      
    } else if (xhr.readyState === 4) {

      document.getElementById("productDetails").innerHTML =
        "<p>Error loading product details</p>";

    }
  };
}
