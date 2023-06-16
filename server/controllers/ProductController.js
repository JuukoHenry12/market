const Products = require('../Models/ProductModel')
const {cloudinary} = require('../config/CloudConfig')
cloudinary()

// add products
const AddProuctController=async(req,res)=>{
    try{
     const newProuct =new Products(req.body)
    
     await newProuct.save()
       res.send({
        sucess:true,
        message:'Product added successfully'
       })
    }catch(error){
        res.send({
            sucess:false,
            messsage:error.message
        })
    }
}

// get products
const GetProductController = async(req,res)=>{
    try{
        const products = await  Products.find().sort({createdAt:-1})
        res.send({
            success:true,
            message:products
        })
    }catch(error){
        res.send({
            sucess:false,
            message:'Product not found'
        })
    }
}

//edit products
const EditProductController=async(req,res)=>{
    try{
        await Products.findByIdAndUpdate(req.params.id,req.body)
         res.send({
            success:true,
            message:"Products updated successfully"
         })
    }catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }
}

const DeleteProductsController =async(req,res)=>{
    try {
        await Products.findByIdAndDelete(req.params.id,req.body)
        res.send({
           success:true,
           message:"Products deleted successfully"
        })
    }catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }
}

const uploadImageController = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const productId = req.body.productId;
        await Products.findByIdAndUpdate(productId,{
          spush:{images:result.secure_url}
        })
        
        res.send({
          success:true,
          message:"Image uploaded successfully",
          result
       })  

    }catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }
}

module.exports ={
    AddProuctController,
    GetProductController,
    EditProductController,
    DeleteProductsController,
    uploadImageController
} 