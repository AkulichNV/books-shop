
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
    document.body.prepend(header);
    // button.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/search.svg" alt="lens">`);
    div3.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/shopping-cart.svg" alt="cart">`);

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
quoteDiv.insertAdjacentHTML("beforeend", `<blockquote>“Good architecture is necessary to give programs enough structure to be able to grow large without collapsing into a puddle of confusion.”</blockquote>`);
quoteDiv.insertAdjacentHTML("beforeend", `<figcaption>&mdash; Douglas Crockford</figcaption>`);
homeDiv.prepend(quoteDiv);
homeDiv.append(girlDiv);
homeSection.append(div2);
homeSection.prepend(homeDiv);
main.prepend(homeSection);


    // sorting

let mainSection = document.createElement('section');
let sortingDiv = document.createElement('div');
var sortArr = ["A-z", "Price", "Popular"];
       
mainSection.className = "container main-container";
sortingDiv.className = "sort-main";

for (let i = 0; i < sortArr.length; i++) {
    let sortLink = document.createElement('a');
    sortLink.className = "sort-item";
    sortLink.setAttribute("href", "#");
    sortLink.setAttribute("data-value", sortArr[i]);
    sortingDiv.appendChild(sortLink);
    sortLink.innerHTML=sortLink.innerHTML + sortArr[i];
}
    sortingDiv.insertAdjacentHTML("afterbegin", `<span><strong>Sort by:</strong></span>`);
    mainSection.prepend(sortingDiv);
    main.append(mainSection);
    document.body.append(main);

    // catalog
let catalogDiv = document.createElement('div');
catalogDiv.className = "catalog-items";

fetch('./books.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].imageLink);
                let itemDiv = document.createElement('div');
                itemDiv.className = "item";
                itemDiv.id = `i-${i}`;
                itemDiv.insertAdjacentHTML("beforeend", `<img class="cover" alt="cover" src=${data[i].imageLink}>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h3 class="title">${data[i].title}</h3>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h4 class="author">${data[i].author}</h4>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h2 class="price">${data[i].price}$</h2>`);
                let cartButton = document.createElement('button');
                cartButton.className = "to-cart";
                itemDiv.append(cartButton);
                catalogDiv.appendChild(itemDiv);
            }
        });

mainSection.append(catalogDiv);


// footer
let footer = document.createElement('footer');
let footerSection = document.createElement('section');
// let gitDiv = document.createElement('div');
// let rssDiv = document.createElement('div');

footerSection.className = "container main-container";
// gitDiv.className = "footer-data";
// rssDiv.className = "footer-rss";

footerSection.insertAdjacentHTML("afterbegin", `<p class="git-footer">@May 2022 <a href="https://github.com/AkulichNV">AkulichNV</a></p>`);
footerSection.insertAdjacentHTML("beforeend", `<a href="https://rs.school/js-en/" target="_blank"><img class="img-footer" src="https://rs.school/images/rs_school_js.svg" alt="rsschool" ></a>`);
footer.append(footerSection);
document.body.append(footer);