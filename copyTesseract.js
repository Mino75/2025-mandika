const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'node_modules', 'tesseract.js', 'dist', 'tesseract.min.js');
const destination = path.join(__dirname, 'tesseract.min.js');

console.log("Copying from:", source);
console.log("Copying to:", destination);

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying tesseract.min.js:', err);
  } else {
    console.log('tesseract.min.js copied successfully!');
  }
});
