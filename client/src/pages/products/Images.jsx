import React, { useState } from 'react'
import { Upload,Button, message } from 'antd'
import {setLoader} from "../../redux/loaderSlice"
import { useDispatch } from 'react-redux'
const Images = (
    selectedProduct,
    setselectedProduct,
    setShowProductForm,
    getProdct
) => {
    const [file=null,setFile] =useState(null)
    const dispatch= useDispatch()
    const upload =file=>{
        try {
           dispatch(setFile(file))
        }catch(error){
            dispatch(setLoader(true))
            message.error(error.message)
        }
    }
  return (
    <div>
        <Upload
         listType='picture'
         beforeUpload={()=>false}
         onChange={(info)=>{setFile(info.file)}}
        >
           <Button
             type='dashed'
             >
                upload image
           </Button>
        </Upload>
        <div className="flex justify-end gap-5 mt-5">
            <Button
              type='primary'
              onClick={()=>{
                setShowProductForm(false)
              }}
            >
                Cancel
            </Button>
            <Button
              type='primary'
              disabled={!file}
              onClick={upload}
            >
                upload
            </Button>
        </div>
    </div>
  )
}

export default Images