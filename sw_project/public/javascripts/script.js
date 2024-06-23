let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});

document.querySelectorAll('.menu_item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.submenu').style.display = 'block';
    });
    item.addEventListener('mouseleave', () => {
        item.querySelector('.submenu').style.display = 'none';
    });
});

// 줄바꿈 관련
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.tooltip-img');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function(event) {
            const tooltipText = this.getAttribute('data-tooltip');
            let tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = tooltipText;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.pageXOffset}px`;
            tooltip.style.top = `${rect.bottom + window.pageYOffset}px`;
            tooltip.style.display = 'block'; // 툴팁을 보이도록 설정
        });

        image.addEventListener('mouseleave', function() {
            document.querySelectorAll('.tooltip').forEach(tooltip => tooltip.remove());
        });
    });
});
