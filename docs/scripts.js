document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

document.querySelectorAll(".sub-tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".sub-tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".sub-tab-content")
      .forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});
