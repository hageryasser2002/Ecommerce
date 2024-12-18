function cartPage(){
    window.location.href="cartPage.html";
}

const arr = ["sh1.jpg", "c.jpg", "c3.jpg", "c4.jpg", "c6.jpg", "m1.jpg", "m2.jpg"];
let currentIndex = 0;

function changeImage(img, newIndex) {
    img.style.transform = "scale(.8)";
    img.style.transition = "transform 1s ease-in";

    setTimeout(() => {
        img.style.transform = "scale(1.3) translateX(-20px)";
        img.style.transition = "transform 2s ease-in";
    }, 1000);

    img.setAttribute("src", arr[newIndex]);
}

function next() {
    const img = document.querySelector("#imginner");
    currentIndex++;

    if (currentIndex >= arr.length) {
        currentIndex = 0; 
    }

    changeImage(img, currentIndex);
}


let currentIndexPre = arr.length - 1;
function previous() {
    const imgPrev = document.getElementById("imgprev");
    currentIndexPre--;

    if (currentIndexPre < 0) {
        currentIndexPre = arr.length - 1; 
    }

    changeImage(imgPrev, currentIndexPre);
}



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

window.onload = function () {
  displayProducts("https://fakestoreapi.com/products");
};

function displayProducts(apiUrl) {
  var mainContainer = document.getElementById("allproducts");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        mainContainer.innerHTML = "";

        if (response.length === 0) {
          mainContainer.innerHTML = "<p>No products available</p>";
        } else {
          response.forEach((product) => {
            var container = document.createElement("div");
            container.classList.add("firstDiv");

            container.addEventListener("mouseenter", function () {
              this.style.transform = "scale(1.3)";
              this.style.transition = "transform 0.3s ease";
            });
            container.addEventListener("mouseleave", function () {
              this.style.transform = "scale(1)";
              this.style.transition = "transform 0.3s ease";
            });

            var category = document.createElement("h3");
            category.innerHTML = product.category;
            var img = document.createElement("img");
            img.src = product.image;
            var title = document.createElement("span");
            title.innerHTML = product.title;
            var price = document.createElement("span");
            price.innerHTML = product.price + "$";
            var divIcons = document.createElement("div");
            divIcons.classList.add("addOrshow");

            var iconShow = document.createElement("i");
            iconShow.classList.add("fa-solid", "fa-plus");

            iconShow.addEventListener("click", function () {
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


            var iconAdd = document.createElement("i");
            iconAdd.classList.add("fa-solid", "fa-eye");
            iconAdd.addEventListener("click", function () {
              console.log("done");

              localStorage.setItem("productId", product.id);
              window.location.href = "productDetails.html";
            });
            divIcons.append(iconAdd, iconShow);

            container.append(category, img, title, price, divIcons);
            mainContainer.append(container);
          });
        }
      } else {
        mainContainer.innerHTML = "<p>Error loading products</p>";
        console.error("Error loading data: " + xhr.status);
      }
    }
  };
}

document.getElementById("showAllBtn").onclick = function () {
  displayProducts("https://fakestoreapi.com/products");
};

document.getElementById("showClothesBtn").onclick = function () {
  displayProducts(
     "https://fakestoreapi.com/products/category/women's clothing" );
};

document.getElementById("showAccessoriesBtn").onclick = function () {
  displayProducts("https://fakestoreapi.com/products/category/jewelery");
};

document.getElementById("showDevicesBtn").onclick = function () {
  displayProducts("https://fakestoreapi.com/products/category/electronics");
};


const backToTopButton = document.getElementById('backToTop');


window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
};


backToTopButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
};