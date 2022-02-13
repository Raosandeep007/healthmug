// =======================================================================================================================
// THIS IS NAV BAR FUNCTIONS MADE BY "ADITYA"

{
  var navbar = document.getElementsByClassName("navigation")[0];

  // for fixing scroll of nav bar
  window.onscroll = function () {
    //pageoffset or scroll
    if (window.pageYOffset > 250) {
      {
        navbar.classList.add("scrolled");
        document.getElementsByClassName("navigation_bottom")[0].style.display =
          "none";
      }
    } else {
      navbar.classList.remove("scrolled");
      document.getElementsByClassName("navigation_bottom")[0].style.display =
        "flex";
    }
  };

  //search function

  document.getElementById("searchnav").addEventListener("submit", search);
  //getting data from local storage

  function search(e) {
    e.preventDefault();
    var ser = document.getElementById("searchnav");

    var inputVal = ser.search_input.value;
    var items = [];
    for (var i = 0; i < products.length; i++) {
      var procheck = products[i].title.toLowerCase();
      if (procheck.includes(inputVal)) {
        items.push(products[i]);
      }
    }
    displayitem(items);
  }

  //cart

  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  button = document
    .getElementById("side_cart")
    .addEventListener("click", popup);
  document.getElementById("side_cart").addEventListener("click", blur_on);

  function blur_on() {
    document.getElementById("blur_background").style.display = "inline";
  }

  function popup() {
    var shopping = document.getElementById("shopping");
    shopping.style.display = "flex";

    if (cart.length != 0) shopping_cart(cart);
    else {
      document.querySelector("#shopping_cart>tbody").innerHTML =
        "<tr><td colspan='5' id='add_to_cart'><img src='https://static.oxinis.com/healthmug/image/healthmug/cart.jpg' alt='shopping cart'><br><h2>Your Cart is Empty</h2><h3 class='add_some_stuff'>Add Some Stuff</h3><button class='cart_button_color' onclick='cart_close()'><h3>Continue Shopping</h3></button></td></tr>";
      document.getElementById("cart_total_table").style.display = "none";
      document.querySelector(".bottom_shopping_cart_button").style.display =
        "none";
    }
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
      };
      select.setAttribute("id", "cart_select" + index);
      td2.append(select);

      var td3 = document.createElement("td");
      td3.textContent = item.offprice;

      var td4 = document.createElement("td");
      //add address of user from local storage
      // td4.textContent=

      var td5 = document.createElement("td");
      td5.textContent = item.offprice;
      var p_close = document.createElement("p");
      p_close.innerHTML = "<i class='fas fa-times'></i>";
      p_close.addEventListener("click", function () {
        cart_delete_object(index);
      });
      p_close.style.display = "inline";
      p_close.style.marginLeft = "20px";
      td5.append(p_close);
      td5.setAttribute("id", "cart_sub_total" + index);
      tr.append(td1, td2, td3, td4, td5);
      document.querySelector("#shopping_cart>tbody").append(tr);
      cart[index]["no_selected"] = 1;
    }
    document.querySelector(".bottom_shopping_cart_button").style.display =
      "flex";
    var total = 0;

    for (i = 0; i < cart.length; i++) {
      total = total + +cart[i].offprice * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent =
      total >= 500 ? total : total + 50;

    document.getElementById("cart_total_table").style.display = "flex";
    document.getElementById("add_more").textContent =
      "(" + cart.length + " items)";
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }

  function sub_total_fun(index) {
    cart[index].no_selected = +document.getElementById("cart_select" + index)
      .value;
    localStorage.setItem("cart", JSON.stringify(cart));
    var sub_total =
      +cart[index].offprice *
      +document.getElementById("cart_select" + index).value;
    document.getElementById("cart_sub_total" + index).textContent = sub_total;
    var p_close = document.createElement("p");
    p_close.innerHTML = "<i class='fas fa-times'></i>";
    p_close.addEventListener("click", function () {
      cart_delete_object(index);
    });
    p_close.style.display = "inline";
    p_close.style.marginLeft = "20px";
    document.getElementById("cart_sub_total" + index).append(p_close);

    var total = 0;

    for (i = 0; i < cart.length; i++) {
      total = total + +cart[i].offprice * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent =
      total >= 500 ? total : total + 50;
  }

  function cart_close() {
    shopping.style.display = "";
    document.getElementById("blur_background").style.display = "none";
  }

  function cart_delete_object(index) {
    console.log("here");
    var new_cart = [];
    for (var i = 0; i < cart.length; i++) {
      if (i != index) new_cart.push(cart[i]);
    }
    cart = new_cart;
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    popup();
  }

  function healthmug_home() {
    window.location.assign("/homepage/homepage.html");
  }

  //popup new window
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  function specific(index) {
    console.log("here");
    document.getElementById("fildiv").style.display = "none"; //display off
    document.getElementById("productdiv").style.display = "none";
    document.getElementById("popup_main").style.display = "flex";
    document.querySelector("#image_prod>img").src = products[index].src;
    document.querySelector("#prod_details>h2").textContent =
      products[index].title;
    document.querySelector("#prod_details>h3").textContent =
      products[index].tagLine;
    document.querySelector("#real_price").textContent = products[index].price;
    document.querySelectorAll("#prod_details>h2")[1].textContent =
      products[index].offprice;
    document
      .getElementById("add_to_cart_shopping")
      .addEventListener("click", function () {
        cart.push(products[index]);
        blur_on();
        popup();
      });
    console.log(document.querySelector("#prod_details>button"));
    document
      .querySelector("#prod_details>button")
      .addEventListener("click", function () {
        console.log("here");
        buy_now(index);
      });
  }

  function buy_now(index) {
    console.log("here");
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.assign("checkOut.html");
  }
}

