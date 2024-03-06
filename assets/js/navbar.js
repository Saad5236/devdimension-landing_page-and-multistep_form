

const afterDOMLoadFunctionality = () => {
    const navbar = document.querySelector(".navbar-wrapper")

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
          navbar.classList.add('navbar-box-shadow');
        } else {
          navbar.classList.remove('navbar-box-shadow');
        }
      });
}


document.addEventListener("DOMContentLoaded", afterDOMLoadFunctionality)