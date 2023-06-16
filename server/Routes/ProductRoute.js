const express = require('express');
const productRouter= express.Router();
const authMiddleware= require('../middleware/authmiddleware')
const multer = require('multer')

const {
    AddProuctController,
    GetProductController,
    EditProductController,
    DeleteProductsController,
    uploadImageController
} =require('../controllers/ProductController')


// handle image upload to cloudinary
const storage = multer.diskStorage({
    filename:function(req,file,callback){
      callback(null,Date.now() + file.originalname);
    }
})

 productRouter.post('/addproduct',authMiddleware,AddProuctController)
 productRouter.get('/get-product',authMiddleware,GetProductController)
 productRouter.put('/edit-product/:id',authMiddleware,EditProductController)
 productRouter.delete('/delete-product/:id',authMiddleware,DeleteProductsController)
 productRouter.post('/upload-image',authMiddleware,multer({storage:storage}).single("file"),uploadImageController)
 
module.exports =  productRouter;