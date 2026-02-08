const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// No button run
noBtn.addEventListener("mouseover", () => {

  // container ke andar hi boundary
  const containerRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 20; // edges se thoda gap

  const minX = padding;
  const maxX = containerRect.width - btnRect.width - padding;

  const minY = padding;
  const maxY = containerRect.height - btnRect.height - padding;

  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
});

// Yes button
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "block";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block";
    gifResult.play();
  }, 2500);
});

// Flowers
const flowerBox = document.querySelector(".flowers-container");
const flowers = ["🌸", "🌹", "💐", "❤️", "✨"];

for (let i = 0; i < 25; i++) {
  const f = document.createElement("div");
  f.className = "flower";
  f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
  f.style.left = Math.random() * 100 + "vw";
  f.style.animationDuration = 5 + Math.random() * 5 + "s";
  flowerBox.appendChild(f);
}

// Gallery open
const galleryBtn = document.querySelector(".js-gallery-trigger");
const galleries = document.querySelectorAll(".js-side-gallery");

galleryBtn.addEventListener("click", () => {
  galleries.forEach(g => g.classList.toggle("revealed"));
});

// Lightbox
const lightbox = document.querySelector(".js-lightbox");
const lightboxContent = document.querySelector(".js-lightbox-content");
const closeBtn = document.querySelector(".js-close-lightbox");

document.querySelectorAll(".gallery-item img, .gallery-item video")
  .forEach(item => {
    item.addEventListener("click", () => {
      item.parentElement.classList.add("opened");

      lightboxContent.innerHTML = "";
      const clone = item.cloneNode(true);

      if (clone.tagName === "VIDEO") {
        clone.controls = true;
        clone.autoplay = false;
      }

      lightboxContent.appendChild(clone);
      lightbox.classList.add("active");
    });
  });

closeBtn.onclick = closeLightbox;
lightbox.onclick = e => e.target === lightbox && closeLightbox();

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxContent.innerHTML = "";
}
