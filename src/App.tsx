import React from "react";
import Testing from "./components/Testing";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff" }}>
        <Title level={2} style={{ textAlign: "center", margin: 0 }}>
          Тестирование студентов
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px" }}>
        <Testing />
      </Content>
    </Layout>
  );
};

export default App;
