import { Form, Input, Modal, Tabs, Col, Row, Checkbox } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { AddProduct, EditProduct } from "../../apiCalls/product";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import Images from "./Images"
const { TextArea } = Input;
const additionalThings = [
  {
    label: "Bill Avaiable",
    name: "billAvaiable",
  },
  {
    label: "Warrant Avaiable",
    name: "warrantlyAvaiable",
  },
  {
    label: "Box Avaiable",
    name: "boxAvaiable",
  },
];

const Productform = ({
  setShowProductForm,
  showProductForm,
  selectedProduct,
  getProdct,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [selectedTab="1",setSelectTab] = useState("1")


  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
        
      } else {
        values.seller = user._id;
        values.status = "pending";
        await AddProduct(values);
      }
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getProdct();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error, message);
    }
  };

  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current?.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={800}
      okText="Add Product"
      onOk={() => {
        formRef.current.submit();
      }}
      // footer={selectedTab === "2" ? null :true}
      {...(selectedTab === "2" && {footer:false})}
    >
      <div>
        <h1 className="text-primary text-xl text-center semi-bold">
          {selectedProduct ? "EditProduct" : "AddProduct"}
        </h1>
         <Tabs 
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key)=>setSelectTab(key)}
          >
          <Tabs.TabPanel tab="General" key="1">
            <Form onFinish={onFinish} ref={formRef}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item label="Description" rules={rules} name="description" >
                <TextArea  />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="elcetronics">Electronics</option>
                      <option value="Fashion">fashion</option>
                      <option value="Home">Home</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </Form>
          </Tabs.TabPanel>
          <Tabs.TabPanel tab="Image" key="2"
           disabled={!selectedProduct}
          >
            <Images
             selectedProduct={selectedProduct}
            
             getProdct={getProdct}
              setShowProductForm={setShowProductForm}
            />
          </Tabs.TabPanel>
        </Tabs>
      </div>
    </Modal>
  );
};

export default Productform;
