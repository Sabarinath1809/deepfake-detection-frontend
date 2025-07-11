function handleUpload() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  // For now, just simulate the detection result
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>Analyzing <strong>${file.name}</strong>... (fake result: REAL)</p>`;
}

