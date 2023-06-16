import React, { useEffect, useState } from "react";
import { Button, message,Table } from "antd";
import Productform from "./productform";
import { useDispatch } from 'react-redux'
import {DeleteProduct, GetProduct} from '../../apiCalls/product'
import {setLoader} from '../../redux/loaderSlice'
import moment from 'moment';

const Products = () => {

  const [Products,setProducts]=useState()
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct,setselectedProduct] = useState(null)
  const dispatch = useDispatch()

  const getProdct=async()=>{
    try{
      dispatch(setLoader(true))
      const response= await GetProduct()
       dispatch(setLoader(false))
      if(response.success){
        setProducts(response.message)
      }
    }catch(error){
       dispatch(setLoader(false))
       message.error(error.message)
    }
  }
  useEffect(()=>{
     getProdct()
  },[])
  const deleteproduct=async(id)=>{
    try{
      dispatch(setLoader(true))
      const response = await DeleteProduct(id)
      dispatch(setLoader(false))
      if(response.success){
         message.success(response.message)
         getProdct()
      }else {
         message.error(response.message)
      }
    }catch(error){
       message.error(error.message)
    }
  }
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title:"Category",
      dataIndex:"category"
    },
    {
      title:"Age",
      dataIndex:"age"
    },
    {
      title:"Status",
      dataIndex:"status",
    
    },
    {
      title:"Date",
      dataIndex:"createdAt",
      render:(text,record)=> moment(record.createdAt).format("DD-MM-YYYY HH:mm A")
    },
    {
      title:"Action",
      dataIndex:"action",
      render:(text,record)=>{
        return (
          <div className="flex gap-5">
           <i className="ri-delete-bin-line"
            onClick={()=>{
              deleteproduct(record._id)
            }}
           ></i>
           <i className="ri-pencil-line"
            onClick={()=>{
               setselectedProduct(record)
               setShowProductForm(true)
            }}
           
           ></i>
          </div>
        )
      }
    }
  ];
  return (
    <div>
       <div className="flex justify-end mb-3">
      <Button type="default" onClick={() =>{
         setselectedProduct(null);
         setShowProductForm(true)
      }}>
        Add Product
      </Button>
     
    </div>
     <Table 
     columns={columns}
     dataSource={Products}
  />
  {showProductForm && (
    <Productform
      showProductForm={showProductForm}
      setShowProductForm={setShowProductForm}
      selectedProduct={selectedProduct}
      getProdct={getProdct}
    />
  )}
    </div>
  );
};

export default Products;
