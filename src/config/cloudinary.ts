import {v2 as cloudinary, v2} from 'cloudinary';
import {config as dotenvConfig} from 'dotenv';


dotenvConfig({path: '.development.env'});
export const cloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    },
};