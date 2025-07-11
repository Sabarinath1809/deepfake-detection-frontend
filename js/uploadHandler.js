const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const analyseBtn = document.getElementById("analyseBtn");
const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const resultCard = document.getElementById("resultCard");
const resultBadge = document.getElementById("resultBadge");
const confidenceText = document.getElementById("confidenceText");
const heatmapImg = document.getElementById("heatmapImg");

let selectedFile = null;

/* ---------- Drag & Drop ----------- */
["dragenter", "dragover"].forEach(evt =>
  dropZone.addEventListener(evt, e => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--accent)";
  })
);

["dragleave", "drop"].forEach(evt =>
  dropZone.addEventListener(evt, e => {
    e.preventDefault();
    dropZone.style.borderColor = "#333";
  })
);

dropZone.addEventListener("drop", e => {
  selectedFile = e.dataTransfer.files[0];
  afterFileSelect();
});

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  selectedFile = fileInput.files[0];
  afterFileSelect();
});

function afterFileSelect() {
  if (!selectedFile) return;
  dropZone.querySelector(".dz-text").textContent = selectedFile.name;
  analyseBtn.disabled = false;
}

/* ---------- Analyse Button ---------- */
analyseBtn.addEventListener("click", () => {
  if (!selectedFile) return;
  simulateUploadAndDetect();
});

/* ---------- Simulated Detection ---------- */
function simulateUploadAndDetect() {
  analyseBtn.disabled = true;
  progressWrap.style.display = "block";
  progressBar.style.width = "0";

  let progress = 0;
  const fakeInterval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(fakeInterval);
      showFakeResult(); // Replace with real fetch() when backend ready
    }
  }, 200);
}

function showFakeResult() {
  // ----- Fake verdict -----
  const isFake = Math.random() > 0.5;
  resultBadge.textContent = isFake ? "FAKE" : "REAL";
  resultBadge.className = `result-badge ${isFake ? "FAKE" : "REAL"}`;
  confidenceText.textContent = `Confidence: ${Math.floor(
    80 + Math.random() * 20
  )}%`;

  // Placeholder heatmap image (replace later)
  heatmapImg.src =
    "https://via.placeholder.com/400x200.png?text=Grad-CAM+Heatmap";

  resultCard.hidden = false;
  progressWrap.style.display = "none";
}

function resetUI() {
  selectedFile = null;
  dropZone.querySelector(".dz-text").textContent =
    "Drag & drop a file here or browse";
  analyseBtn.disabled = true;
  resultCard.hidden = true;
  heatmapImg.src = "";
}
