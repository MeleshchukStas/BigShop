
import { getCartData } from './style2.js';

//let cartItemCount = 0;
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0; // Получаем totalAmount из локального хранилища
let cartItemCountElement = document.getElementById("cartItemCount");


// Получите значение из локального хранилища (если оно там есть) и установите его в элемент #cartItemCount
let cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
//let cartItemCountElement = document.getElementById("cartItemCount");
cartItemCountElement.textContent = cartItemCount.toString();

// Обновление значения и сохранение в локальном хранилище при необходимости
function updateCartItemCount(value) {
    cartItemCount += value;
    cartItemCountElement.textContent = cartItemCount.toString();
    localStorage.setItem("cartItemCount", cartItemCount.toString());
}

// Пример использования: при добавлении товара в корзину вызовите функцию updateCartItemCount(1), а при удалении - updateCartItemCount(-1).


// Функция для отображения данных о корзине
function displayCartData() {
    let cartData = getCartData();
    let cartItemsElement = document.getElementById("cartItems");

    cartItemsElement.innerHTML = "";

    // Пройдитесь по каждому элементу в корзине и создайте соответствующие элементы для отображения
    for (let cartItem of cartData) {
        let itemsBox = document.createElement("div");
        itemsBox.className = "itemsBox";
        let imemsP = document.createElement("div")
        imemsP.className = "imemsP"

        let itemsImg = document.createElement("img");
        itemsImg.src = cartItem.image;
        imemsP.appendChild(itemsImg);

        let itemsName = document.createElement("h3");
        itemsName.textContent = cartItem.name;
        imemsP.appendChild(itemsName);

        let itemsSize = document.createElement("p");
        itemsSize.textContent = `Размеры: ${cartItem.sizes.join(', ')}`;
        imemsP.appendChild(itemsSize);

        let itemsColor = document.createElement("p");
        itemsColor.textContent = `Цвета: ${cartItem.colors.join(', ')}`;
        imemsP.appendChild(itemsColor);

        let itemsPrice = document.createElement("p");
        itemsPrice.className = "itemsPrice";
        itemsPrice.textContent = `Цена: ${cartItem.price} грн.`;
        imemsP.appendChild(itemsPrice);

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

        // Создайте кнопку удаления
        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.addEventListener("click", () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const index = cart.findIndex((item) => {
                return (
                    item.image === cartItem.image &&
                    item.name === cartItem.name &&
                    arraysEqual(item.sizes, cartItem.sizes) &&
                    arraysEqual(item.colors, cartItem.colors)
                );
            });


            if (index !== -1) {
                cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(cart));

                const parentItemsBox = deleteButton.closest('.itemsBox');

                if (parentItemsBox) {
                    cartItemsElement.removeChild(parentItemsBox);
                }

                cartItemCount--;
                cartItemCountElement.textContent = cartItemCount;
                localStorage.setItem("cartItemCount", cartItemCount.toString());

                totalAmount -= count * parseFloat(cartItem.price);
                updateTotalAmount(totalAmount);
            }
        });


        cartItemsElement.appendChild(itemsBox);
        itemsBox.appendChild(imemsP)

        itemsBox.appendChild(countBox)
        countBox.appendChild(increment)
        countBox.appendChild(countElement)
        countBox.appendChild(decrement)
        countBox.appendChild(deleteButton)

    }
    updateTotalAmount(totalAmount);
}

// Вызовите функцию для отображения данных о корзине при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    displayCartData();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateTotalAmount(totalAmount) {
    // Обновите элемент на странице, отображающий общую сумму
    let totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = `Общая сумма: ${totalAmount.toFixed(2)} грн.`;

    // Сохраните totalAmount в localStorage
    localStorage.setItem("totalAmount", totalAmount.toString());
}

// Вызов функции при загрузке страницы
window.addEventListener("load", updateTotalAmount);




function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
export { displayCartData };
