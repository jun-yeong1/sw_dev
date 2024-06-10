document.addEventListener("DOMContentLoaded", function() {
   let menu = document.querySelector('#menu-btn');
   let navbar = document.querySelector('.header .flex .navbar');
   let subMenus = document.querySelectorAll('.sub-menu'); // 모든 서브 메뉴 선택

   menu.onclick = () =>{
       menu.classList.toggle('fa-times');
       navbar.classList.toggle('active');
   }

   window.onscroll = () =>{
       menu.classList.remove('fa-times');
       navbar.classList.remove('active');
   }

   // 모든 서브 메뉴에 대한 이벤트 추가
   subMenus.forEach(subMenu => {
       navbar.addEventListener('mouseenter', () => {
           subMenu.classList.add('active');
       });

       navbar.addEventListener('mouseleave', () => {
           subMenu.classList.remove('active');
       });
   });
});
