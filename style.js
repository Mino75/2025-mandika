document.addEventListener("DOMContentLoaded", function () {
    // Inject responsive CSS styles
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background: #f5f5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
      }
      h1 {
        margin-top: 20px;
        color: #333;
      }
      .container {
        width: 90%;
        max-width: 600px;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        margin: 20px 0;
      }
      select, input[type="file"], button {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      button:hover {
        background-color: #45a049;
      }
      video, canvas {
        max-width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 10px 0;
      }
      #result {
        word-wrap: break-word;
        white-space: pre-wrap;
        background: #eaeaea;
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
      }
      @media (max-width: 600px) {
        h1 {
          font-size: 24px;
        }
        select, input[type="file"], button {
          font-size: 14px;
        }
      }
   #loader {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,0.9);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      text-align: center;
      font-size: 18px;
    }
    `;
    document.head.appendChild(style);
  
    // Optionally wrap your elements in a container for layout control
    const container = document.createElement("div");
    container.className = "container";
    while (document.body.firstChild) {
      container.appendChild(document.body.firstChild);
    }
    document.body.appendChild(container);
  
    // Set initial display for dynamic elements
    const canvas = document.getElementById("imageCanvas");
    canvas.style.display = "none";
  
    const fileType = document.getElementById("fileType");
    const fileInput = document.getElementById("fileInput");
    const cameraButton = document.getElementById("cameraButton");
    const video = document.getElementById("video");
  
    fileType.addEventListener("change", function () {
      if (fileType.value === "camera") {
        fileInput.style.display = "none";
        cameraButton.style.display = "inline-block";
        video.style.display = "inline-block";
      } else {
        fileInput.style.display = "inline-block";
        cameraButton.style.display = "none";
        video.style.display = "none";
      }
    });
  });
  