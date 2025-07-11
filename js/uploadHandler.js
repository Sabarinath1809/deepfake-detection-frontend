const fileInput = document.getElementById("fileInput");
const termsChk  = document.getElementById("termsChk");
const scanBtn   = document.getElementById("scanBtn");
const progressShell = document.getElementById("progressShell");
const progressFill  = document.getElementById("progressFill");
const resultPanel   = document.getElementById("resultPanel");
const verdict       = document.getElementById("verdict");
const confText      = document.getElementById("confText");
const heatImg       = document.getElementById("heatImg");

/* Enable Scan only when a file is chosen and terms accepted */
function ready() {
  scanBtn.disabled = !(termsChk.checked && fileInput.files.length > 0);
}
fileInput.addEventListener("change", ready);
termsChk.addEventListener("change", ready);

/* Fake scan for demo purposes */
scanBtn.addEventListener("click", () => {
  scanBtn.disabled = true;
  progressShell.hidden = false;
  let pct = 0;
  const t = setInterval(() => {
    pct += 10;
    progressFill.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(t);
      showDemo();
    }
  }, 120);
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
  progressFill.style.width = "0";
  resultPanel.hidden = true;
  ready();
}