//=============================================================================================
//THIS IS COUNTACT US UNCTION
//MADE BY SIANANDAM

function contactusfun() {
  var data = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    mobile: document.getElementById("contactMobile").value,
    radio1: document.getElementById("contactRadio1").value,
    radio2: document.getElementById("contactRadio2").value,
    message: document.getElementById("messageBox").value,
  };
  var arr = JSON.parse(localStorage.getItem("contact")) || [];
  arr.push(data);
  localStorage.setItem("contact", JSON.stringify(arr));
  console.log(arr);
}


// =======================================================================================================================
// THIS IS NAV BAR FUNCTIONS MADE BY "ADITYA"

{
  var navbar = document.getElementsByClassName("navigation")[0];

  // for fixing scroll of nav bar
  window.onscroll = function () {
    //pageoffset or scroll
    if (window.pageYOffset > 250) {
      {
        navbar.classList.add("scrolled");
        document.getElementsByClassName("navigation_bottom")[0].style.display =
          "none";
      }
    } else {
      navbar.classList.remove("scrolled");
      document.getElementsByClassName("navigation_bottom")[0].style.display =
        "flex";
    }
  };

  //search function

  document.getElementById("searchnav").addEventListener("submit", search);
  //getting data from local storage

  function search(e) {
    e.preventDefault();
    var ser = document.getElementById("searchnav");

    var inputVal = ser.search_input.value;
    var items = [];
    for (var i = 0; i < products.length; i++) {
      var procheck = products[i].title.toLowerCase();
      if (procheck.includes(inputVal)) {
        items.push(products[i]);
      }
    }
    displayitem(items);
  }

  //cart

  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  button = document
    .getElementById("side_cart")
    .addEventListener("click", popup);
  document.getElementById("side_cart").addEventListener("click", blur_on);

  function blur_on() {
    document.getElementById("blur_background").style.display = "inline";
  }

  function popup() {
    var shopping = document.getElementById("shopping");
    shopping.style.display = "flex";

    if (cart.length != 0) shopping_cart(cart);
    else {
      document.querySelector("#shopping_cart>tbody").innerHTML =
        "<tr><td colspan='5' id='add_to_cart'><img src='https://static.oxinis.com/healthmug/image/healthmug/cart.jpg' alt='shopping cart'><br><h2>Your Cart is Empty</h2><h3 class='add_some_stuff'>Add Some Stuff</h3><button class='cart_button_color' onclick='cart_close()'><h3>Continue Shopping</h3></button></td></tr>";
      document.getElementById("cart_total_table").style.display = "none";
      document.querySelector(".bottom_shopping_cart_button").style.display =
        "none";
    }
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
      };
      select.setAttribute("id", "cart_select" + index);
      td2.append(select);

      var td3 = document.createElement("td");
      td3.textContent = item.offprice;

      var td4 = document.createElement("td");
      //add address of user from local storage
      // td4.textContent=

      var td5 = document.createElement("td");
      td5.textContent = item.offprice;
      var p_close = document.createElement("p");
      p_close.innerHTML = "<i class='fas fa-times'></i>";
      p_close.addEventListener("click", function () {
        cart_delete_object(index);
      });
      p_close.style.display = "inline";
      p_close.style.marginLeft = "20px";
      td5.append(p_close);
      td5.setAttribute("id", "cart_sub_total" + index);
      tr.append(td1, td2, td3, td4, td5);
      document.querySelector("#shopping_cart>tbody").append(tr);
      cart[index]["no_selected"] = 1;
    }
    document.querySelector(".bottom_shopping_cart_button").style.display =
      "flex";
    var total = 0;

    for (i = 0; i < cart.length; i++) {
      total = total + +cart[i].offprice * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent =
      total >= 500 ? total : total + 50;

    document.getElementById("cart_total_table").style.display = "flex";
    document.getElementById("add_more").textContent =
      "(" + cart.length + " items)";
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }

  function sub_total_fun(index) {
    cart[index].no_selected = +document.getElementById("cart_select" + index)
      .value;
    localStorage.setItem("cart", JSON.stringify(cart));
    var sub_total =
      +cart[index].offprice *
      +document.getElementById("cart_select" + index).value;
    document.getElementById("cart_sub_total" + index).textContent = sub_total;
    var p_close = document.createElement("p");
    p_close.innerHTML = "<i class='fas fa-times'></i>";
    p_close.addEventListener("click", function () {
      cart_delete_object(index);
    });
    p_close.style.display = "inline";
    p_close.style.marginLeft = "20px";
    document.getElementById("cart_sub_total" + index).append(p_close);

    var total = 0;

    for (i = 0; i < cart.length; i++) {
      total = total + +cart[i].offprice * cart[i].no_selected;
    }
    console.log(total);
    document.getElementById("total_cart").textContent = total;

    document.getElementById("grand_total_cart_td").textContent =
      total >= 500 ? total : total + 50;
  }

  function cart_close() {
    shopping.style.display = "";
    document.getElementById("blur_background").style.display = "none";
  }

  function cart_delete_object(index) {
    console.log("here");
    var new_cart = [];
    for (var i = 0; i < cart.length; i++) {
      if (i != index) new_cart.push(cart[i]);
    }
    cart = new_cart;
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    popup();
  }

  function healthmug_home() {
    window.location.assign("/homepage/homepage.html");
  }

  //popup new window
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  function specific(index) {
    console.log("here");
    document.getElementById("fildiv").style.display = "none"; //display off
    document.getElementById("productdiv").style.display = "none";
    document.getElementById("popup_main").style.display = "flex";
    document.querySelector("#image_prod>img").src = products[index].src;
    document.querySelector("#prod_details>h2").textContent =
      products[index].title;
    document.querySelector("#prod_details>h3").textContent =
      products[index].tagLine;
    document.querySelector("#real_price").textContent = products[index].price;
    document.querySelectorAll("#prod_details>h2")[1].textContent =
      products[index].offprice;
    document
      .getElementById("add_to_cart_shopping")
      .addEventListener("click", function () {
        cart.push(products[index]);
        blur_on();
        popup();
      });
    console.log(document.querySelector("#prod_details>button"));
    document
      .querySelector("#prod_details>button")
      .addEventListener("click", function () {
        console.log("here");
        buy_now(index);
      });
  }

  function buy_now(index) {
    console.log("here");
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.assign("checkOut.html");
  }
}



