import React, { useState } from "react";
import {
  UserOutlined,
  HomeFilled,
  PayCircleFilled,
  CarFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to="/admin/user">User</NavLink>, "sub1", <UserOutlined />),
  getItem(<NavLink to="/admin/room">Room</NavLink>, "sub2", <HomeFilled />),
  getItem(
    <NavLink to="/admin/position">Position</NavLink>,
    "sub3",
    <CarFilled />
  ),
  getItem(
    <NavLink to="/admin/booked">Booked</NavLink>,
    "sub4",
    <PayCircleFilled />
  )
];
export default function Admin({ Component }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <NavLink to="/">
            <img src="../logo.png" className=" p-1" alt="" />
          </NavLink>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Component />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
