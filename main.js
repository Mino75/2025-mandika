if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker Registered:', reg))
    .catch(err => console.error('Service Worker Registration Failed:', err));
}


Tesseract.langPath = '/tessdata';

document.getElementById("fileInput").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async function(event) {
            const pdfData = new Uint8Array(event.target.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let extractedText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                extractedText += textContent.items.map(item => item.str).join(" ") + "\n";
            }

            document.getElementById("result").textContent = extractedText;
        };
        reader.readAsArrayBuffer(file);
    } else {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById("imageCanvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                processImage();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("cameraButton").addEventListener("click", function() {
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Error accessing camera:", err));

    setTimeout(() => {
        const canvas = document.getElementById("imageCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        processImage();
    }, 3000);
});

async function processImage() {
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Show the loader

    const canvas = document.getElementById("imageCanvas");
    const resultElement = document.getElementById("result");

    // Retrieve selected language; default to 'eng'
    const langSelect = document.getElementById("langSelect");
    const lang = langSelect ? langSelect.value : 'eng';

    try {
      const { data: { text } } = await Tesseract.recognize(
          canvas,
          lang,  // Use the selected language
          { logger: m => console.log(m) }
      );
      resultElement.textContent = text;
    } catch (error) {
      console.error("Error during OCR:", error);
      resultElement.textContent = "Error during OCR processing.";
    } finally {
      loader.style.display = "none"; // Hide loader
    }
}


function downloadText() {
    const text = document.getElementById("result").textContent;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "extracted_text.txt";
    link.click();
}

function processFile() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files && fileInput.files.length > 0) {
      // If the file is an image, call processImage (PDFs are processed on file selection)
      if (fileInput.files[0].type !== "application/pdf") {
        processImage();
      } else {
        alert("PDF processing occurs automatically upon file selection.");
      }
    } else {
      alert("Please select a file first.");
    }
  }