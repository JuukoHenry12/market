import { axiosInstance } from "./axiosInstance";

export const AddProduct = async(payload)=>{
    try{
       const response = await axiosInstance.post("/api/product/addproduct",payload)
       return response.data
    }catch(error){
        return error.message
    }
}

export const GetProduct = async()=>{
    try{
       const response = await axiosInstance.get("/api/product/get-product")
       return response.data
    }catch(error){
        return error.message
    }
}

export const EditProduct = async(id,payload)=>{
    try{
       const response = await axiosInstance.put(`/api/product/edit-product/${id}`,payload)
       return response.data
    }catch(error){
        return error.message
    }
}

export const DeleteProduct = async(id)=>{
    try{
       const response = await axiosInstance.delete(`/api/product/delete-product/${id}`)
       return response.data
    }catch(error){
        return error.message
    }
}