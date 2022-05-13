
let header = document.createElement('header');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');
let h1 = document.createElement('h1');
let input = document.createElement('input');
let button = document.createElement('button');

    div1.className = "container header-container";
    div2.className = "search-header";
    div3.className = "cart-header";

    h1.className = "title-header";
    h1.innerHTML = "Books Shop";

    input.id = "book-search";
    input.setAttribute("type", "search");
    input.setAttribute("name", "search");
    input.setAttribute("placeholder", "Search");

    button.className = "lens-search";
    button.setAttribute("type", "submit");
    
    div2.prepend(input);
    div2.append(button);
    div1.prepend(h1);
    div1.append(div2);
    div1.append(div3);
    header.prepend(div1);
    document.body.prepend(header);
    button.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/search.svg" alt="lens">`);
    div3.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/shopping-cart.svg" alt="cart">`);

// main block
    // sorting
let main = document.createElement('main');
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
    main.prepend(mainSection);
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