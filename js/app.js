// ********** navbar toggle ************
const navBtn = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
navBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});

// ********** set date ************
const date = (document.getElementById("date").innerHTML =
  new Date().getFullYear());
