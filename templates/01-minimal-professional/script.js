// This template needs very little JavaScript. The page content works without it.
document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".navigation__links");

if (menuButton && navigationLinks) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigationLinks.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigationLinks.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

// CUSTOMIZE: No change is needed here. This keeps the footer year current.
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
