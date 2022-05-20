
let container = document.createElement('div');

let header = document.createElement('header');
let div1 = document.createElement('div');
let navDiv = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');
let logoDiv = document.createElement('div');
// let h1 = document.createElement('h1');
let input = document.createElement('input');
let button = document.createElement('button');

    div1.className = "container header-container";
    navDiv.className = "menu-header";
    div2.className = "search-header";
    div3.className = "cart-header";
    logoDiv.className = "logo";

    // h1.className = "title-header";
    // h1.innerHTML = `JSworm \<br> Collection`;
    logoDiv.insertAdjacentHTML("afterbegin", `<img class="logo-img" src="/books-shop/assets/images/bookworm.png" alt="bookworm-logo">`);

    input.id = "book-search";
    input.setAttribute("type", "search");
    input.setAttribute("name", "search");
    input.setAttribute("placeholder", "Book or Author Name...");

    button.className = "lens-search";
    button.setAttribute("type", "submit");
    button.innerHTML = "Search"
    
    div2.prepend(input);
    div2.append(button);
    div1.prepend(logoDiv)
    // logoDiv.append(h1);
    div1.append(navDiv);
    // navDiv.append(div2);
    navDiv.append(div3);
    header.prepend(div1);
    container.prepend(header);
    // button.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/search.svg" alt="lens">`);
    div3.insertAdjacentHTML("beforeend", `<a href= "/books-shop/pages/cart/index.html"><img class="cart-header-img" src="/books-shop/assets/icons/shopping-cart.png" alt="cart"></a>`);

// main block
    // home
let main = document.createElement('main');
let homeSection = document.createElement('section');
let homeDiv = document.createElement('div');
let quoteDiv = document.createElement('div');
let h1 = document.createElement('h1');
let girlDiv = document.createElement('div');

homeSection.className = "home-section";
homeDiv.className = "container home-container";
quoteDiv.className = "quote-content";
h1.className = "title-header";
h1.innerHTML = `JSworm Collection`;
girlDiv.className = "girl-img";

girlDiv.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/images/girl-on-books.png" alt="girl-on-books">`);
quoteDiv.prepend(h1);
quoteDiv.insertAdjacentHTML("beforeend", `<p>“Good architecture is necessary to give programs enough structure to be able to grow large without collapsing into a puddle of confusion.”</p>`);
quoteDiv.insertAdjacentHTML("beforeend", `<figcaption>&mdash; Douglas Crockford</figcaption>`);
homeDiv.prepend(quoteDiv);
homeDiv.append(girlDiv);
homeSection.append(div2);
homeSection.prepend(homeDiv);
main.prepend(homeSection);
container.append(main);


    // sorting

let mainSection = document.createElement('section');
// let sortingDiv = document.createElement('div');
// var sortArr = ["A-z", "Price", "Popular"];
       
mainSection.className = "container main-container";
// sortingDiv.className = "sort-main";

// for (let i = 0; i < sortArr.length; i++) {
//     let sortLink = document.createElement('a');
//     sortLink.className = "sort-item";
//     sortLink.setAttribute("href", "#");
//     sortLink.setAttribute("data-value", sortArr[i]);
//     sortingDiv.appendChild(sortLink);
//     sortLink.innerHTML=sortLink.innerHTML + sortArr[i];
// }
//     sortingDiv.insertAdjacentHTML("afterbegin", `<span><strong>Sort by:</strong></span>`);
//     mainSection.prepend(sortingDiv);
    main.append(mainSection);
    

    // catalog
