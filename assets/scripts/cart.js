export var cart = {
    items : {}, // Current items in cart
    // init : function () {
    //     let cartDiv = document.createElement('div');
    //     cartDiv.className = "cart-items";
    //     return cartDiv;
    // },
    
    cartDiv :  document.createElement('div').className = "cart-items",

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
        
        console.log(id);
        console.log(this.items);
    },
    list : function (cartDiv) {
        cartDiv.innerHTML = "";
        let empty = true;
        for (let key in cart.items) {
          if(cart.items.hasOwnProperty(key)) { empty = false; break; }
        }
    
        // (D2) CART IS EMPTY
        if (empty) {
          var item = document.createElement("div");
          item.innerHTML = "<h3>Your Cart is empty</h3><br><a href='/books-shop/pages/main/index.html'>Shop today's deals</a>";
          cartDiv.appendChild(item);
        }
    
        // (D3) CART IS NOT EMPTY
        else {
          let total = 0, subtotal = 0;

          // CLEAR BUTTON
          let clear = document.createElement("input");
          clear.type = "button";
          clear.value = "Clear your shopping cart";
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
                itemDiv.insertAdjacentHTML("beforeend", `<h3 class="title">${data[idNum].title}</h3>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h4 class="author">${data[idNum].author}</h4>`);
                itemDiv.insertAdjacentHTML("beforeend", `<h2 class="price">$${data[idNum].price}</h2>`);

                // QUANTITY
                var qnty = document.createElement("input");
                qnty.type = "number";
                qnty.value = cart.items[id];
                qnty.dataset.id = id;
                qnty.className = "c-qty";
                qnty.addEventListener("change", cart.change);
                itemDiv.appendChild( qnty);

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
            sumDiv.innerHTML = "<h3>Total (" + cart.count(cart.items) + " items): $" + total + "</h3>";

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
        document.getElementsByClassName("order-form")[0].style.display = "block";
        document.getElementsByClassName("c-checkout")[0].style.display = "none";
        addEv();
      },
    count : function (obj) {
        var n = Object.values(obj).reduce(function (previous, current) {
            return previous + Number(current);
        }, 0);
        return n;
    }
};