var x = location.href
l = x.length
var id = x[l-2]+x[l-1]
id = parseInt(id)
console.log(id);
var productData = ''

document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count'))


var url = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+ id
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('details-loading').style.display = 'none'
      document.getElementById('product').style.display = 'flex'
        productData = (JSON.parse(xhttp.responseText));
        var bigimg = document.getElementsByClassName('left-column')
        var bi = document.createElement('img')
        bi.src= productData.preview

        bigimg[0].appendChild(bi)

        var nam = document.getElementById('name')
        var brand = document.getElementById('brand')
        var price = document.getElementById('price')
        var description = document.getElementById('description')
        var img = []
        var images = document.getElementById('smallimgbox')
        var out = ''

        for (let i = 0; i < productData.photos.length; i++) {
            if(i==0){
                out = out+`<img id="img${i}" class="active" src="${productData.photos[i]}" alt="" />`
            }
            else{
                out = out + `<img id="img${i}" src="${productData.photos[i]}" alt="" />`
            }

        }
        images.innerHTML = out

        nam.innerHTML = productData.name
        brand.innerHTML = productData.brand
        price.innerHTML = productData.price
        description.innerHTML = productData.description


        var x = document.getElementsByClassName('previewImg')
        var data = x[0].getElementsByTagName('img')

        for (let i = 0; i < data.length; i++) {
            data[i].addEventListener('click',function(){
                bi.src = data[i].src
                addact(i)
            })
        }

        function addact(i){
            document.querySelector('.active')?.classList.remove('active')
            data[i].classList.add('active')
        }


    }

}

xhttp.open("GET",url, true);
xhttp.send();



var addcart = document.getElementById('add-to-cart')
addcart.addEventListener('click', ()=>{
  console.log('Added to cart');
  localStorage.setItem('cart-count',parseInt(localStorage.getItem('cart-count'))+1)
  document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count'))

  if (window.localStorage.getItem("product-list") === null) {
    myCartData = [];
  }

  else {
    myCartData = JSON.parse(window.localStorage.getItem("product-list"));
  }


  if (myCartData.length === 0) {
    var myObj = {
      id: productData.id,
      title: productData.name,
      count: 1,
      price: productData.price,
      preview: productData.preview
    };
    myCartData.push(myObj);
  }
  else if (myCartData.length != 0) {
    var w = 0;
    for (var i = 0; i < myCartData.length; i++) {
      if (myCartData[i].id == productData.id) {
        myCartData[i].count = parseInt(myCartData[i].count) + 1;
        w += 1;
      }
    }

    if (w == 0) {
      var myObj = {
        id: productData.id,
        title: productData.name,
        count: 1,
        price: productData.price,
        preview: productData.preview
      };
      myCartData.push(myObj);
    }
  }
  window.localStorage.setItem("product-list", JSON.stringify(myCartData));

})