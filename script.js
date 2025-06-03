console.log("started my project...");

const toggleBtn = document.querySelector(".dark-toggle-btn");

if (localStorage.getItem("darkMode" === "enabled")) {
  document.body.classList.add("dark");
}
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
