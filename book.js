const newsletterForms = document.querySelectorAll(".form");
const menu = document.querySelector(".menu");
const menuToggle = document.querySelector("#checkbox");
const flyoutLinks = document.querySelectorAll(".flyout a");
const subscribeButtons = document.querySelectorAll(".nav-subscribe-btn");

function createFormStatus(form) {
  const status = document.createElement("p");
  status.className = "form-status";
  status.setAttribute("aria-live", "polite");
  form.append(status);
  return status;
}

function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = form.querySelector('input[type="email"]');
  const status = form.querySelector(".form-status") || createFormStatus(form);

  if (!emailInput.value.trim() || !emailInput.validity.valid) {
    status.textContent = "Please enter a valid email address.";
    status.className = "form-status form-status-error";
    emailInput.focus();
    return;
  }

  status.textContent = `Thanks for subscribing with ${emailInput.value.trim()}!`;
  status.className = "form-status form-status-success";
  form.reset();
}

function closeFlyout() {
  if (menuToggle) {
    menuToggle.checked = false;
  }
}

function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll('.menu > a[href$=".html"]').forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    link.classList.toggle("active", linkPage === currentPage);
  });
}

newsletterForms.forEach((form) => {
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput) {
    emailInput.required = true;
  }
  form.addEventListener("submit", handleNewsletterSubmit);
});

subscribeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const newsletter = document.querySelector("#newsletter") || newsletterForms[0];
    newsletter?.scrollIntoView({ behavior: "smooth", block: "center" });
    newsletter?.querySelector('input[type="email"]')?.focus({ preventScroll: true });
    closeFlyout();
  });
});

flyoutLinks.forEach((link) => link.addEventListener("click", closeFlyout));

document.addEventListener("click", (event) => {
  if (menuToggle?.checked && menu && !menu.contains(event.target)) {
    closeFlyout();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFlyout();
  }
});

updateActiveNavLink();
