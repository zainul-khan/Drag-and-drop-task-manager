const sharp = require('sharp');
const path = require("path");

module.exports = {
    imageUpload: async (uploadedFile, imagePath) => {

        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + uploadedFile.name;
            const fullPath = imagePath + uniqueSuffix;

            const fileExtension = path.extname(uploadedFile.name).toLowerCase();

            const supportedExtensions = ['.jpeg', '.jpg', '.webp', 'tiff', '.png', '.gif', '.avif'];
    
            if (supportedExtensions.includes(fileExtension)) {

                // Resize and compress the image using sharp
                await sharp(uploadedFile.data)
                    .resize({ fit: 'inside', withoutEnlargement: true, width: 800 }) // Adjust the options as per your requirement
                    .toFile(fullPath);
            } else {
                
                await uploadedFile.mv(fullPath);
            }

            return fullPath;

        } catch (error) {
            console.error("Error processing uploaded file:", error);
        }
    },
}