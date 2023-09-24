// Получаем элемент #cartItemCount
let cartItemCountElement = document.getElementById("cartItemCount");

// Получаем значение из localStorage (если оно есть) и устанавливаем его в элемент #cartItemCount
let cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
cartItemCountElement.textContent = cartItemCount.toString();

let cartItem = document.getElementById("cartItemCount")

let mobileMeni = document.querySelector('.mobileMeni');
let burgerMenu = document.getElementById('burgerMenu');
let closeButton = document.getElementById('closeButton');

burgerMenu.addEventListener('click', () => {
  mobileMeni.classList.add('active');
});

closeButton.addEventListener('click', () => {
  mobileMeni.classList.remove('active');
});

// Получаем данные из localStorage или инициализируем пустую корзину и общую сумму
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

let cartItemCountQ = parseInt(localStorage.getItem("cartItemCount")) || 0;

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
    itemsBox.className = "itemsBox";

    // Создаем элементы для отображения информации о товаре (например, имя и цена)
    let itemImgElement = document.createElement("img");
    itemImgElement.src = cartItem.image;
    cartItemElement.appendChild(itemImgElement);

    let itemNameElement = document.createElement("h3");
    itemNameElement.textContent = cartItem.name;
    cartItemElement.appendChild(itemNameElement);

    let itemsSize = document.createElement("p");
    itemsSize.textContent = `Размеры: ${cartItem.sizes.join(', ')}`;
    cartItemElement.appendChild(itemsSize);

    let itemsColor = document.createElement("p");
    itemsColor.textContent = `Цвета: ${cartItem.colors.join(', ')}`;
    cartItemElement.appendChild(itemsColor);


    let itemPriceElement = document.createElement("p");
    itemPriceElement.textContent = `Цена: ${cartItem.price} грн.`;
    cartItemElement.appendChild(itemPriceElement);

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
    removeButton.className = "deleteButton";
    removeButton.addEventListener("click", () => {
      // Находим индекс товара в корзине
      const index = cart.findIndex((item) => item.name === cartItem.name);

      if (index !== -1) {
        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        cartItemCount--
        cartItemCountElement.textContent = cartItemCount.toString();

        localStorage.setItem("cartItemCount", cartItemCount.toString());

        displayCartData();

        totalAmount -= cartItem.price;

        updateTotalAmount(totalAmount);
      }
    });


    cartItemsElement.appendChild(itemsBox);
    itemsBox.appendChild(cartItemElement);
    itemsBox.appendChild(countBox);
    countBox.appendChild(increment);
    countBox.appendChild(countElement);
    countBox.appendChild(decrement);
    countBox.appendChild(removeButton);
  }

  updateTotalAmount(totalAmount);
}

function updateTotalAmount(total) {
  let totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = `Общая сумма: ${total.toFixed(2)} грн.`;

  localStorage.setItem("totalAmount", total.toString());
}

// Вызываем функцию для отображения данных о корзине при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  displayCartData();
});






// $(document).ready(function () {
//     let sliderContainer = $('#sclick_slider');

//     // Загрузка данных из файла tovar.json с использованием fetch
//     fetch('./tovar.json')
//         .then(response => response.json())
//         .then(data => {
//             let itemsWithRating5 = [...data.asortiment.bra, ...data.asortiment.underpants].filter(item => item.rating === 5);

//             // Получаем начальное значение счетчика из localStorage
//             let savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
//             let cartItemCount = document.getElementById("cartItemCount");
//             cartItemCount.innerHTML = savedCartItemCount;
//             .log(savedCartItemCount);

//             // Iterate through filtered items and create slider slides
//             itemsWithRating5.forEach(item => {
//                 let link = $('<a class="product"></a>');

//                 // Установите href атрибут для перехода на страницу товара с параметром itemId
//                 link.attr('href', `index2.html?itemId=${item.id}`);

//                 let itemContainer = $('<div class="item"></div>');
//                 itemContainer.append(`<img src="${item.img}" alt="${item.name}">`);
//                 itemContainer.append(`<h3>${item.name}</h3>`);
//                 itemContainer.append(`<p>${item.price} грн</p>`);

//                 link.append(itemContainer);
//                 sliderContainer.append(link);
//             });

//             // Initialize the slider
//             sliderContainer.slick({
//                 arrows: true,
//                 slidesToShow: 3,
//                 slidesToScroll: 1
//             });
//         })
//         .catch(error => console.error('Ошибка при загрузке файла tovar.json:', error));
// });