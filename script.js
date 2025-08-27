const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");

//LOGIN
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    alert("Login successful!");
    localStorage.setItem("token", "sample_token"); // fake login token

    // Show sidebar + hamburger
    sidebar.style.display = "block";
    hamburger.style.display = "block";

    // Show dashboard
    showPage("dashboard");
  } else {
    alert("Invalid credentials. Try admin/1234.");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");

  // Hide sidebar + hamburger
  sidebar.style.display = "none";
  hamburger.style.display = "none";

  // Show login page again
  showPage("login");
}

// PAGE NAVIGATION
function showPage(pageId) {
  document.querySelectorAll("section").forEach(section => {
    section.style.display = "none";
  });
  document.getElementById(pageId).style.display = "block";
}

//SIDEBAR TOGGLE
hamburger.addEventListener("click", () => {
  if (sidebar.style.display === "block") {
    sidebar.style.display = "none";
  } else {
    sidebar.style.display = "block";
  }
});

// ON PAGE LOAD 
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    // Already logged in → show dashboard
    sidebar.style.display = "block";
    hamburger.style.display = "block";
    showPage("dashboard");
  } else {
    // Not logged in → show login
    sidebar.style.display = "none";
    hamburger.style.display = "none";
    showPage("login");
  }
});