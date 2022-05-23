const completeBtn = document.getElementById("complete-btn");
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
          cart.purge();
        }
        
      },

    purge : function () {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
    },

    add : function (id) {
        
        if (cart.items[id] == undefined) {
            cart.items[id] = 1;
        } else {
            cart.items[id]++;
        }
        cart.save();
    },

    minus : function (id) {
        cart.items[id]--;
        if (cart.items[id] <= 0) {
            delete cart.items[id];
        }
        cart.save();
    },
    
    list : function () {
        // RESET
        cartDiv.innerHTML = "";
        let empty = true;
        for (let key in cart.items) {
          if(cart.items.hasOwnProperty(key)) { empty = false; break; }
        }
    
        // CART IS EMPTY
        if (empty) {
          var item = document.createElement("div");
          item.innerHTML = "<h3>Your Cart is empty</h3><br><a href='/books-shop/pages/main/index.html'>Shop today's deals</a>";
          cartDiv.appendChild(item);
        }
    
        // CART IS NOT EMPTY
        else {
          let total = 0, subtotal = 0;

          // CLEAR BUTTON
          let clear = document.createElement("input");
          clear.type = "button";
          clear.value = "Clear shopping cart";
          clear.addEventListener("click", cart.nuke);
          clear.className = "c-empty cart";
          cartDiv.appendChild(clear);

          // LIST ITEMS
          fetch('/books-shop/pages/main/books.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < Object.keys(cart.items).length; i++) {
                var id = Object.keys(cart.items)[i];
                var idNum = parseInt(id.match(/\d+/));
                let itemDiv = document.createElement('div');
                itemDiv.className = "item";
                itemDiv.id = `p-${i}`;

                itemDiv.insertAdjacentHTML("beforeend", `<img class="cover" alt="cover" src=${data[idNum].imageLink}>`);
                var title = document.createElement('div');
                title.className = "title-author";
                title.insertAdjacentHTML("beforeend", `<h3 class="title">${data[idNum].title}</h3>`);
                title.insertAdjacentHTML("beforeend", `<h4 class="author">${data[idNum].author}</h4>`);
                itemDiv.append(title);
                itemDiv.insertAdjacentHTML("beforeend", `<h2 class="price">$${data[idNum].price}</h2>`);

                // QUANTITY

                // <div class="quantity">
 {/* <form>
   <div class="value-button" class="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
     <input type="number" class="number" value="1" />
   <div class="value-button" class="increase" onclick="increaseValue()" value="Increase Value">+</div>
 </form>
</div> */}
                var qtyDiv = document.createElement('div');
                qtyDiv.className = "quantity";

                var decDiv = document.createElement('div');
                decDiv.className = "value-btn decrease";
                decDiv.setAttribute("value", "Decrease Value");
                decDiv.innerHTML = "<p>-</p>";
                decDiv.addEventListener("click", decreaseValue, false);

                var qnty = document.createElement("input");
                qnty.type = "number";
                qnty.value = cart.items[id];
                qnty.dataset.id = id;
                qnty.className = "c-qty";
                qnty.addEventListener("change", cart.change);

                var incDiv = document.createElement('div');
                incDiv.className = "value-btn increase";
                incDiv.setAttribute("value", "Increase Value");
                incDiv.innerHTML = "<p>+</p>";
                incDiv.addEventListener("click", increaseValue, false);

                qtyDiv.append(decDiv);
                qtyDiv.append(qnty);
                qtyDiv.append(incDiv);
                itemDiv.appendChild( qtyDiv);
                
                // Increase Value // 
                function increaseValue() {
                    var value = parseInt(document.getElementsByClassName('c-qty')[i].value, 10);
                    value = isNaN(value) ? 1 : value;
                    value++;
                    document.getElementsByClassName('c-qty')[i].value = value;
                    var id = document.getElementsByClassName('c-qty')[i].dataset.id;
                    cart.add(id);
                    cart.list();
                }
                
                // Decrease Value // 
                function decreaseValue() {
                    var value = parseInt(document.getElementsByClassName('c-qty')[i].value, 10);
                    value = isNaN(value) ? 0 : value;
                    value < 1 ? value = 1 : '';
                    value--;
                    document.getElementsByClassName('c-qty')[i].value = value;
                    var id = document.getElementsByClassName('c-qty')[i].dataset.id;
                    cart.minus(id);
                    cart.list();
                }  
                

                // REMOVE
                var del = document.createElement("input");
                del.type = "button";
                del.value = "X";
                del.dataset.id = id;
                del.className = "c-del cart";
                del.addEventListener("click", cart.remove);
                itemDiv.appendChild(del);

                // SUBTOTAL
                subtotal = cart.items[id] * data[idNum].price;
                total += subtotal;

                cartDiv.appendChild(itemDiv);
            }

            let sumDiv = document.createElement('div');
            sumDiv.className = "total-sum";
            sumDiv.innerHTML = "<h3>Total (" + sumOfValues(cart.items) + " items): $" + total + "</h3>";

            cartDiv.appendChild(sumDiv);

            // CHECKOUT BUTTONS
            let check = document.createElement("button");
            check.type = "button";
            check.innerHTML = "Confirm order";
            check.addEventListener("click", cart.checkout);
            check.className = "c-checkout cart";
            cartDiv.appendChild(check);
        });
        }
      },
      // (F) CHANGE QUANTITY
    change : function () {
        if (this.value == 0) {
        delete cart.items[this.dataset.id];
        } else {
        cart.items[this.dataset.id] = this.value;
        }
        cart.save();
        cart.list();
    },
      remove : function () {
        delete cart.items[this.dataset.id];
        cart.save();
        cart.list();
    },
    checkout : function () {
        // AAPEAR ORDER FORM
        document.getElementsByClassName("order-form")[0].style.display = "block";
        document.getElementsByClassName("c-checkout")[0].style.display = "none";
        addEv();
      }

};

