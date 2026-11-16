// Ceylon Odyssey Travels — interactions
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const bookingModal = document.getElementById("bookingModal");
const modalMessage = document.getElementById("modalMessage");
const modalWhatsApp = document.getElementById("modalWhatsApp");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".book-btn").forEach(button => {
  button.addEventListener("click", () => {
    const packageName = button.dataset.package;
    modalMessage.textContent = `Great choice! You selected the ${packageName}. Send us a message and our team can help tailor the trip to your dates and interests.`;
    const message = encodeURIComponent(`Hello Ceylon Odyssey Travels, I'm interested in the ${packageName}. Please share more details.`);
    modalWhatsApp.href = `https://wa.me/94770000000?text=${message}`;
    if (typeof bookingModal.showModal === "function") bookingModal.showModal();
    else alert(`Thanks for your interest in our ${packageName}! Please contact us on WhatsApp.`);
  });
});

document.getElementById("modalClose").addEventListener("click", () => bookingModal.close());
bookingModal.addEventListener("click", event => {
  if (event.target === bookingModal) bookingModal.close();
});

document.getElementById("year").textContent = new Date().getFullYear();

if (window.lucide) lucide.createIcons();
