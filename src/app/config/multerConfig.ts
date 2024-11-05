import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

// Explicitly type the params with known properties
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder name in Cloudinary
        format: async () => 'png', // Alternatively, you can define a single format
        allowed_formats: ['jpg', 'jpeg', 'png'],
    } as {
        folder: string;
        allowed_formats: string[];
    },
});

const upload = multer({ storage });

export default upload;
