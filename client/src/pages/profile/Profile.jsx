import React from "react";
import { Tabs } from "antd";
import Products from "../products/products";
const Profile = () => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Product" key="1">
        <Products/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Bids" key="2">
        <h1>Bids</h1>
      </Tabs.TabPane>
      <Tabs.TabPane tab="General" key="3">
        <h1>General</h1>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Profile;
