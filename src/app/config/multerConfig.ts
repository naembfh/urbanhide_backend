import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

// Explicitly type the params with known properties
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder name in Cloudinary
        format: async () => 'webp', // Set WebP as the default format
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Add WebP to allowed formats
    } as {
        folder: string;
        allowed_formats: string[];
    },
});

const upload = multer({ storage });

export default upload;

