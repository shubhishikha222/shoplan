var productList = ''
if(localStorage.key('cart-count')){
  var cart_count = localStorage.key('cart-count')
}
else{
  cart_count = 0
  localStorage.setItem('cart-count',0)
} 

document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count'))

var xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    if (this.status == 200) {
      document.getElementById('loading').style.display = 'none'
      document.getElementById('clothing').style.display = 'block'
      document.getElementById('accessories').style.display = 'block'
      document.getElementById('carousel').style.display = 'block'
       productList = (JSON.parse(xhttp.responseText));
      for (let index = 0; index < 10; index++) {
        if (productList[index].isAccessory==false ) {
          var card = document.createElement('a')
          card.className='card'
          if (productList[index].id<10){
            card.href="product/details.html?p=0"+productList[index].id
          }
          else{
            card.href="product/details.html?p="+productList[index].id
          }
          card.id = index+1
          card.innerHTML = `
          <div class="img">
          <img src="${productList[index].preview}">
          </div>
          <div class="details">
          <h3>${productList[index].name}
          </h3>
          <h4>${productList[index].brand}
          </h4>
          <h5>${productList[index].price}
          </h5>
          </div>
          `
          document.getElementById('clothingCards').appendChild(card)
        }
        else{
          var card = document.createElement('a')
          card.className='card'
          if (productList[index].id<10){
            card.href="product/details.html?p=0"+productList[index].id
          }
          else{
            card.href="product/details.html?p="+productList[index].id
          }
          card.id = index+1
          card.innerHTML = `
          <div class="img">
            <img src="${productList[index].preview}">
          </div>
          <div class="details">
            <h3>${productList[index].name}
            </h3>
            <h4>${productList[index].brand}
            </h4>
            <h5>${productList[index].price}
            </h5>
          </div>
          `
          document.getElementById('accessoriesCards').appendChild(card)
        }
      }  


    }
  };
  xhttp.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
  xhttp.send();

  console.log(productList);

  var slideIndex = 1;
  showSlides(slideIndex);
  function plusSlides(n) {
      showSlides(slideIndex += n);
  }
  function currentSlide(n) {
      showSlides(slideIndex = n);
  }
  function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
  }