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

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "";
    status.removeAttribute("data-state");
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      status.textContent = "Message sent. Thank you — I’ll be in touch.";
      status.dataset.state = "success";
    } catch {
      status.textContent = "Message could not be sent. Please try again or use the email link below.";
      status.dataset.state = "error";
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
});
