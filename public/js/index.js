document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");
  let isMenuOpen = false;

  function toggleMenu(open) {
    navMenu.classList.toggle("show", open);
    burgerMenu.classList.toggle("open", open);
    burgerMenu.classList.toggle("close", !open);
    isMenuOpen = open;
  }

  burgerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu(!isMenuOpen);
  });

  document.addEventListener("click", (event) => {
    if (
      !navMenu.contains(event.target) &&
      !burgerMenu.contains(event.target) &&
      isMenuOpen
    ) {
      toggleMenu(false);
    }
  });

  window.addEventListener("scroll", () => {
    if (isMenuOpen) toggleMenu(false);
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      toggleMenu(false);
      
    });
  });
});



  // BURGER MENU //
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  // INTERSECTION OBSERVER
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("visible", entry.isIntersecting)
      );
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll("h1, h2")
    .forEach((title) => observer.observe(title));
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  
  // MISE A JOUR AUTOMATIQUE DE L'ANNEE DE COPYRIGHT //
  document.getElementById("year").textContent = new Date().getFullYear();
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
