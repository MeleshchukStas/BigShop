import asortiment from './tovar.js';

const productInfo = document.getElementById("productInfo");
const htwo = document.querySelector(".nameT");
const img = document.querySelector(".imgT");
const sizes = document.querySelector(".SizesT");
const cup = document.querySelector(".cupT");
const material = document.querySelector(".materialT");
const color = document.querySelector(".ColorT");
const braShape = document.querySelector(".brashapeT");
const straps = document.querySelector(".strapsT");
const style = document.querySelector(".styleT");
const clasp = document.querySelector(".claspT");
const country = document.querySelector(".countryT");
const composition = document.querySelector(".compositionT");
const print = document.querySelector(".printT");
const decoration = document.querySelector(".decorationT");
const rating = document.querySelector(".RatingT");
const price = document.querySelector(".PriceT");

let selectedSizes = [];
let cartItems = [];

function updateSelectedSizes(product, size) {
    if (!product.selectedSizes) {
        product.selectedSizes = [];
    }

    if (product.selectedSizes.includes(size)) {
        // Размер уже выбран, уберите его
        const index = product.selectedSizes.indexOf(size);
        if (index !== -1) {
            product.selectedSizes.splice(index, 1);
        }
    } else {
        // Размер не выбран, добавьте его
        product.selectedSizes.push(size);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('item');

    if (itemName) {
        let selectedProduct = [...asortiment.bra, ...asortiment.underpants].find(item => item.name === itemName);

        if (selectedProduct) {
            htwo.innerText = selectedProduct.name;
            img.src = selectedProduct.img;

            if (sizes) sizes.innerText = `Розміри: `;

            if (!selectedProduct.selectedSizes) {
                selectedProduct.selectedSizes = [];
            }

            let sizesArray = selectedProduct.size;
            if (sizesArray && sizesArray.length > 0) {
                sizesArray.forEach(size => {
                    let sizeInput = document.createElement("input");
                    sizeInput.type = "checkbox";
                    sizeInput.name = "selectedSizes";
                    sizeInput.value = size;
                    sizeInput.id = `sizeInput_${size}`;

                    if (selectedSizes.includes(size)) {
                        sizeInput.checked = true;
                    }

                    let sizeLabel = document.createElement("label");
                    sizeLabel.htmlFor = `sizeInput_${size}`;

                    sizeLabel.appendChild(document.createTextNode(size));
                    sizes.appendChild(sizeInput);
                    sizes.appendChild(sizeLabel);

                    sizeInput.addEventListener("change", function () {
                        console.log("Изменение состояния чекбокса");
                        if (this.checked) {
                            selectedSizes.push(this.value);
                        } else {
                            const index = selectedSizes.indexOf(this.value);
                            if (index !== -1) {
                                selectedSizes.splice(index, 1);
                            }
                        }
                    });
                });
            } else {
                sizes.style.display = "none";
            }

            if (cup && selectedProduct.cup && selectedProduct.cup !== "None") cup.innerText = `Чашка: ${selectedProduct.cup}`;
            if (material && selectedProduct.material && selectedProduct.material.length > 0) material.innerText = `Матеріал: ${selectedProduct.material.join(", ")}`;
            if (color && selectedProduct.color && selectedProduct.color !== "none") color.innerText = `Колір: ${selectedProduct.color}`;
            if (braShape && selectedProduct.braShape && selectedProduct.braShape !== "None") braShape.innerText = `Форма бюстгальтера: ${selectedProduct.braShape}`;
            if (straps && selectedProduct.straps && selectedProduct.straps.length > 0) straps.innerText = `Бретелькі: ${selectedProduct.straps.join(", ")}`;
            if (style && selectedProduct.style && selectedProduct.style !== "None") style.innerText = `Стиль: ${selectedProduct.style}`;
            if (clasp && selectedProduct.clasp && selectedProduct.clasp !== "None") clasp.innerText = `Застібка: ${selectedProduct.clasp}`;
            if (country && selectedProduct.country && selectedProduct.country !== "None") country.innerText = `Країна: ${selectedProduct.country}`;
            if (composition && selectedProduct.composition && selectedProduct.composition.length > 0) composition.innerText = `Композиція: ${selectedProduct.composition.join(", ")}`;
            if (print && selectedProduct.print && selectedProduct.print !== "none") print.innerText = `Малюнок: ${selectedProduct.print}`;
            if (decoration && selectedProduct.decorating && selectedProduct.decorating !== "None") decoration.innerText = `Декорація: ${selectedProduct.decorating}`;
            if (price && selectedProduct.price && selectedProduct.price !== "None") price.innerText = `Ціна: ${selectedProduct.price} грн.`;
            if (rating && selectedProduct.rating && selectedProduct.rating !== "None") rating.innerText = `Рейтинг: ${selectedProduct.rating}`;

            if (!selectedProduct || !selectedProduct.name) {
                const emptyBlock = document.querySelector(".emptyBlock");
                emptyBlock.style.display = "block";
                emptyBlock.style.visibility = "hidden";
                sizes.style.position = "relative";
                sizes.style.left = "100%";
            }
        } else {
            htwo.innerText = "Товар не найден";
        }

        let savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
        let cartItemCount = document.getElementById("cartItemCount");
        cartItemCount.innerHTML = savedCartItemCount;

        let push = document.getElementById("pushKarzina");

        push.addEventListener("click", function () {
            if (selectedProduct) {
                updateSelectedSizes(selectedProduct, selectedSizes);
                cartItems.push(selectedProduct);
                let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
                savedCartItems.push(selectedProduct);
                localStorage.setItem("cartItems", JSON.stringify(savedCartItems));
                let updatedCartItemCount = savedCartItems.length;
                localStorage.setItem("cartItemCount", updatedCartItemCount);
                cartItemCount.innerHTML = updatedCartItemCount;
            } else {
                console.log("Товар не найден");
            }
        });
    }
});

