// ------PRODUCT FUNCTIONS------//

// FILTER CATEGORY
function filterCategory(cat){
    let sections = document.querySelectorAll(".category-section");
    sections.forEach(sec => {
        sec.style.display = (cat === "all" || sec.classList.contains(cat)) ? "block" : "none";
    });
    // Apply search after filter to hide unmatched products
    if(document.getElementById("searchInput")){
        document.getElementById("searchInput").dispatchEvent(new Event('input'));
    }
}

// ADD TO CART
function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.name === name);
    if(item){ 
        item.qty++; 
    } else { 
        cart.push({name, price, qty:1}); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(name + " added ✅");
}

// UPDATE CART COUNT
function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((sum,item) => sum + item.qty, 0);
    let cartCountEl = document.getElementById("cartCount");
    if(cartCountEl) cartCountEl.innerText = count;
}

// TOGGLE WISHLIST HEART
function toggleHeart(el){
    el.innerText = el.innerText === "♡" ? "❤️" : "♡";
}

// TOAST MESSAGE
function showToast(msg){
    let t = document.getElementById("toast");
    if(!t) return;
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(()=> t.style.display="none", 2000);
}

// SEARCH FUNCTION
let searchInput = document.getElementById("searchInput");
if(searchInput){
    searchInput.addEventListener("input", function(){
        let value = this.value.toLowerCase().trim();
        let products = document.querySelectorAll(".product");
        let found = false;

        products.forEach(p => {
            let nameEl = p.querySelector("h3") || p.querySelector("h4");
            if(!nameEl) return;
            let name = nameEl.innerText.toLowerCase();

            if(value === "" || name.includes(value)){
                p.style.display = "block";
                found = true;
            } else {
                p.style.display = "none";
            }
        });

        let noProducts = document.getElementById("noProducts");
        if(noProducts){
            noProducts.style.display = found ? "none" : "block";
        }
    });
}

// ------CONTACT FORM VALIDATION------//
let contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let message = document.getElementById("message");
        let msg = document.getElementById("formMsg");

        // Reset previous borders and message
        name.style.border = "";
        email.style.border = "";
        message.style.border = "";
        msg.innerText = "";

        let hasError = false;

        // Check empty fields
        if(name.value.trim() === ""){
            name.style.border = "2px solid red";
            hasError = true;
        }
        if(email.value.trim() === ""){
            email.style.border = "2px solid red";
            hasError = true;
        }
        if(message.value.trim() === ""){
            message.style.border = "2px solid red";
            hasError = true;
        }

        if(hasError){
            msg.innerText = "All fields should be filled";
            msg.style.color = "red";
            return;
        }

        // Validate email
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!email.value.match(emailPattern)){
            msg.innerText = "Enter valid email";
            msg.style.color = "red";
            email.style.border = "2px solid red";
            return;
        }

        // Success
        msg.innerText = "Sent Successfully";
        msg.style.color = "green";
        contactForm.reset();

        // Toast
        showToast("Message Sent Successfully ✅");
    });
}

// INITIALIZE CART COUNT
updateCartCount();