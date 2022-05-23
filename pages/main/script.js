
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

    logoDiv.insertAdjacentHTML("afterbegin", `<a href="#"><img class="logo-img" src="/books-shop/assets/icons/bookworm.png" alt="bookworm-logo"></a>`);

    input.id = "book-search";
    input.setAttribute("type", "search");
    input.setAttribute("name", "search");
    input.setAttribute("placeholder", "Will be up and running soon...");

    button.className = "lens-search";
    button.setAttribute("type", "submit");
    button.innerHTML = "Search"
    
    div2.prepend(input);
    div2.append(button);
    div1.prepend(logoDiv)
    div1.append(navDiv);
    navDiv.append(div3);
    header.prepend(div1);
    container.prepend(header);
    div3.insertAdjacentHTML("beforeend", `<a href= "/books-shop/pages/cart/index.html"><div class="widget"><p id="itm-cnt">0</p></div><img class="cart-header-img" ondragover="Window.allowDrop(event)" ondrop="Window.drop(event)" id="cart-img" src="/books-shop/assets/icons/shopping-cart.png" alt="cart"></a>`);

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
 
    function hasClass(str, search) {
        return !!(str.search('\\b' +  search + '\\b') + 1);
    }
    

Window.drag = function(ev) {
        ev.dataTransfer.setData("id", ev.target.id);
}
Window.allowDrop = function(ev) {
    ev.preventDefault();
  }
  
  Window.drop = function(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("id");
    var elem = document.getElementById(id);
    if (!elem) {
        return;
    }
    if (elem.className === 'cover') {
        addToCart(id);
    }
  }

    // catalog
let catalogDiv = document.createElement('div');
catalogDiv.className = "catalog-items";

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

        document.getElementById("itm-cnt").textContent = cart.count();

    },
    
    count : function () {
        var n = Object.values(cart.items).reduce(function (previous, current) {
            return previous + Number(current);
        }, 0);
        return n;
    }
};

fetch('./books.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                
                let itemDiv = document.createElement('div');
                itemDiv.className = "item";
                itemDiv.id = `i-${i}`;
                
                itemDiv.insertAdjacentHTML("beforeend", `<div id=link-${i} class="show-more"><img class="img-eye" src="/books-shop/assets/icons/eye2.png" alt="show more"></div>`);
                itemDiv.insertAdjacentHTML("beforeend", `<img id=img-${i} draggable="true" ondragstart="Window.drag(event)" class="cover" alt="cover" src=${data[i].imageLink}>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h3 class="title">${data[i].title}</h3>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h4 class="author">${data[i].author}</h4>`);
                let priceCart = document.createElement('div');
                priceCart.className = "price-cart-item";
                priceCart.insertAdjacentHTML("afterbegin", `<h2 class="price">$${data[i].price}</h2>`);
                
                let cartButton = document.createElement('button');
                cartButton.className = "add-to-cart";
                cartButton.innerHTML = "Add";
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
                document.getElementById(`i-${i}`).getElementsByClassName('add-to-cart')[0].addEventListener("click", addToCartListener);

                priceCart2.append(cartButton2);

                    contentDiv.append(priceCart2);
                cardDiv.append(contentDiv);
                let popupDiv = document.createElement('div');
                    popupDiv.id = `pop-${i}`;
                    popupDiv.className = "modal";
                    
                    popupDiv.insertAdjacentHTML("beforeend", `<h3 class="description-card">${data[i].description}</h3>`);
                    itemDiv.append(popupDiv);
                let close = document.createElement("span");
                    close.className = "modal-js-close";
                    close.id = `${i}`;
                    close.innerHTML = "x";

                popupDiv.prepend(cardDiv);
                popupDiv.append(close);
                

                
                
            }
        });


function modalOnOff(id) {
    var numId = parseInt(id.match(/\d+/));
    var popId = "pop-" + numId; // i-1 ==> pop-1
    let popEl = document.getElementById(popId);
    popEl.classList.add("on");
    let body = document.querySelector("body");
    let close = popEl.querySelector(".modal-js-close");
    let bg = document.createElement("div");
    bg.className = "modal-js-overlay";
    console.log(close);
    body.appendChild(bg);
    bg.addEventListener("click", (e) => { 
        body.removeChild(bg);
        popEl.classList.remove('on');
    });
    close.addEventListener('click', (e) => {
        
        popEl.classList.remove('on');
        body.removeChild(bg);
        
    });
}

function showmodal()  {
    modalOnOff(this.id);
}

function addToCartListener() {
    var idEl = this.parentElement.parentElement.id;
    addToCart(idEl);
}

function addToCart(id) {
    var numId = parseInt(id.match(/\d+/));
    cart.load();
    cart.add(numId);
}


mainSection.append(catalogDiv);




// footer
let footer = document.createElement('footer');
let footerSection = document.createElement('section');

footerSection.className = "container footer-container";

footerSection.insertAdjacentHTML("afterbegin", `<p class="git-footer">@May 2022 <a href="https://github.com/AkulichNV">AkulichNV</a></p>`);
footerSection.insertAdjacentHTML("beforeend", `<a href="https://rs.school/js-en/" target="_blank"><img class="img-footer" src="/books-shop/assets/icons/rs_school_js.png" alt="rsschool" ></a>`);
footer.append(footerSection);
container.append(footer);

document.body.append(container);

//refactor!!
cart.load();
document.getElementById("itm-cnt").textContent = cart.count();

// var search = document.getElementsByClassName("lens-search")[0].addEventListener('click', searchBook);

// function searchBook(e)  {
//     var searchText = document.getElementById("book-search").value;
//     var titles = document.getElementsByClassName("title");
//     var author = 
//     console.log(titles[0].textContent);
// }

// var booksTitle = document.getElementsByClassName('title');

// console.log(booksTitle);
// var booksAuthor = document.getElementsByClassName("author");