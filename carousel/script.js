let intervalId = setInterval(rollImage, 3000);

function rollImage() {
  const displayingImage = toggleDisplayingImage();
  const nextImage = displayingImage.nextElementSibling;

  const displayedCircle = toggleDisplayingCircle();
  const nextCircle = displayedCircle.nextElementSibling;

  if (nextImage != null && nextCircle != null) {
    nextImage.classList.add("show");
    nextCircle.classList.add("on");
  } else {
    showFirstImage();
    firstCircleOn();
  }
}

const prev = document.querySelector(".prev");
prev.addEventListener("click", showPreviousImage);

function showPreviousImage() {
  clearInterval(intervalId);

  const displayingImage = toggleDisplayingImage();
  const previousImage = displayingImage.previousElementSibling;

  const displayingCircle = toggleDisplayingCircle();
  const previousCircle = displayingCircle.previousElementSibling;

  if (previousImage != null && previousCircle != null) {
    previousImage.classList.add("show");
    previousCircle.classList.add("on");
  } else {
    showLastImage();
    lastCircleOn();
  }

  intervalId = setInterval(rollImage, 3000);
}

let next = document.querySelector(".next");
next.addEventListener("click", showNextImage);
function showNextImage() {
  clearInterval(intervalId);
  rollImage();
  intervalId = setInterval(rollImage, 3000);
}

function toggleDisplayingImage() {
  const displayingImage = document.querySelector(".image-list.show");
  displayingImage.classList.toggle("show");
  return displayingImage;
}

function toggleDisplayingCircle() {
  const displayingCircle = document.querySelector(".circle.on");
  displayingCircle.classList.toggle("on");
  return displayingCircle;
}

function showFirstImage() {
  const firstImage = document.querySelectorAll(".image-list")[0];
  firstImage.classList.add("show");
}

function firstCircleOn() {
  const firstCircle = document.querySelectorAll(".circle")[0];
  firstCircle.classList.add("on");
}

function showLastImage() {
  const lastImage = document.querySelectorAll(".image-list")[3];
  lastImage.classList.add("show");
}

function lastCircleOn() {
  const lastCircle = document.querySelectorAll(".circle")[3];
  lastCircle.classList.add("on");
}

const disc = document.querySelector(".disc");
disc.addEventListener("click", circleClicked);
function circleClicked(e) {
  const index = getCircleIndex(e.target);

  clearInterval(intervalId);

  toggleDisplayingImage();
  toggleDisplayingCircle();

  const image = document.querySelectorAll(".image-list")[index];
  const circle = document.querySelectorAll(".circle")[index];
  image.classList.add("show");
  circle.classList.add("on");

  intervalId = setInterval(rollImage, 3000);
}

function getCircleIndex(circle) {
  let i = 0;
  while (circle.previousElementSibling) {
    i++;
    circle = circle.previousElementSibling;
  }

  return i;
}
