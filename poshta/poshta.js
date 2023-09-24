let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

let api_key = "9abd6d74f1913423e776a886763dd656";
let api_url = "https://api.novaposhta.ua/v2.0/json/";

let areaSelect = document.getElementById("areaSelect");
let citySelect = document.getElementById("citySelect");
let warehouseSelect = document.getElementById("warehouseSelect");

let area = {};
let city = {};
let warehouse = {};

function makePostRequest(method, params, callback) {
    let requestData = {
        apiKey: api_key,
        modelName: "Address",
        calledMethod: method,
        methodProperties: params,
    };

    let request = new XMLHttpRequest();
    request.open("POST", api_url, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        if (request.status === 200) {
            let response = JSON.parse(request.responseText);
            callback(response.data);
        } else {
            console.error("Ошибка при выполнении запроса:", request.statusText);
        }
    };

    request.send(JSON.stringify(requestData));
}

function createOption(element, value, text) {
    let option = document.createElement("option");
    option.value = value;
    option.text = text;
    element.appendChild(option);
}

function loadAreas() {
    makePostRequest("getAreas", {}, (areas) => {
        areas.forEach((areaItem) => {
            createOption(areaSelect, areaItem.Ref, areaItem.Description);
        });

        area = areas[0];

        areaSelect.addEventListener("change", () => {
            areaDescriptionInput.value = areaSelect.options[areaSelect.selectedIndex].text;
            loadCities(areaSelect.value);
        });
    });
}

function loadCities(areaRef) {
    citySelect.innerHTML = '<option value="">Выберите город</option>';
    warehouseSelect.innerHTML = '<option value="">Выберите відділення або поштомат</option>';

    let cityParams = {
        AreaRef: areaRef,
    };

    makePostRequest("getCities", cityParams, (cities) => {
        cities.forEach((cityItem) => {
            createOption(citySelect, cityItem.Ref, cityItem.Description);
        });

        city = cities[0];

        citySelect.addEventListener("change", () => {
            cityDescriptionInput.value = citySelect.options[citySelect.selectedIndex].text;
            loadWarehouses(citySelect.value);
        });
    });
}

function loadWarehouses(cityRef) {
    warehouseSelect.innerHTML = '<option value="">Выберите відділення або поштомат</option>';

    let warehouseParams = {
        CityRef: cityRef,
    };

    makePostRequest("getWarehouses", warehouseParams, (warehouses) => {
        warehouses.forEach((warehouseItem) => {
            createOption(warehouseSelect, warehouseItem.Ref, warehouseItem.Description);
        });

        warehouseSelect.addEventListener("change", () => {
            warehouse = warehouses.find((item) => item.Ref === warehouseSelect.value);
            if (warehouse) {
                warehouseDescriptionInput.value = warehouse.Description;
            } else {
                warehouseDescriptionInput.value = "";
            }
        });
    });
}

let areaDescriptionInput = document.getElementById("areaDescription");
let cityDescriptionInput = document.getElementById("cityDescription");
let warehouseDescriptionInput = document.getElementById("warehouseDescription");

document.addEventListener("DOMContentLoaded", function () {
    let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let orderForm = document.getElementById("orderCards");
    let getSpisok = document.getElementById("getSpisok");

    let orderSummary = "";


    let orderInfoElement = document.getElementById("cartItemsContainer");
    orderInfoElement.innerHTML = "";

    let poshtaBox = document.createElement("div");
    poshtaBox.className = "poshtaBox";

    cart.forEach((cartItem) => {
        let imemsP = document.createElement("div");
        imemsP.className = "imemsP";
        imemsP.style.margin = "20px"

        let itemImg = document.createElement("img");
        itemImg.src = `../${cartItem.image}`;
        itemImg.alt = "Product Image";
        console.log(itemImg)

        let itemName = document.createElement("p");
        itemName.textContent = `Модель: ${cartItem.name} `;

        let itemPrice = document.createElement("p");
        itemPrice.textContent = `Ціна: ${cartItem.price}грн. `;

        let itemsSize = document.createElement("p");
        itemsSize.textContent = `Размеры: ${cartItem.sizes.join(', ')}`;

        let itemsColor = document.createElement("p");
        itemsColor.textContent = `Цвета: ${cartItem.colors.join(', ')}`;

        imemsP.appendChild(itemImg);
        imemsP.appendChild(itemName);
        imemsP.appendChild(itemsSize);
        imemsP.appendChild(itemsColor);
        imemsP.appendChild(itemPrice);


        orderInfoElement.appendChild(poshtaBox);
        poshtaBox.appendChild(imemsP);

        orderSummary += `${itemName.textContent} ${itemsSize.textContent} ${itemsColor.textContent} ${itemPrice.textContent}%0A`;
    });

    let totalAmountElement = document.createElement("p");
    totalAmountElement.className = "totalAmount";
    totalAmountElement.textContent = `Общая сумма: ${totalAmount.toFixed(2)} грн.`;

    orderSummary += `${totalAmountElement.textContent}%0A`;

    orderInfoElement.appendChild(totalAmountElement);

    getSpisok.value = orderSummary;
});

loadAreas();

let clearLocalStorageButton = document.getElementById("your_button");

clearLocalStorageButton.addEventListener("click", function () {
    localStorage.clear();

    cart = [];
    totalAmount = 0;

});

