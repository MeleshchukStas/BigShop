function createProductLink(product) {
  let productLink = document.createElement("a");
  productLink.className = "product";
  // Устанавливаем href с параметрами товара
  productLink.href =
    `index2.html?name=${product.name}
    &price=${product.price}
    &img=${product.img}
    &size=${product.size}
    &cup=${product.cup}
    &material=${product.material}
    &color=${product.color}
    &braShape=${product.braShape}
    &straps=${product.straps}
    &style=${product.style}
    &clasp=${product.clasp}
    &country=${product.country}
    &composition=${product.composition}
    &print=${product.print}`;

  productLink.setAttribute("data-country", product.country);
  productLink.setAttribute("data-price", product.price);

  let boxProd = document.createElement("div")
  boxProd.classList = "boxprod"

  let imgProd = document.createElement("img");
  imgProd.src = product.img;

  let nameProd = document.createElement("h2");
  nameProd.innerText = product.name;

  let priceProd = document.createElement("p");
  priceProd.innerText = "Ціна: " + product.price + " грн.";

  let sizeProd = document.createElement("p");
  sizeProd.innerText = "Размеры: " + product.size.join(" ");

  productLink.appendChild(imgProd);
  productLink.appendChild(nameProd);
  productLink.appendChild(boxProd);
  boxProd.appendChild(sizeProd);
  boxProd.appendChild(priceProd);

  return productLink;
}


function sortByDate(products) {
  products.sort(function (a, b) {
    let dateA = new Date(a.getAttribute("data-date"));
    let dateB = new Date(b.getAttribute("data-date"));
    return dateA - dateB;
  });
}

