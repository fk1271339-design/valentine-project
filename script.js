// ================= BASIC SELECTORS =================
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// 🔴 NEW: front image (GIF hata di, image lagai)
const frontImg = document.querySelector(".local-gif");
// ⚠️ HTML me image par ye class honi chahiye:
// <img src="front img.jpeg" class="front-img">

// ================= NO BUTTON FIX =================
noBtn.addEventListener("mouseover", () => {

  if (!frontImg) return; // safety

  const imgRect = frontImg.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 10;

  // 👉 sirf image ke aas-paas
  const minX = imgRect.left - btnRect.width / 2;
  const maxX = imgRect.right - btnRect.width / 2;

  // 👉 mid area only (neeche nahi jayega)
  const minY = imgRect.top + imgRect.height * 0.25;
  const maxY = imgRect.top + imgRect.height * 0.8;

  // 👉 screen se bahar na jaye
  const safeMinX = Math.max(padding, minX);
  const safeMaxX = Math.min(window.innerWidth - btnRect.width - padding, maxX);

  const safeMinY = Math.max(padding, minY);
  const safeMaxY = Math.min(window.innerHeight / 2, maxY);

  const randomX = Math.random() * (safeMaxX - safeMinX) + safeMinX;
  const randomY = Math.random() * (safeMaxY - safeMinY) + safeMinY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
});

// ================= YES BUTTON =================
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "block";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block";
    if (gifResult) gifResult.play();
  }, 2500);
});

// ================= FLOWERS =================
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

// ================= GALLERY =================
const galleryBtn = document.querySelector(".js-gallery-trigger");
const galleries = document.querySelectorAll(".js-side-gallery");

galleryBtn.addEventListener("click", () => {
  galleries.forEach(g => g.classList.toggle("revealed"));
});

// ================= LIGHTBOX =================
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
