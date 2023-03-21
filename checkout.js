document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count'))

if(parseInt(localStorage.getItem('cart-count'))>0){
    document.getElementById('empty').style.display='none'
    document.getElementById('cart').style.display='block'
    var data = JSON.parse(localStorage.getItem('product-list'))
    console.log(data);
    var cart = document.getElementById('cart-item-container')
    var count = 0
    var total = 0
    for (let i = 0; i < data.length; i++) {
        count = count + data[i].count
        total = total + (data[i].count)*(data[i].price)
        var cart_item = document.createElement('div')
        cart_item.className = 'item'
        cart_item.innerHTML =`
        <img src="${data[i].preview}">
        <div class="detail">
        <h3>${data[i].title}
        </h3>
        <p>x${data[i].count}</p>
        <p>Amount: ${(data[i].count)*(data[i].price)}</p>
        </div>
        `
        cart.appendChild(cart_item)


    }
    document.getElementById('total-amount').innerHTML = total
    document.getElementById('number-of-item').innerHTML = count



    var checkout = document.getElementById('place-order')
    checkout.addEventListener('click',()=>{
        localStorage.clear()
        localStorage.setItem('cart-count',0)

    })
}