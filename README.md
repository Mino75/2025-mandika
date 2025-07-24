# 📷 Mandika OCR

## 📋 Table of Contents
- [📖 About](#-about)
- [🚀 Getting Started](#-getting-started)
- [🔨 How to Build / How to Run](#-how-to-build--how-to-run)
- [🏗️ Project Structure](#️-project-structure)
- [🎯 Features](#-features)
- [📚 Dependencies](#-dependencies)
- [🐳 Docker Deployment](#-docker-deployment)
- [💡 Usage](#-usage)
- [📄 License](#-license)

## 📖 About
Mandika is an offline OCR (Optical Character Recognition) Progressive Web App that extracts text from images and PDF documents. Built with Tesseract.js and PDF.js, it provides powerful text recognition capabilities that work entirely in the browser without requiring server-side processing.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm package manager
- Modern web browser with FileReader API support

### 📦 Installation
```bash
git clone <repository-url>
cd mandika
npm install
```

## 🔨 How to Build / How to Run

### Development Mode
```bash
# Start the development server
node main.js
```
The application will be available at `http://localhost:3000`

### Production Mode
```bash
# Install dependencies
npm install

# Copy Tesseract worker files (if needed)
npm run postinstall

# Start the server
node main.js
```

## 🏗️ Project Structure
```
mandika/
├── index.html          # Main application interface
├── main.js             # OCR processing logic and file handling
├── styles.js           # UI styling and responsive design
├── server.js           # Express server configuration
├── manifest.json       # PWA manifest
├── package.json        # Dependencies including OCR libraries
├── package-lock.json   # Dependency lock file
├── dockerfile          # Docker configuration
├── .gitignore          # Git ignore patterns
├── copyTesseract.js    # Script to copy Tesseract worker files
└── .github/workflows/  # CI/CD workflows
    └── main.yml        # Docker build automation
```

## 🎯 Features
- **Image OCR**: Extract text from images (PNG, JPG, JPEG, GIF, BMP)
- **PDF Text Extraction**: Process and extract text from PDF documents
- **Offline Functionality**: Complete client-side processing
- **Multiple Languages**: Support for various language recognition
- **Progress Tracking**: Real-time OCR progress indication
- **Copy to Clipboard**: Easy text copying functionality
- **Drag & Drop**: Intuitive file upload interface
- **Progressive Web App**: Installable and mobile-friendly
- **No Server Processing**: Privacy-focused local processing

## 📚 Dependencies

### Core Libraries
- **Express**: `^4.18.2` - Web server framework
- **Tesseract.js**: `^5.0.0` - Client-side OCR engine
- **PDF.js**: `^3.7.107` - PDF processing library

### Development Dependencies
- **copyfiles**: `^2.4.1` - File copying utility

### Tesseract.js Features
- Multi-language text recognition
- Confidence scoring
- Bounding box detection
- Custom training data support

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t mandika:latest .
```

### Run Container
```bash
docker run -p 3000:3000 mandika:latest
```

### Docker Configuration
- **Base Image**: Node.js 20 Alpine
- **Working Directory**: `/app`
- **Exposed Port**: 3000
- **Dependencies**: Automatically installed

## 💡 Usage

### Supported File Types
- **Images**: PNG, JPG, JPEG, GIF, BMP
- **Documents**: PDF files

### OCR Process
1. **Upload File**: Drag and drop or click to select
2. **Processing**: Automatic text recognition
3. **Results**: View extracted text with confidence scores
4. **Export**: Copy text to clipboard or download

### Language Support
Tesseract.js supports 100+ languages including:
- English (`eng`)
- French (`fra`)
- Spanish (`spa`)
- German (`deu`)
- Chinese Simplified (`chi_sim`)
- Japanese (`jpn`)
- And many more...

### Performance Tips
- **Image Quality**: Higher resolution images provide better accuracy
- **File Size**: Smaller files process faster
- **Language**: Specify target language for better results
- **Browser**: Use modern browsers for optimal performance

## 📄 License
MIT License - see LICENSE file for details.