let cartWindow = document.getElementById("open_window");
let cartItemList = document.getElementById("cartItems");

document.getElementById("karzina").addEventListener("click", function () {
    cartWindow.style.display = "block";

    let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = savedCartItems;

    let savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
    let cartItemCount = document.getElementById("cartItemCount");
    cartItemCount.innerHTML = savedCartItemCount;

    cartItemList.innerHTML = "";
    cartItems.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        let itemImage = document.createElement("img");
        itemImage.src = item.img;
        itemImage.alt = item.name;
        cartItem.appendChild(itemImage);

        let itemName = document.createElement("h3");
        let itemSize = document.createElement("p");
        itemName.innerText = `${item.name}`;
        itemSize.innerText = `Розмір: ${item.selectedSizes.join(", ")}`
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemSize);

        let itemDescription = document.createElement("p");
        cartItem.appendChild(itemDescription);

        cartItemList.appendChild(cartItem);

        let updatedCartItemCount = savedCartItems.length;
        localStorage.setItem("cartItemCount", updatedCartItemCount);
        cartItemCount.innerHTML = updatedCartItemCount;

        localStorage.setItem("cartItems", JSON.stringify(savedCartItems));
    });
});

document.getElementById("closeWindow").addEventListener("click", function () {
    cartWindow.style.display = "none";
});

document.getElementById("zakaz_tovara").addEventListener("click", function () {
    console.log("Массив заказа:", cartItems);
    let orderArrayElement = document.getElementById("orderArray");
    orderArrayElement.innerHTML = "";
    let preElement = document.createElement("pre");
    preElement.textContent = JSON.stringify(cartItems, null, 2);
    orderArrayElement.appendChild(preElement);
});


fetch('lang-ua.json') // Замените на выбор языка
    .then(response => response.json())
    .then(data => {
        // Замена текста на странице
        document.querySelector('.header_left li:nth-child(1) a').textContent = data.home;
        document.querySelector('.header_left li:nth-child(2) a').textContent = data.shop;
        // и так далее...
    })
    .catch(error => console.error('Ошибка при загрузке файла перевода:', error));