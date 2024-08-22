let cartIcon = document.querySelector('#icon-cart');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}
//close cart
closeCart.onclick = () => {
    cart.classList.remove('active')
}
//cart 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    //remove item 
    let removeCartBtns = document.getElementsByClassName('cart-remove');
    console.log(removeCartBtns);

    for (let i = 0; i < removeCartBtns.length; i++) {
        var button = removeCartBtns[i];
        button.addEventListener('click', removeItem)
    }
    //quantity change
    var quantityInput = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[0];
        input.addEventListener('change', quantityChanged)
    }

    //add cart
    var addCart = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addCart.length; i++) {
        var btn = addCart[i];
        btn.addEventListener('click', addClicked)
    }
    //button buy product
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', btnBuyClicked)
}

//btnBuyClicked
function btnBuyClicked() {
    alert('Bạn muốn Thanh toán !')

    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}


//remove item
function removeItem(e) {
    var btnClick = e.target;
    btnClick.parentElement.remove();
    updateTotal();
}

//change quantity
function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}
//add to cart
function addClicked(e) {
    var buton = e.target;
    var shopProducts = buton.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal()

}

// add product to cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemName = cartItems.getElementsByClassName('cart-product-title');

    for (let i = 0; i < cartItemName.length; i++) {

        if (cartItemName[i].innerText == title) {
            alert('Thêm vào giỏ hàng!');
            return
        }
    }
    var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}3</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            
                            <i class='bx bx-trash cart-remove'></i>
    
    `;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceEle = cartBox.getElementsByClassName('cart-price')[0];
        var quantityE = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceEle.innerText.replace("$", ""));
        var quantity = quantityE.value;
        total = total + (price * quantity);     
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}

