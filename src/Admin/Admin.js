import React, { useState } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  LogoutOutlined, // Import icon cho logout button
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd"; // Import Button từ antd
import { NavLink, useNavigate } from "react-router-dom"; // Sử dụng useNavigate để chuyển hướng
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
  getItem(<NavLink to="/admin/course">Course</NavLink>, "sub1", <FolderOpenOutlined />),
  getItem(<NavLink to="/admin/examteams">Exam Teams</NavLink>, "sub2", <SolutionOutlined />),
  getItem(<NavLink to="/admin/students">Students</NavLink>, "sub3", <TeamOutlined />),
  getItem(<NavLink to="/admin/user">Users</NavLink>, "sub4", <UserOutlined />),
  // Bạn có thể chèn nút logout ở đây hoặc thêm nó ngoài Menu
];

export default function Admin({ Component }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook để chuyển hướng

  // Hàm xử lý khi nhấn logout
  const handleLogout = () => {
    sessionStorage.clear(); // Xóa session storage
    navigate("/"); // Chuyển hướng người dùng về trang login
  };

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
          <Button 
            type="primary" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            style={{ margin: '16px' }} // Thêm chút cách biệt cho nút logout
          >
            Logout
          </Button>
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
