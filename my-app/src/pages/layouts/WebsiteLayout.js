import React from "react";
import AppHeader from "../../components/Header";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Footer, Content } = Layout;
const WebsiteLayout = () => {
  return (
    <Layout className="mainLayout">
      <Header style={{ backgroundColor: "white" }}>
        <AppHeader />
      </Header>

      <Content style={{ backgroundColor: "white" }}>
        <Outlet />
      </Content>

      <Footer>Footer Website</Footer>
    </Layout>
  );
};

export default WebsiteLayout;
