export default asortiment;


let openWindow = document.getElementById('open_window');
karzina.onclick = function () {
    if (openWindow.style.display === "none") {
        openWindow.style.display = "block";
    } else {
        openWindow.style.display = "none";
    }
};

closeWindow.onclick = function () {
    if (openWindow.style.display === "block") {
        openWindow.style.display = "none";
    } else {
        openWindow.style.display = "block";
    }
};

import asortiment from './tovar.js';

$(document).ready(function() {
    const sliderContainer = $('#sclick_slider');
    const itemsWithRating5 = asortiment.bra.filter(item => item.rating === 5);

    const savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
    const cartItemCount = document.getElementById("cartItemCount");
    cartItemCount.innerHTML = savedCartItemCount;

    // Iterate through filtered items and create slider slides
    itemsWithRating5.forEach(item => {
        const slide = $(`<a href="index2.html?item=${encodeURIComponent(item.name)}" class="slider-slide"></a>`);
        
        const itemContainer = $('<div class="item"></div>');
        itemContainer.append(`<img src="${item.img}" alt="${item.name}">`);
        itemContainer.append(`<h3>${item.name}</h3>`);
        itemContainer.append(`<p>${item.price} USD</p>`);

        slide.append(itemContainer);
        sliderContainer.append(slide);
    });

    // Initialize the slider
    sliderContainer.slick({
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
});