// ===========================================================================================================
// THIS IS SING IN NAD SING UP FUCTIONS 
//MADE BY  ADITYA
{
  document.getElementById("login_form").addEventListener("submit", signsuccess);
      document.getElementById("sign_up_form").addEventListener("click", signUp);
  
      var usersignup = JSON.parse(localStorage.getItem("user_credentials")) || []
  
      function signsuccess(e) {
          e.preventDefault();
          var flag = false;
          var email = document.getElementById("hoversignupinput").value;
          console.log(usersignup);
  
  
          for (var i = 0; i < usersignup.length; i++) {
              if (usersignup[i].email !== email)
                  flag = false;
              else {
                  flag = true;
                  break;
              }
          }
          if (flag && usersignup.length > 0) {
              console.log(i);
              document.getElementById("login_password_submit").addEventListener("click", function () {
                  password(i);
              });
              document.getElementById("login_password").style.display = "block";
          }
          else {
              console.log("pokeymon");
              document.getElementById("modal-wrapper1").style.display = "block";
          }
  
      }
  
      function password(i) {
          if (document.getElementById("login_password_input").value == usersignup[i].password)
              alert("login successful");
          else {
              alert("login failed!");
  
              sign_in();
  
          }
      }
  
  
      function signUp(e) {
          e.preventDefault();
          console.log("here")
          var email = document.getElementById("signup_email").value;
          var password = document.getElementById("signup_password").value;
          var mobile = document.getElementById("signup_mobile").value;
          console.log(email, password, mobile);
  
          var data = {
              email: email,
              password: password,
              mobile: mobile
          }
  
          usersignup.push(data);
          console.log(usersignup);
          localStorage.setItem("user_credentials", JSON.stringify(usersignup));
          console.log("sai");
          sign_up_close();
  
      }
  
      function sign_in() {
          document.getElementById('modal-wrapper').style.display = 'none';
      }
      function sign_up() {
          document.getElementById("modal-wrapper1").style.display = "block";
      }
      function sign_up_close() {
          document.getElementById('modal-wrapper1').style.display = 'none';
      }
    }