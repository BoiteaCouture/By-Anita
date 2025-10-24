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

  const hash = window.location.hash;
  if (hash) {
    // Exemple : #sacs  -> bouton :  #sacs-btn,  contenu :  #sacs-content
    const btn = document.querySelector(hash + "-btn");
    const content = document.querySelector(hash + "-content");

    if (btn && content) {
      // Ouvre le bon accordion
      btn.setAttribute("aria-expanded", "true");
      content.removeAttribute("hidden");

      // Facultatif : ajouter une classe visuelle si tu en as une (ex: "open")
      btn.classList.add("open");

      // Défilement vers la section ouverte
      setTimeout(() => {
        content.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

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
  function changeSlide(btn, n) {
    const carousel = btn.parentElement;
    const images = carousel.querySelectorAll(".carousel-img");
    let idx = Array.from(images).findIndex((img) =>
      img.classList.contains("active")
    );
    images[idx].classList.remove("active");
    idx = (idx + n + images.length) % images.length;
    images[idx].classList.add("active");
  }

  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      const content = document.getElementById(
        btn.getAttribute("aria-controls")
      );
      content.hidden = expanded;
    });
  });