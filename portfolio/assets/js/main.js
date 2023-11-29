document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav_toggle");
  const navClose = document.getElementById("nav__close");
  const navLink = document.querySelectorAll(".nav__link");
  const header = document.getElementById("header");
  const scrollUp = document.getElementById("scroll-up");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  navToggle?.addEventListener("click", () =>
    navMenu.classList.toggle("show-menu")
  );

  navClose?.addEventListener("click", () =>
    navMenu.classList.remove("show-menu")
  );

  navLink.forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
      smoothScroll(link.getAttribute("href").substring(1));
    })
  );

  const blurHeader = () => {
    window.scrollY >= 50
      ? header.classList.add("blur-header")
      : header.classList.remove("blur-header");
  };
  window.addEventListener("scroll", blurHeader);

  const smoothScroll = (targetId) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 57,
        behavior: "smooth",
      });
    }
  };

  const updateScrollUp = () => {
    window.scrollY >= 350
      ? scrollUp.classList.add("show-scroll")
      : scrollUp.classList.remove("show-scroll");
  };
  window.addEventListener("scroll", updateScrollUp);

  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute("id");
      const sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass.classList.add("active-link");
      } else {
        sectionsClass.classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6400oqf",
        "template_umbjvfi",
        "#contact-form",
        "nCDB_fp_Dv1ZHe_mj"
      )
      .then(() => {
        contactMessage.textContent = "Mensagem enviada com sucesso ✅";

        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        contactForm.reset();
      })
      .catch(() => {
        contactMessage.textContent = "Mensagem não enviada ❌";
      });
  };

  contactForm.addEventListener("submit", sendEmail);

  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
    reset: true,
  });

  sr.reveal(
    ".home__data, .home__social, .contact__container, .footer__container"
  );
  sr.reveal(".home__image", { origin: "bottom" });
  sr.reveal(".about__data, .skills__data", { origin: "left" });
  sr.reveal(".about__image, .skills__content", { origin: "right" });
  sr.reveal(".services__card, .projects__card", { interval: 100 });
});
