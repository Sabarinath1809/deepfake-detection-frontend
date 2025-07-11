/***** element handles *****/
const fileInput     = document.getElementById("fileInput");   // hidden <input type="file">
const chooseBtn     = document.getElementById("chooseBtn");   // white button the user clicks
const fileNameEl    = document.getElementById("fileName");    // span that shows chosen filename
const termsChk      = document.getElementById("termsChk");    // checkbox
const scanBtn       = document.getElementById("scanBtn");     // teal Scan button

/* progress + result */
const progressShell = document.getElementById("progressShell");
const progressFill  = document.getElementById("progressFill");
const resultPanel   = document.getElementById("resultPanel");
const verdict       = document.getElementById("verdict");
const confText      = document.getElementById("confText");
const heatImg       = document.getElementById("heatImg");

/*************************************************
  1.  OPEN FILE‑CHOOSER WHEN WHITE BUTTON CLICKED
**************************************************/
chooseBtn.addEventListener("click", () => fileInput.click());

/*************************************************
  2.  WHEN FILE SELECTED → SHOW NAME + COLOR BTN
**************************************************/
fileInput.addEventListener("change", () => {
  const picked = fileInput.files.length > 0;

  // show chosen filename or fallback text
  fileNameEl.textContent = picked
    ? fileInput.files[0].name
    : "No file selected";

  // change button background if file chosen
  chooseBtn.style.background = picked ? "var(--accent)" : "#fff";

  console.log("FILE PICKED:", picked ? fileInput.files[0] : "none");

  setScanReadyState();
});

/*************************************************
  3.  ENABLE/DISABLE SCAN BASED ON FILE + TERMS
**************************************************/
termsChk.addEventListener("change", setScanReadyState);

function setScanReadyState() {
  scanBtn.disabled = !(termsChk.checked && fileInput.files.length);
}

/*************************************************
  4.  SIMULATED SCAN SEQUENCE (replace with API)
**************************************************/
scanBtn.addEventListener("click", () => {
  // lock UI and show progress bar
  scanBtn.disabled    = true;
  progressShell.hidden = false;
  let pct = 0;

  const timer = setInterval(() => {
    pct += 8;
    progressFill.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(timer);
      showDemoResult();   // pretend inference finished
    }
  }, 120);
});

/*************************************************
  5.  DEMO RESULT (random REAL/FAKE)
**************************************************/
function showDemoResult() {
  const isFake = Math.random() > 0.5;

  verdict.textContent = isFake ? "FAKE" : "REAL";
  verdict.className   = "verdict " + (isFake ? "FAKE" : "REAL");

  confText.textContent =
    "Confidence – " + (90 + Math.floor(Math.random() * 9)) + " %";

  // placeholder heat‑map image (replace with real Grad‑CAM)
  heatImg.src =
    "https://via.placeholder.com/520x220.png?text=Grad‑CAM+heat‑map";

  progressShell.hidden = true;
  resultPanel.hidden   = false;
}

/*************************************************
  6.  RESET AFTER “Scan another”
**************************************************/
function resetUI() {
  fileInput.value = "";                // clear chosen file
  fileNameEl.textContent = "No file selected";
  chooseBtn.style.background = "#fff";

  progressFill.style.width = "0";
  resultPanel.hidden = true;

  setScanReadyState();
}