let catalogDiv = document.createElement('div');
catalogDiv.className = "catalog-items";
// localStorage.removeItem("cart");
var cart = {
    items : {}, // Current items in cart

    save : function () {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
    load : function () {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },

    nuke : function () {
        if (confirm("Empty cart?")) {
          cart.items = {};
          localStorage.removeItem("cart");
        }
      },

    add : function (id) {
        
        if (cart.items[id] == undefined) {
            cart.items[id] = 1;
        } else {
            cart.items[id]++;
        }
        cart.save();
        
        console.log(id);
        console.log(this.items);
    }
};
cart.nuke();

fetch('./books.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].imageLink);
                let itemDiv = document.createElement('div');
                itemDiv.className = "item";
                itemDiv.id = `i-${i}`;
                // itemDiv.setAttribute("onclick", showmodal(i));
                // document.getElementById(`i-${i}`).onclick = showmodal(i);
                itemDiv.insertAdjacentHTML("beforeend", `<div id=link-${i} class="show-more"><img class="img-eye" src="/books-shop/assets/icons/eye2.png" alt="show more"></div>`);
                itemDiv.insertAdjacentHTML("beforeend", `<img class="cover" alt="cover" src=${data[i].imageLink}>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h3 class="title">${data[i].title}</h3>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h4 class="author">${data[i].author}</h4>`);
                let priceCart = document.createElement('div');
                priceCart.className = "price-cart-item";
                priceCart.insertAdjacentHTML("afterbegin", `<h2 class="price">$${data[i].price}</h2>`);
                // let showButton = document.createElement('button');
                // showButton.className = "show-more";
                // showButton.innerHTML = "Show more";
                let cartButton = document.createElement('button');
                cartButton.className = "add-to-cart";
                cartButton.innerHTML = "Add";
                // priceCart.append(showButton);
                priceCart.append(cartButton);
                itemDiv.append(priceCart);
                catalogDiv.appendChild(itemDiv);

                document.getElementById(`link-${i}`).addEventListener("click", showmodal);

                let cardDiv = document.createElement('div');
                    cardDiv.className = "card";
                    cardDiv.insertAdjacentHTML("afterbegin", `<img class="cover-card" alt="cover" src=${data[i].imageLink}>`);
                let contentDiv = document.createElement('div');
                    contentDiv.className = "card-content";
                    contentDiv.insertAdjacentHTML("beforeend", `<h3 class="title-card">${data[i].title}</h3>`);
                    contentDiv.insertAdjacentHTML("beforeend", `<h4 class="author-card">${data[i].author}</h4>`);
                    let priceCart2 = document.createElement('div');
                priceCart2.className = "price-cart-item price-cart-item-card";
                priceCart2.insertAdjacentHTML("afterbegin", `<h2 class="price">$${data[i].price}</h2>`);
                let cartButton2 = document.createElement('button');
                cartButton2.className = "add-to-cart";
                cartButton2.innerHTML = "Add to Cart";
                document.getElementById(`i-${i}`).getElementsByClassName('add-to-cart')[0].addEventListener("click", addToCart);

                priceCart2.append(cartButton2);

                    contentDiv.append(priceCart2);
                cardDiv.append(contentDiv);
                let popupDiv = document.createElement('div');
                    popupDiv.id = `pop-${i}`;
                    popupDiv.className = "modal";
                    // popupDiv.insertAdjacentHTML("afterbegin", `<h2 class="description">${data[i].title}</h2>`);
                    popupDiv.insertAdjacentHTML("beforeend", `<h3 class="description-card">${data[i].description}</h3>`);
                    // popupDiv.insertAdjacentHTML("beforeend", `<button class="close">Close</button>`);
                    itemDiv.append(popupDiv);
                let close = document.createElement("span");
                    close.className = "modal-js-close";
                    close.id = `${i}`;
                    close.innerHTML = "x";

                popupDiv.prepend(cardDiv);
                popupDiv.append(close);
                

                
                
            }
        });

// function modal(id) {
//     console.log('on ' + id)
//     let el = document.getElementById(id);  // can also use a query selector
//     let body = document.querySelector("body");
//     let bg = document.createElement("div");
//     bg.className = "modal-js-overlay";
    
//     // body.appendChild(bg);
// }

// function modaloff(id) {
//     let body = document.querySelector("body");
//     let el = document.querySelector(id);
//     let overlay = body.querySelector(".modal-js-overlay");
//     console.log('off ' + id)
//     // el.classList.remove('on');
//     // body.removeChild(overlay);
// }

function modalOnOff(id) {
    var numId = parseInt(id.match(/\d+/));
    var popId = "pop-" + numId; // i-1 ==> pop-1
    let popEl = document.getElementById(popId);
    popEl.classList.add("on");
    let body = document.querySelector("body");
    let close = popEl.querySelector(".modal-js-close");
    // let overlay = body.querySelector(".modal-js-overlay");
    let bg = document.createElement("div");
    bg.className = "modal-js-overlay";
    console.log(close);
    // bg.innerHTML = popId;
    body.appendChild(bg);
    bg.addEventListener("click", (e) => { 
        body.removeChild(bg);
        popEl.classList.remove('on');
    });
    close.addEventListener('click', (e) => {
        // let overlay = body.querySelector(".modal-js-overlay");
        // let closebtn = parent.querySelector(".modal-js-close");
        
        popEl.classList.remove('on');
        body.removeChild(bg);
        

       
        // popEl.removeChild(closebtn);
        
    });
}

function showmodal()  {
    modalOnOff(this.id);
}

function addToCart() {
    var idEl = this.parentElement.parentElement.id;
    var numId = parseInt(idEl.match(/\d+/));
    cart.load();
    cart.add(idEl);
    // var cart = localStorage.getItem("cart");
    // console.log(crt);
    // var cart = [];
    
    // cart.push(numId);
    // localStorage.setItem("cart", cart);
    

    // console.log(cart);
}

mainSection.append(catalogDiv);




// footer
let footer = document.createElement('footer');
let footerSection = document.createElement('section');
// let gitDiv = document.createElement('div');
// let rssDiv = document.createElement('div');

footerSection.className = "container footer-container";
// gitDiv.className = "footer-data";
// rssDiv.className = "footer-rss";

footerSection.insertAdjacentHTML("afterbegin", `<p class="git-footer">@May 2022 <a href="https://github.com/AkulichNV">AkulichNV</a></p>`);
footerSection.insertAdjacentHTML("beforeend", `<a href="https://rs.school/js-en/" target="_blank"><img class="img-footer" src="/books-shop/assets/icons/rs_school_js.png" alt="rsschool" ></a>`);
footer.append(footerSection);
container.append(footer);

document.body.append(container);