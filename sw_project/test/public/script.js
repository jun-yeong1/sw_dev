document.addEventListener('DOMContentLoaded', function() {
    var yearElement = document.getElementById('year');
    var currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});
