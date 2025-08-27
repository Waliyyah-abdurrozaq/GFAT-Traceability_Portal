const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const toggleBtn = document.getElementById("toggle-btn");

// Helper to detect small screens (matches CSS breakpoint)
const isMobile = () => window.matchMedia('(max-width: 576px)').matches;

// Ensure correct state on resize
window.addEventListener('resize', () => {
  if (isMobile()) {
    sidebar?.classList.remove('collapsed');
    main?.classList.remove('collapsed');
  } else {
    sidebar?.classList.remove('active');
  }
});

// Toggle sidebar
toggleBtn?.addEventListener("click", () => {
  if (isMobile()) {
    sidebar?.classList.toggle("active");
  } else {
    sidebar?.classList.toggle("collapsed");
    main?.classList.toggle("collapsed");
  }
});

// Close sidebar on link click (mobile)
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    if (isMobile()) sidebar?.classList.remove('active');
    document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Smooth scrolling
document.querySelectorAll('.sidebar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith("#")) {
      e.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Collapsible compliance
document.querySelectorAll(".collapsible").forEach(button => {
  button.addEventListener("click", function() {
    this.classList.toggle("active");
    const contentBox = this.nextElementSibling;
    if (contentBox) {
      contentBox.style.display = (contentBox.style.display === "block") ? "none" : "block";
    }
  });
});

// Search filter
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", function() {
    const filter = searchInput.value.toLowerCase();
    ["traceTable", "reportTable"].forEach(tableId => {
      const table = document.getElementById(tableId);
      if (table) {
        const rows = table.getElementsByTagName("tr");
        for (let i = 1; i < rows.length; i++) {
          const rowText = rows[i].textContent.toLowerCase();
          rows[i].style.display = rowText.includes(filter) ? "" : "none";
        }
      }
    });
  });
}

// Close sidebar on ESC (mobile)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobile()) sidebar?.classList.remove('active');
});