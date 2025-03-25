document.addEventListener("DOMContentLoaded", function () {
  // ELEMENTS AUDIO //
  const soundDown = document.getElementById("sound-down");
  const soundUp = document.getElementById("sound-up");
  const soundClick = document.getElementById("sound-click");
  
document.querySelectorAll(".sound-prrt").forEach((element) => {
  element.addEventListener("click", () => soundClick.play());
});
  // ELEMENTS AUDIO //
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // BURGER MENU
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");
  let isMenuOpen = false;

  function toggleMenu(open) {
    navMenu.classList.toggle("show", open);
    burgerMenu.classList.toggle("open", open);
    burgerMenu.classList.toggle("close", !open);
    if (open) {
      soundUp.play();
    } else if (isMenuOpen) {
      soundDown.play();
    }
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

  window.addEventListener("scroll", () => isMenuOpen && toggleMenu(false));

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      soundClick.play();
      setTimeout(() => {
        window.location.href = link.href;
      }, 600); 
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
  // CONTACT SUBMISSION
  const form = document.querySelector("form");
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitButton.textContent = "Envoi en cours...";
    submitButton.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          submitButton.textContent = "Merci pour votre message !";
          submitButton.style.backgroundColor = "#4CAF50";
          form.reset();
        } else {
          throw new Error("Erreur lors de l'envoi du formulaire");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        submitButton.textContent = "Erreur. Réessayez.";
        submitButton.style.backgroundColor = "#f44336";
      })
      .finally(() => {
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = "";
          submitButton.disabled = false;
        }, 3000);
      });
  });
  // CONTACT SUBMISSION //
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // CAROUSEL //
  const carousel = document.querySelector(".carousel");
  const images = carousel.querySelectorAll("img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentIndex = 0;
  let intervalId;
  let dots = [];
  let touchStartX = 0;
  let touchEndX = 0;

  function createDots() {
    // Supprimer les dots existants avant de recréer
    while (dotsContainer.firstChild) {
      dotsContainer.removeChild(dotsContainer.firstChild);
    }
    dots = [];

    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
      dots.push(dot);

      dot.addEventListener("click", () => goToImage(index));
    });
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToImage(index) {
    currentIndex = index;
    showImage(currentIndex);
    resetAutoSlide();
  }

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove("active", "previous", "next");

      if (i === index) {
        img.classList.add("active");
      } else if (i === (index - 1 + images.length) % images.length) {
        img.classList.add("previous");
      } else if (i === (index + 1) % images.length) {
        img.classList.add("next");
      }
    });
    updateDots();
  }

  function handleSwipe() {
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  function startAutoSlide() {
    intervalId = setInterval(nextImage, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Gestion des événements tactiles
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {
    handleSwipe();
    touchStartX = 0;
    touchEndX = 0;
  });

  // Gestion des clics
  prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
  });

  // Gestion du survol
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Initialisation
  function initCarousel() {
    createDots();
    showImage(currentIndex);
    startAutoSlide();

    // Positionnement initial des images
    images.forEach((img, i) => {
      if (i < currentIndex) img.classList.add("previous");
      if (i > currentIndex) img.classList.add("next");
    });
  }

  initCarousel();
  // CAROUSEL //
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // MISE A JOUR AUTOMATIQUE DE L'ANNEE DE COPYRIGHT //
  document.getElementById("year").textContent = new Date().getFullYear();
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // CUSTOM SELECT LOGIC //
  const customSelect = document.querySelector(".custom-select");
  const input = customSelect.querySelector('input[type="text"]');
  const options = customSelect.querySelector("#options");
  const selectedIcon = customSelect.querySelector(".selected-icon");

  function toggleOptions() {
    customSelect.classList.toggle("open");
    options.style.display = options.style.display === "none" ? "block" : "none";
  }

  input.addEventListener("click", toggleOptions);

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      options.style.display = "none";
      customSelect.classList.remove("open");
    }
  });

  options.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      input.value = li.dataset.value;
      selectedIcon.className = `selected-icon ${li.dataset.icon}`;
      options.style.display = "none";
      customSelect.classList.remove("open");
    }
  });
  // CUSTOM SELECT LOGIC //
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // FORM BOLD //
  const formWrapper = document.querySelector(".formbold-form-wrapper");
  const formActionButton = document.querySelector(".formbold-action-btn");

  formActionButton.addEventListener("click", () => {
    formWrapper.classList.toggle("active");
    formActionButton.classList.toggle("active");
  });
  // FORM BOLD //
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
});