// let quantities = document.getElementsByClassName('quantity');
// console.log(quantities);
// for (let i=0; i<quantities.length; i++) {
//     let q = quantities[i];
//     let increaseElement = q.getElementsByClassName('increase')[0];
//     let decreaseElement = q.getElementsByClassName('decrease')[0];
//     increaseElement.addEventListener('click', increaseValue, false);
//     decreaseElement.addEventListener('click', decreaseValue, false);

//     function increaseValue() {
//       var value = parseInt(q.getElementsByClassName('c-qty')[0].value, 10);
//       value++;
//       q.getElementsByClassName('c-qty')[0].value = value;
//     }
//     function decreaseValue() {
//         var value = parseInt(q.getElementsByClassName('c-qty')[0].value, 10);
//         value--;
//         q.getElementsByClassName('c-qty')[0].value = value;
//       }
// }

function sumOfValues(obj) {
    var n = Object.values(obj).reduce(function (previous, current) {
        return previous + Number(current);
    }, 0);
    return n;
}

var today = new Date();
document.getElementById("t3").setAttribute("min", new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0]);

function ValidateGiftSelection(){  
    var checkboxes = document.getElementsByName("gift");  
    var numberOfCheckedItems = 0;  
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            numberOfCheckedItems++;  
    }  
    if(numberOfCheckedItems > 2)  
    {  
        alert("You can't select more than two gifts!");  
        event.preventDefault();
        return false;  
    } 
} 
document.getElementById("g1").addEventListener("click", ValidateGiftSelection); 
document.getElementById("g2").addEventListener("click", ValidateGiftSelection); 
document.getElementById("g3").addEventListener("click", ValidateGiftSelection); 
document.getElementById("g4").addEventListener("click", ValidateGiftSelection); 
document.getElementById("g5").addEventListener("click", ValidateGiftSelection); 

cart.load();

//header
let container = document.createElement('div');
container.className = "body-container";

let header = document.createElement('header');

let headerDiv = document.createElement('div');
headerDiv.className = "container header-container";

let logoDiv = document.createElement('div');
logoDiv.className = "logo";
logoDiv.insertAdjacentHTML("afterbegin", `<a href="/books-shop/pages/main/index.html"><img class="logo-img" src="/books-shop/assets/icons/bookworm.png" alt="bookworm-logo"></a>`);

let searchDiv = document.createElement('div');
searchDiv.className = "search-header";

let input = document.createElement('input');
input.id = "book-search";
input.setAttribute("type", "search");
input.setAttribute("name", "search");
input.setAttribute("placeholder", "Book or Author Name...");

let button = document.createElement('button');
button.className = "lens-search";
button.setAttribute("type", "submit");
button.innerHTML = "Search";

searchDiv.prepend(input);
searchDiv.append(button);

headerDiv.prepend(logoDiv);
headerDiv.append(searchDiv);

header.append(headerDiv);

container.prepend(header);

//main
let main = document.createElement('main');

let mainDiv = document.createElement('div');
mainDiv.className = "container main-container";

//title
let titleDiv = document.createElement('div');
titleDiv.className = "title-header";

let h2 = document.createElement('h2');
h2.innerHTML = `Shopping Cart`;

titleDiv.append(h2);
mainDiv.prepend(titleDiv);


//shopping cart content
let cartDiv = document.createElement('div');
cartDiv.className = "cart-items";
//fetch
cart.list();

mainDiv.append(cartDiv);

// ORDER FORM
let formDiv = document.createElement('div');
formDiv.className = "form-header";

var formHtml = document.querySelector('.order-form');

formDiv.appendChild(formHtml);
mainDiv.append(formDiv);

main.prepend(mainDiv);
container.append(main);



//footer
let footer = document.createElement('footer');

let footerDiv = document.createElement('div');
footerDiv.className = "container footer-container";

footerDiv.insertAdjacentHTML("afterbegin", `<p class="git-footer">@May 2022 <a href="https://github.com/AkulichNV">AkulichNV</a></p>`);
footerDiv.insertAdjacentHTML("beforeend", `<a href="https://rs.school/js-en/" target="_blank"><img class="img-footer" src="/books-shop/assets/icons/rs_school_js.png" alt="rsschool" ></a>`);
footer.append(footerDiv);
container.append(footer);


// function addToCart(id) {
//     var numId = parseInt(id.match(/\d+/));
//     cart.load();
//     cart.add(numId);
// }

function isValid() {
    let inputs = document.getElementsByClassName("detailsInput");

    for (let i=0; i< inputs.length; i++) {
        let elem = inputs[i];
        if (elem.validity.valid == false) {
            return false;
        }
    }
    return true;
}

const inputs = document.getElementsByClassName("detailsInput");

function addEv() {
    updateValue();
    for (let i=0; i< inputs.length; i++) {
        inputs[i].addEventListener('change', updateValue);
    }
}
addEv();

function updateValue(e) {
    completeBtn.disabled = !isValid();
}

function postAlert() {
    let inputs = document.getElementsByClassName("detailsInput");
    let arrData = [];
    for (let i=0; i< inputs.length; i++) {
        let elem = inputs[i];
        // console.log(elem);
        arrData.push(elem.value);
    }
    var post = `The order created!\nThe delivery will be carried out on ${arrData[2]} at the address of ${arrData[3]} street, house ${arrData[4]} flat ${arrData[5]}. Customer ${arrData[0]} ${arrData[1]}.\nHave a nice day!`

    if(confirm(post)) {
        cart.purge();
        window.location.replace("/books-shop/pages/main/index.html");
    }
    
}

completeBtn.addEventListener("click", postAlert); 

document.body.append(container);