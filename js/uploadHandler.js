const fileInput  = document.getElementById("fileInput");
const chooseBtn  = document.getElementById("chooseBtn");
const fileNameEl = document.getElementById("fileName");
const termsChk   = document.getElementById("termsChk");
const scanBtn    = document.getElementById("scanBtn");

const progressShell = document.getElementById("progressShell");
const progressFill  = document.getElementById("progressFill");
const resultPanel   = document.getElementById("resultPanel");
const verdict       = document.getElementById("verdict");
const confText      = document.getElementById("confText");
const heatImg       = document.getElementById("heatImg");

chooseBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  const picked = fileInput.files.length > 0;
  fileNameEl.textContent = picked ? fileInput.files[0].name : "No file selected";
  chooseBtn.style.background = picked ? "var(--accent)" : "#fff";
  chooseBtn.style.color = picked ? "#fff" : "#000";
  scanBtn.disabled = !(picked && termsChk.checked);
});

termsChk.addEventListener("change", () => {
  scanBtn.disabled = !(termsChk.checked && fileInput.files.length > 0);
});

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
  verdict.className = "verdict " + (fake ? "FAKE" : "REAL");
  confText.textContent = "Confidence – " + (90 + Math.floor(Math.random() * 9)) + " %";
  heatImg.src = "https://via.placeholder.com/520x220.png?text=Grad‑CAM+heatmap";
  resultPanel.hidden = false;
  progressShell.hidden = true;
}

function resetUI() {
  fileInput.value = "";
  fileNameEl.textContent = "No file selected";
  chooseBtn.style.background = "#fff";
  chooseBtn.style.color = "#000";
  progressFill.style.width = "0";
  resultPanel.hidden = true;
  scanBtn.disabled = true;
}
