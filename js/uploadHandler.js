const fileInput = document.getElementById("fileInput");
const termsChk  = document.getElementById("termsChk");
const scanBtn   = document.getElementById("scanBtn");
const progressShell = document.getElementById("progressShell");
const progressFill  = document.getElementById("progressFill");
const resultPanel   = document.getElementById("resultPanel");
const verdict       = document.getElementById("verdict");
const confText      = document.getElementById("confText");
const heatImg       = document.getElementById("heatImg");

fileInput.addEventListener("change", () => {
  console.log("FILE PICKED", fileInput.files);
  checkReady();
});
termsChk.addEventListener("change", checkReady);

function checkReady(){
  scanBtn.disabled = !(termsChk.checked && fileInput.files.length);
}

scanBtn.addEventListener("click", () => {
  scanBtn.disabled = true;
  progressShell.hidden = false;
  let pct = 0;
  const t = setInterval(()=>{
    pct+=10;
    progressFill.style.width = pct+"%";
    if(pct>=100){clearInterval(t); showDemo();}
  },120);
});

function showDemo(){
  const fake = Math.random()>.5;
  verdict.textContent = fake?"FAKE":"REAL";
  verdict.className = "verdict "+(fake?"FAKE":"REAL");
  confText.textContent = "Confidence – "+(90+Math.floor(Math.random()*9))+" %";
  heatImg.src="https://via.placeholder.com/520x220.png?text=Grad‑CAM";
  resultPanel.hidden=false;
  progressShell.hidden=true;
}

function resetUI(){
  fileInput.value="";
  progressFill.style.width="0";
  resultPanel.hidden=true;
  checkReady();
}
