import asortiment from './tovar.js';

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('item');

    let productInfo = document.getElementById("productInfo");
    let h2 = productInfo.querySelector(".NameT");
    let img = productInfo.querySelector(".imgT");
    let sizes = productInfo.querySelector(".SizesT");
    let cup = productInfo.querySelector(".cupT");
    let material = productInfo.querySelector(".materialT");
    let color = productInfo.querySelector(".ColorT");
    let braShape = productInfo.querySelector(".brashapeT");
    let straps = productInfo.querySelector(".strapsT");
    let style = productInfo.querySelector(".styleT");
    let clasp = productInfo.querySelector(".claspT");
    let country = productInfo.querySelector(".countryT");
    let composition = productInfo.querySelector(".compositionT");
    let print = productInfo.querySelector(".printT");
    let decoration = productInfo.querySelector(".decorationT");
    let rating = productInfo.querySelector(".RatingT");
    let price = productInfo.querySelector(".PriceT");


    if (itemName) {
        const selectedProduct = asortiment.bra.find(item => item.name === itemName);

        if (selectedProduct) {
            h2.innerText = selectedProduct.name;
            img.src = selectedProduct.img;
            sizes.innerText = `Розміры: `;

            if (!selectedProduct.selectedSizes) {
                selectedProduct.selectedSizes = [];
            }

            const sizesArray = selectedProduct.size;
            sizesArray.forEach(size => {
                const sizeInput = document.createElement("input");
                sizeInput.type = "checkbox";
                sizeInput.name = "selectedSizes";
                sizeInput.value = size;

                if (selectedProduct.selectedSizes.includes(size)) {
                    sizeInput.checked = true;
                }

                const sizeLabel = document.createElement("label");

                const inputId = `sizeInput_${size}`;
                sizeInput.id = inputId;

                sizeInput.addEventListener("change", function () {
                    if (sizeInput.checked) {
                        selectedProduct.selectedSizes.push(size);
                    } else {
                        const index = selectedProduct.selectedSizes.indexOf(size);
                        if (index !== -1) {
                            selectedProduct.selectedSizes.splice(index, 1);
                        }
                    }
                });

                sizeLabel.appendChild(sizeInput);
                sizeLabel.appendChild(document.createTextNode(size));

                sizes.appendChild(sizeLabel);
            });

            cup.innerText = `Чашка: ${selectedProduct.cup}`
            material.innerText = `Матеріал: ${selectedProduct.material.join(", ")}`;
            color.innerText = `Колір: ${selectedProduct.color}`;
            braShape.innerText = `Форма бюстгальтера: ${selectedProduct.braShape}`;
            straps.innerText = `Бретелькі: ${selectedProduct.straps.join(", ")}`
            style.innerText = `Стиль: ${selectedProduct.style}`
            clasp.innerText = `Застібка: ${selectedProduct.clasp}`
            country.innerText = `Країна: ${selectedProduct.country}`
            composition.innerText = `Композиція: ${selectedProduct.composition.join(", ")}`
            print.innerText = `Малюнок: ${selectedProduct.print}`
            decoration.innerText = `Декорація: ${selectedProduct.decorating}`
            price.innerText = `Цена: ${selectedProduct.price} грн.`;
            rating.innerText = `Рейтинг: ${selectedProduct.rating}`;
        } else {
            h2.innerText = "Товар не найден";
        }


        const savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
        const cartItemCount = document.getElementById("cartItemCount");
        cartItemCount.innerHTML = savedCartItemCount;


        let push = document.getElementById("pushKarzina");

        push.addEventListener("click", function () {
            if (selectedProduct) {
                console.log("Product Information:");
                console.log("Name:", selectedProduct.name);
                console.log("Sizes:", selectedProduct.selectedSizes);
                console.log("Cup:", selectedProduct.cup);
                cartItems.push(selectedProduct);

                const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

                // Добавляем выбранный товар к существующему списку
                savedCartItems.push(selectedProduct);

                // Сохраняем обновленный массив корзины в localStorage
                localStorage.setItem("cartItems", JSON.stringify(savedCartItems));

                // Обновляем счетчик товаров в корзине и сохраняем его в localStorage
                const updatedCartItemCount = savedCartItems.length;
                localStorage.setItem("cartItemCount", updatedCartItemCount);
                cartItemCount.innerHTML = updatedCartItemCount;
            } else {
                console.log("Product not found");
            }

        });
    }

});

let cartItems = [];

const cartWindow = document.getElementById("open_window");
const cartItemList = document.getElementById("cartItems");

document.getElementById("karzina").addEventListener("click", function () {
    cartWindow.style.display = "block";

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = savedCartItems;

    const savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
    const cartItemCount = document.getElementById("cartItemCount");
    cartItemCount.innerHTML = savedCartItemCount;

    cartItemList.innerHTML = "";
    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const itemImage = document.createElement("img");
        itemImage.src = item.img;
        itemImage.alt = item.name;
        cartItem.appendChild(itemImage);

        const itemName = document.createElement("h3");
        const itemSize = document.createElement("p");
        itemName.innerText = `${item.name}`;
        itemSize.innerText = `Розмір: ${item.selectedSizes.join(", ")}`
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemSize);

        const itemDescription = document.createElement("p");
        cartItem.appendChild(itemDescription);

        cartItemList.appendChild(cartItem);
    });
});

document.getElementById("closeWindow").addEventListener("click", function () {
    cartWindow.style.display = "none";
});