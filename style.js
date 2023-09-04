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

$(document).ready(function () {
    let sliderContainer = $('#sclick_slider');
    let itemsWithRating5 = [...asortiment.bra, ...asortiment.underpants].filter(item => item.rating === 5);

    let savedCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
    let cartItemCount = document.getElementById("cartItemCount");
    cartItemCount.innerHTML = savedCartItemCount;

    // Iterate through filtered items and create slider slides
    itemsWithRating5.forEach(item => {
        let slide = $(`<a href="index2.html?item=${encodeURIComponent(item.name)}" class="slider-slide"></a>`);

        let itemContainer = $('<div class="item"></div>');
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


document.getElementById('languageSelector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    fetch(selectedLanguage)
        .then(response => response.json())
        .then(data => {
            // Замена текста на странице
            document.querySelector('.header_left li:nth-child(1) a').textContent = data.home;
            document.querySelector('.header_left li:nth-child(2) a').textContent = data.shop;
            document.querySelector('.header_left li:nth-child(3) a').textContent = data.contacts;
            document.querySelector('.header_left li:nth-child(4) a').textContent = data.comments;
            document.querySelector('.header_text h1').textContent = data.header_text_h1;
            document.querySelector('.header_text p').textContent = data.header_text_p;
            document.querySelector('.header_text a').textContent = data.header_text_button;
            document.querySelector('.aboutUs h2').textContent = data.aboutUs_h2;
            document.querySelector('.aboutUs_txt p').textContent = data.aboutUs_txt_p;
            document.querySelector('.spisok div:nth-child(1)').textContent = data.spisok_li;
            document.querySelector('.spisok div:nth-child(2)').textContent = data.spisok_li;
            document.querySelector('.spisok div:nth-child(3)').textContent = data.spisok_li;
            document.querySelector('.spisok div:nth-child(4)').textContent = data.spisok_li;
            document.querySelector('.collection2023 p:nth-child(2)').textContent = data.collection2023_p;
            document.querySelector('.excluziv p').textContent = data.excluziv_p;
            document.querySelector('.box_slaider h2').textContent = data.box_slaider_h2;
            document.querySelector('.foto_text p').textContent = data.foto_text_p;
            document.querySelector('.foto_text a').textContent = data.foto_text_a;

            document.querySelector('.foto_left h2').textContent = data.foto_left_h2;
            document.querySelector('.foto_left p:nth-child(2)').textContent = data.foto_left_p1;
            document.querySelector('.foto_left p:nth-child(4)').textContent = data.foto_left_p2;

            document.querySelector('.foto_left a').textContent = data.foto_left_button1;

            document.querySelector('.foto_right h2').textContent = data.foto_right_h2;
            document.querySelector('.foto_right p:nth-child(2)').textContent = data.foto_right_p2;
            document.querySelector('.foto_right p:nth-child(4)').textContent = data.foto_right_p3;

            document.querySelector('.foto_right a').textContent = data.foto_right_button2;

            document.querySelector('.footer_box1 h3').textContent = data.footer_box1_h3;
            document.querySelector('.footer_box1 ul li:nth-child(1) a').textContent = data.footer_box1_ul_li1;
            document.querySelector('.footer_box1 ul li:nth-child(2) a').textContent = data.footer_box1_ul_li2;

            document.querySelector('.footer_box2 ul li:nth-child(1)').textContent = data.footer_box2_ul_li1;
            document.querySelector('.footer_box2 ul li:nth-child(2)').textContent = data.footer_box2_ul_li2;
            document.querySelector('.footer_box2 ul li:nth-child(3)').textContent = data.footer_box2_ul_li3;

            // и так далее...
        })
        .catch(error => console.error('Ошибка при загрузке файла перевода:', error));
});

