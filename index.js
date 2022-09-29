// SELECT ELEMENTS
const productsEl = document.querySelector(".products-container")
const cartIcon = document.querySelector(".cart-icon")
const cardWrapper = document.querySelector(".cart-wrapper")
const cartHeading = document.querySelector(".cart-heading")
const productContainer = document.querySelector(".product-container");
const cartItemQuantity = document.querySelector(".cart-item-qty")
const totalPriceEl = document.querySelector(".total-price")
const returnBack = document.querySelector(".back-to-btn")

let cart = []


cartIcon.addEventListener("click", ()=>{
    cardWrapper.classList.remove("show")
})
returnBack.addEventListener("click", ()=>{
    document.querySelector(".cart-wrapper").classList.add("show")
})
cartHeading.addEventListener("click", ()=>{
    document.querySelector(".cart-wrapper").classList.add("show")
})

// RENDER PRODUCTS
function renderProducts() {
    products.forEach((product)=>{
        productsEl.innerHTML += `
        <div class="animated-product" onclick="showToModal(${product.id})">
            <div class="product-card">
                <div class="product-image-container" style="height:250px;width:250px;border-radius:15px;display:flex;align-items:center;background:#EBEBEB">
                    <img src="${product.image}" class="product-image" width="250">
                </div>
                <p class="product-name">${product.title}</p>
                <p class="product-price">
                    ${product.price} so'm (1 qadoq)
                </p>
            </div>
        </div>
        `
    })
}
renderProducts();

function showToModal(id){
    const modal = document.querySelector(".modal");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const modalOverlay = document.querySelector(".modal-overlay");
    modal.classList.remove("show");
    modalWrapper.classList.remove("show");
    modalOverlay.classList.remove("show");
    const close = document.querySelector(".close-btn");
    function removeModal() {
        if (!modalOverlay.classList.contains("show")) {
            modal.classList.add("show");
            modalWrapper.classList.add("show");
            modalOverlay.classList.add("show");
            modal.innerHTML = ''
        }
    }
    modalOverlay.addEventListener("click", removeModal)
    close.addEventListener("click", removeModal)

    products.forEach((product) => {
        if (product.id == id) {
            modal.innerHTML += `
            <div>
                <div class="image-container" style="height: 400px; width: 400px; border-radius: 15px; display: flex; align-items: center; background: rgb(235, 235, 235) none repeat scroll 0% 0%;">
                    <img src="${product.image}" alt = "${product.title}"
                        class="product-detail-image"
                        style="background-color: rgb(235, 235, 235); transition: all 0s ease 0s;">
                </div>
                <div class="small-images-container">
                    <img src="${product.image}" class="small-image selected-image">
                    <img src="${product.image1}" class="small-image">
                    <img src="${product.image2}" class="small-image">
                    <img src="${product.image3}" class="small-image">
                </div>
            </div>
            <div class="product-detail-desc">
                <h1>${product.title}</h1>
                <h4>Ma'lumotlar: </h4>
                <p>${product.desc}</p>
                <p class="price">
                    ${product.price} so'm
                </p>
                
                <div class="buttons">
                    <button type="button" class="add-to-cart" onclick="addToCart(${product.id})">Hisobga qo'shish</button>
                    <a href="tel:+998911660567"><button type="button" class="buy-now">Buyurtma uchun</button></a>
                </div>
            </div>
            `;
        }
    })
    const mainImage = document.querySelector(".product-detail-image")

    const smallImages = document.querySelectorAll(".small-image")

    console.log(smallImages)

    smallImages[0].addEventListener("click", ()=>{
        mainImage.src = smallImages[0].src
        smallImages.forEach((item)=>{
            item.classList.remove("selected-image")
        })
        smallImages[0].classList.add("selected-image")
    })
    smallImages[1].addEventListener("click", ()=>{
        mainImage.src = smallImages[1].src
        smallImages.forEach((item)=>{
            item.classList.remove("selected-image")
        })
        smallImages[1].classList.add("selected-image")
    })
    smallImages[2].addEventListener("click", ()=>{
        mainImage.src = smallImages[2].src
        smallImages.forEach((item)=>{
            item.classList.remove("selected-image")
        })
        smallImages[2].classList.add("selected-image")
    })
    smallImages[3].addEventListener("click", ()=>{
        mainImage.src = smallImages[3].src
        smallImages.forEach((item)=>{
            item.classList.remove("selected-image")
        })
        smallImages[3].classList.add("selected-image")
    })

}


function addToCart(id){
    const addToCartButton = document.querySelector(".add-to-cart")
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus", id)
    } else{
        const item = products.find((product) => product.id === id)
        cart.push({
            ...item,
            numberOfUnits: 1,
        })
    }
    updateCart();
}

function updateCart(){
    renderCartItems();
    renderSubTotal();
}

function renderSubTotal(){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits
    })
    totalPriceEl.innerHTML = `${totalPrice} so'm`
    cartItemQuantity.innerHTML = `${totalItems}`
    cartHeading.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
    <span class="heading">Ortga qaytish </span>
    <span class="cart-run-items"> (${totalItems} qop o'yinchoq)</span>`
}

function renderCartItems() {
    productContainer.innerHTML = ''
    cart.forEach((element)=>{
        productContainer.innerHTML += `
            <div class="product">
                <div class="cart-image-container"><img
                        src="${element.image}"
                        class="cart-product-image"></div>
                <div class="item-desc">
                    <div class="flex top">
                        <h5>${element.title}</h5>
                        <h4>352800 so'm</h4>
                    </div>
                    <div class="flex bottom">
                        <div>
                            <p class="quantity-desc">
                                <span class="minus" onclick="changeNumberOfUnits('minus', ${element.id})">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
                                </span>
                                <span class="num">${element.numberOfUnits}</span>
                                <span class="plus" onclick="changeNumberOfUnits('plus', ${element.id})">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path> </svg>
                                </span>
                            </p>
                        </div>
                        <button type="button" class="remove-item" onclick="removeItemFromCart(${element.id})">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
}

function removeItemFromCart(id){
    cart = cart.filter((item)=>item.id !== id);
    updateCart();  
}
function changeNumberOfUnits(action, id){
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            }else if(action === "plus"){
                numberOfUnits++;
            }
        }
        return {
            ...item, 
            numberOfUnits
        }
    })

    updateCart();
}