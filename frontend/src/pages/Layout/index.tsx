import "./styles.css";

import { Layout, theme } from "antd";
const { Header, Footer, Content } = Layout;

export default function MyLayout({ navBar, content }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header className="header">{navBar}</Header>
      <Content className="content">
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {content}
        </div>
      </Content>
      <Footer className="footer">afonsocrg ©{new Date().getFullYear()}</Footer>
    </Layout>
  );
}
