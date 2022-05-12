let BooksData = [];
fetch('./books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data);
            BooksData = data.map(a => {return {...a}});
            console.log(BooksData);
        });

console.log(BooksData); // output 'testing'

let header = document.createElement('header');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');
let h1 = document.createElement('h1');
let input = document.createElement('input');
let button = document.createElement('button');
// let img = document.createElement('img');

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
    document.body.append(header);
    button.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/search.svg" alt="lens">`);
    div3.insertAdjacentHTML("beforeend", `<img src="/books-shop/assets/icons/shopping-cart.svg" alt="cart">`);
  
  
  
//  let input = `<input type="search" id="book-search">`;
//  let button = `<button class="lens-search"></button>`;

//   header.insertAdjacentHTML("beforeend", `<div class="search-header">
//     ${input}${button}
//   </div>`);
//   header.insertAdjacentHTML("beforeend", `<div class="bag-header">
//   </div>`);

//   div.className = "bag-header";
//   header.appendChild(div);