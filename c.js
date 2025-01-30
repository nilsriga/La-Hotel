const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputFolder = './images'; // Folder containing PNG and JPEG images
const outputFolder = './webp-images'; // Folder to save converted WebP images

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Function to convert images using ffmpeg
const convertImage = (inputPath, outputPath) => {
    exec(`ffmpeg -i "${inputPath}" -c:v libwebp -lossless 0 -q:v 75 -preset default "${outputPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error converting image: ${inputPath}`, error);
            return;
        }
        console.log(`Converted: ${inputPath} -> ${outputPath}`);
    });
};

// Read input folder and convert images
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error reading input folder:', err);
        return;
    }

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            const inputPath = path.join(inputFolder, file);
            const outputFileName = `${path.basename(file, ext)}.webp`;
            const outputPath = path.join(outputFolder, outputFileName);
            convertImage(inputPath, outputPath);
        }
    });
});
