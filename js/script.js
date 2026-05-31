const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name")?.toString().trim() || "";
  const email = data.get("email")?.toString().trim() || "";
  const subject = data.get("subject")?.toString().trim() || "Consulta";
  const message = data.get("message")?.toString().trim() || "";
  const body = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    "",
    message
  ].join("\n");

  const mailto = new URL("mailto:contacto@esenciaycambio.com");
  mailto.searchParams.set("subject", `Esencia & Cambio - ${subject}`);
  mailto.searchParams.set("body", body);
  window.location.href = mailto.toString();
});
