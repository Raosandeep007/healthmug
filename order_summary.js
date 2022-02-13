var cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

function popup() {

    if (cart.length != 0)
        shopping_cart(cart);
    else {
        document.querySelector("#shopping_cart>tbody").innerHTML = "<tr><td colspan='5' id='add_to_cart'><img src='https://static.oxinis.com/healthmug/image/healthmug/cart.jpg' alt='shopping cart'><br><h2>Your Cart is Empty</h2><h3 class='add_some_stuff'>Add Some Stuff</h3><button class='cart_button_color' onclick='cart_close()'><h3>Continue Shopping</h3></button></td></tr>";
        document.getElementById("cart_total_table").style.display = "none";
    }
}


if (cart.length != 0)
    shopping_cart(cart);
else {
    document.querySelector("#shopping_cart>tbody").innerHTML = "<tr><td colspan='5' id='add_to_cart'><img src='https://static.oxinis.com/healthmug/image/healthmug/cart.jpg' alt='shopping cart'><br><h2>Your Cart is Empty</h2><h3 class='add_some_stuff'>Add Some Stuff</h3><button class='cart_button_color' onclick='cart_close()'><h3>Continue Shopping</h3></button></td></tr>";
    document.getElementById("cart_total_table").style.display = "none";
}

function shopping_cart(cart) {
    document.querySelector("#shopping_cart>tbody").innerHTML = "";
    cart.map(shopping_health);
    function shopping_health(item, index) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.textContent = item.title;

        var td2 = document.createElement("td");
        var select = document.createElement("select");
        var option = document.createElement("option");
        var sel = "";
        for (var i = 1; i <= 10; i++) {
            sel = sel + "<option value='" + i + "'>" + i + "</option>";
        }
        select.innerHTML = sel;
        select.onchange = function () {
            sub_total_fun(index);
        }
        select.setAttribute("id", "cart_select" + index);
        td2.append(select);

        var td3 = document.createElement("td");
        td3.textContent = item.offprice;


        var td5 = document.createElement("td");
        td5.textContent = item.offprice;
        var p_close = document.createElement("p");
        p_close.innerHTML = "<i class='fas fa-times'></i>";
        p_close.addEventListener("click", function () {
            cart_delete_object(index);
        });
        p_close.style.display = "inline";
        p_close.style.marginLeft = "20px"
        td5.append(p_close);
        td5.setAttribute("id", "cart_sub_total" + index);
        tr.append(td1, td2, td3, td5);
        document.querySelector("#shopping_cart>tbody").append(tr);
        cart[index]["no_selected"] = 1;
    }

    var total = 0;

    for (i = 0; i < cart.length; i++) {
        total = total + (+(cart[i].offprice)) * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent = total >= 500 ? total : total + 50;;

    document.getElementById("cart_total_table").style.display = "flex";
    // document.getElementById("add_more").textContent = "(" + cart.length + " items)";
    // localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
}

function sub_total_fun(index) {
    cart[index].no_selected = +(document.getElementById("cart_select" + index).value);
    localStorage.setItem("cart", JSON.stringify(cart));
    var sub_total = (+(cart[index].offprice)) * (+(document.getElementById("cart_select" + index).value));
    document.getElementById("cart_sub_total" + index).textContent = sub_total;
    var p_close = document.createElement("p");
    p_close.innerHTML = "<i class='fas fa-times'></i>";
    p_close.addEventListener("click", function () {
        cart_delete_object(index);
    });
    p_close.style.display = "inline";
    p_close.style.marginLeft = "20px"
    document.getElementById("cart_sub_total" + index).append(p_close);

    var total = 0;

    for (i = 0; i < cart.length; i++) {
        total = total + (+(cart[i].offprice)) * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent = total >= 500 ? total : total + 50;;
}

function cart_close() {
    shopping.style.display = "";
    document.getElementById("blur_background").style.display = "none";
}

function cart_delete_object(index) {
    console.log("here");
    var new_cart = [];
    for (var i = 0; i < cart.length; i++) {
        if (i != index)
            new_cart.push(cart[i]);
    }
    cart = new_cart;
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    popup();
}