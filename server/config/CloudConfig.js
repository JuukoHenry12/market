const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
dotenv.config()
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_kEY, 
    api_secret: process.env.API_SECRET
});

module.exports = cloudinary;