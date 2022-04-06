import React from "react";
import { Layout, Breadcrumb } from "antd";
import Adminsidebar from "../../components/Adminsidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Adminsidebar />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px", padding: "20px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Thai
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