let request;
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else {
  request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open("GET", "tovar.json");
request.onload = function () {
  if (request.status === 200) {
    let tovarLength = JSON.parse(request.response);

    let productContainerBra = document.getElementById("productContainer");
    let productContainerUnderpants = document.getElementById("productContainer");

    for (let i = 0; i < tovarLength.asortiment.bra.length; i++) {
      let productLink = createProductLink(tovarLength.asortiment.bra[i]);
      productContainerBra.appendChild(productLink);
    }

    for (let i = 0; i < tovarLength.asortiment.underpants.length; i++) {
      let productLink = createProductLink(tovarLength.asortiment.underpants[i]);
      productContainerUnderpants.appendChild(productLink);
    }
  }
};
request.send();

document.addEventListener("DOMContentLoaded", function () {
  let productContainer = document.getElementById("productContainer");
  let priceSortInputAsc = document.querySelector('input[name="sort"][value="price_plus"]');
  let priceSortInputDesc = document.querySelector('input[name="sort"][value="price_minus"]');
  let countryCheckboxes = document.querySelectorAll('input[name="country"]');

  // Функция для сортировки товаров по цене
  function sortByPriceAscending() {
    let products = Array.from(productContainer.getElementsByClassName("product"));
    products.sort((a, b) => {
      let priceA = parseFloat(a.getAttribute("data-price"));
      let priceB = parseFloat(b.getAttribute("data-price"));
      return priceA - priceB;
    });
    productContainer.innerHTML = "";
    products.forEach((product) => {
      productContainer.appendChild(product);
    });
  }

  // Функция для сортировки товаров по цене в убывающем порядке
  function sortByPriceDescending() {
    let products = Array.from(productContainer.getElementsByClassName("product"));
    products.sort((a, b) => {
      let priceA = parseFloat(a.getAttribute("data-price"));
      let priceB = parseFloat(b.getAttribute("data-price"));
      return priceB - priceA;
    });
    productContainer.innerHTML = "";
    products.forEach((product) => {
      productContainer.appendChild(product);
    });
  }

  // Обработчики событий для сортировки по цене
  priceSortInputAsc.addEventListener("change", function () {
    if (priceSortInputAsc.checked) {
      sortByPriceAscending();
    }
  });

  priceSortInputDesc.addEventListener("change", function () {
    if (priceSortInputDesc.checked) {
      sortByPriceDescending();
    }
  });

  // Функция для фильтрации товаров по стране
  function filterByCountry() {
    let selectedCountries = Array.from(countryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (selectedCountries.length === 0) {
      // Если ни один чекбокс не выбран, отображаем все товары
      productContainer.querySelectorAll(".product").forEach((product) => {
        product.style.display = "block";
      });
    } else {
      // Фильтруем по выбранным странам
      productContainer.querySelectorAll(".product").forEach((product) => {
        let productCountry = product.getAttribute("data-country");
        if (selectedCountries.includes(productCountry)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }
  }

  // Функция для фильтрации товаров по цене
  function filterByPrice(minPrice, maxPrice) {
    let products = Array.from(productContainer.getElementsByClassName("product"));
    products.forEach((product) => {
      const productPrice = parseFloat(product.getAttribute("data-price"));
      if (productPrice >= minPrice && productPrice <= maxPrice) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }


  // Получите ссылки на элементы фильтрации по цене
  let slider = document.getElementById("slider");
  let value1 = document.getElementById("value1");
  let value2 = document.getElementById("value2");

  // Инициализируйте ползунок с двумя бегунками
  noUiSlider.create(slider, {
    start: [0, 200], // Начальные значения ползунков
    connect: true,   // Соедините ползунки
    range: {
      'min': 0,
      'max': 200
    }
  });

  // Обновите значения при изменении ползунков
  slider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
      value1.textContent = values[0];
    } else {
      value2.textContent = values[1];
    }

    // Получите текущее значение цены из ползунка и примените фильтрацию
    let selectedMinPrice = parseFloat(values[0]);
    let selectedMaxPrice = parseFloat(values[1]);
    filterByPrice(selectedMinPrice, selectedMaxPrice);
  });


  // Обработчик событий для фильтрации по стране
  countryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterByCountry);
  });


  filterByCountry();
  sortByPriceAscending();
});

// Получаем данные из localStorage или инициализируем пустую корзину и общую сумму
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

let cartItemCountElement = document.getElementById("cartItemCount");


// Получаем значение из localStorage (если оно есть) и устанавливаем его в элемент #cartItemCount
let cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
cartItemCountElement.textContent = cartItemCount.toString();

// Функция для отображения данных о корзине
function displayCartData() {
  // Находим элемент корзины на странице
  let cartItemsElement = document.getElementById("cartItems");

  // Очищаем содержимое корзины перед обновлением
  cartItemsElement.innerHTML = "";

  // Проходим по каждому элементу в корзине и создаем соответствующие элементы для отображения
  for (let cartItem of cart) {
    let cartItemElement = document.createElement("div");
    cartItemElement.className = "imemsP";

    let itemsBox = document.createElement("div");
    itemsBox.className = "itemsBox"

    // Создаем элементы для отображения информации о товаре (например, имя и цена)
    let itemImgElement = document.createElement("img");
    itemImgElement.src = cartItem.image;
    cartItemElement.appendChild(itemImgElement)

    let itemNameElement = document.createElement("h3");
    itemNameElement.textContent = cartItem.name;
    cartItemElement.appendChild(itemNameElement)

    let itemsSize = document.createElement("p");
    itemsSize.textContent = `Размеры: ${cartItem.sizes.join(', ')}`;
    cartItemElement.appendChild(itemsSize);

    let itemsColor = document.createElement("p");
    itemsColor.textContent = `Цвета: ${cartItem.colors.join(', ')}`;
    cartItemElement.appendChild(itemsColor);

    let itemPriceElement = document.createElement("p");
    itemPriceElement.textContent = `Цена: ${cartItem.price} грн.`;
    cartItemElement.appendChild(itemPriceElement)

    let count = 1;
    let itemsBoxs = document.createElement("div");
    itemsBoxs.className = "itemsBox";
    let countBox = document.createElement("div");
    countBox.className = "countBox";


    let increment = document.createElement("button");
    increment.id = "increment";
    increment.className = "counter-button";
    increment.innerText = "+";

    let decrement = document.createElement("button");
    decrement.id = "decrement";
    decrement.className = "counter-button";
    decrement.innerText = "-";

    let countElement = document.createElement("div");
    countElement.innerText = "1";
    countElement.id = "count";

    increment.addEventListener('click', () => {
      count++;
      countElement.textContent = count;
      totalAmount += parseFloat(cartItem.price);
      updateTotalAmount(totalAmount);
    });

    decrement.addEventListener('click', () => {
      if (count > 0) {
        count--;
        countElement.textContent = count;
        totalAmount -= parseFloat(cartItem.price);
        updateTotalAmount(totalAmount);
      }
    });

    // Создаем кнопку для удаления товара из корзины
    let removeButton = document.createElement("button");
    removeButton.className = "deleteButton"
    removeButton.addEventListener("click", () => {
      // Находим индекс товара в корзине
      let index = cart.findIndex((item) => item.name === cartItem.name);

      if (index !== -1) {
        cart.splice(index, 1);

        // Удаляем элемент из localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Уменьшаем значение cartItemCount на количество удаленных товаров
        cartItemCount--;
        cartItemCountElement.textContent = cartItemCount.toString();

        // Обновляем cartItemCount в localStorage
        localStorage.setItem("cartItemCount", cartItemCount.toString());

        displayCartData();

        totalAmount -= cartItem.price;
        updateTotalAmount(totalAmount);
      }
    });



    cartItemsElement.appendChild(itemsBox)
    itemsBox.appendChild(cartItemElement)
    itemsBox.appendChild(countBox)

    countBox.appendChild(increment)
    countBox.appendChild(countElement)
    countBox.appendChild(decrement)
    countBox.appendChild(removeButton)


  }

  // Обновляем общую сумму
  updateTotalAmount(totalAmount);
}

// Функция для обновления общей суммы на странице и в localStorage
function updateTotalAmount(total) {
  let totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = `Общая сумма: ${total.toFixed(2)} грн.`;

  // Обновляем значение в localStorage
  localStorage.setItem("totalAmount", total.toString());
}

// Вызываем функцию для отображения данных о корзине при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  displayCartData();
});


