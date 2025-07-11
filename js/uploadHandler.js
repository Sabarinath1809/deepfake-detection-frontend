const fileInput = document.getElementById("fileInput");
const fileLabel = document.getElementById("fileLabel");
const termsChk  = document.getElementById("termsChk");
const scanBtn   = document.getElementById("scanBtn");
const progressShell = document.getElementById("progressShell");
const progressFill  = document.getElementById("progressFill");
const resultPanel   = document.getElementById("resultPanel");
const verdict       = document.getElementById("verdict");
const confText      = document.getElementById("confText");
const heatImg       = document.getElementById("heatImg");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    fileLabel.classList.add("filled");
    fileLabel.firstChild.textContent = fileInput.files[0].name;
  } else {
    fileLabel.classList.remove("filled");
    fileLabel.firstChild.textContent = "Choose Image / Video";
  }
  ready();
});
termsChk.addEventListener("change", ready);

function ready() {
  scanBtn.disabled = !(termsChk.checked && fileInput.files.length > 0);
}

/* Simulated scan */
scanBtn.addEventListener("click", () => {
  scanBtn.disabled = true;
  progressShell.hidden = false;
  let pct = 0;
  const t = setInterval(() => {
    pct += 8;
    progressFill.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(t);
      showDemo();
    }
  }, 100);
});

function showDemo() {
  const fake = Math.random() > 0.5;
  verdict.textContent = fake ? "FAKE" : "REAL";
  verdict.className = `verdict ${fake ? "FAKE" : "REAL"}`;
  confText.textContent = `Confidence – ${Math.floor(85 + Math.random()*14)} %`;
  heatImg.src = "https://via.placeholder.com/500x220.png?text=Grad‑CAM+heat‑map";
  resultPanel.hidden = false;
  progressShell.hidden = true;
}

function resetUI() {
  fileInput.value = "";
  fileLabel.classList.remove("filled");
  fileLabel.firstChild.textContent = "Choose Image / Video";
  progressFill.style.width = "0";
  resultPanel.hidden = true;
  ready();
}
