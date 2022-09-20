// navbar toggle for smaller screen
const toggleButton = document.getElementById('button-1')
const navbarLinks = document.getElementById('links-1')

toggleButton.addEventListener('click',function(){
 navbarLinks.classList.toggle('active');
 })
//  ends
//open and close cart which lies in -negative width.
const cartIcon = document.querySelector("#cart-icon");
const cart= document.querySelector(".cart");
const closeCart= document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
      cart.classList.add('active');
});
closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});
//ends

//functions of the div cart includes calculations 
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',start);
}else{
    start();
}
//========start=========
function start(){
    addEvents();
}
//=======update & re-render=======
function update(){
    addEvents();
    updateTotal();
}
//=========Add Events==========
function addEvents(){
    //remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) =>{
        btn.addEventListener("click",handle_removeCartItem);
    });
    //change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input =>{
       input.addEventListener("change", handle_changeItemQuantity); 
    });
    //add items to cart
    let addCart_btns = document.querySelectorAll(".add-cart")
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click",handle_addCartItem)
    })
}
//////handles events funcitons===
function handle_addCartItem(){
     let product = this.parentElement;
     let title = product.querySelector(".product-title").innerHTML;
     let price=product.querySelector(".product-price").innerHTML;
     let imgSrc = product.querySelector(".product-img").src;
     console.log(title,price,imgSrc);

     let newToAdd = {
         title,
         price,
         imgSrc,
     }
     //add product to cart
     let cartBoxElement= CartBoxComponent(title, price, imgSrc);
     let newNode = document.createElement("div");
     newNode.innerHTML=cartBoxElement;
      const cartContent = cart.querySelector(".cart-content");
      cartContent.appendChild(newNode);
      update();
    }   


function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}
function handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value < 1){
        this.Value = 1;
    }
    this.value = Math.floor(this.value);//to keep it integer
    update();
}
//=====update and rerender fucntions====
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    //keep 2 digits afeter decimal point
    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;
}
///========Html components======
function CartBoxComponent(title, price, imgSrc){
    return `
         <div class="cart-box">
                     <img src="${imgSrc}" alt="" class="cart-img"> 
                     <div class="detail-box">
                         <div class="cart-product-title">${title}</div>
                         <div class="cart-price">${price}</div>
                         <input type="number" value="1" class="cart-quantity">
                     </div>
                     <!--remove cart-->
                     <i class="fas -regular fa-trash-alt cart-remove"></i>
             </div>`;
    } 
    ////========place order=====
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click",()=>{
        alert("your order has been placed")
    });