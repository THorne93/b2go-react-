import React, { useEffect, useState } from 'react';
import { HomeOutlined, PieChartOutlined, TeamOutlined, BankOutlined, LogoutOutlined } from "@ant-design/icons";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import routes from './config/Routes';
import Header from './components/Header';
import { Layout, theme, Menu } from 'antd';
import './App.css';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}


const App = () => {
  const [showText, setShowText] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); const location = useLocation();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const siderWidth = collapsed ? 80 : 260;
  const items = [
    getItem(
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="nav-text">Dashboard</span>
      </Link>,
      "/",
      <HomeOutlined style={{ fontSize: "20px", color: "black" }} />
    ),
    getItem(
      "Exercises",
      "exercises",
      <PieChartOutlined style={{ fontSize: "20px", color: "black" }} />,
      [
        getItem(<Link to="/exercises/1">Part 1</Link>, "/exercises/1"),
        getItem(<Link to="/exercises/2">Part 2</Link>, "/exercises/2"),
        getItem(<Link to="/exercises/3">Part 3</Link>, "/exercises/3"),
        getItem(<Link to="/exercises/4">Part 4</Link>, "/exercises/4"),
      ]
    ),
    getItem(
      <Link to="/admin/schools" style={{ textDecoration: "none" }}>
        <span className="nav-text">Schools</span>
      </Link>,
      "/admin/schools",
      <BankOutlined style={{ fontSize: "20px", color: "black" }} />
    ),
    getItem(
      <Link to="/admin/users" style={{ textDecoration: "none" }}>
        <span className="nav-text">Users</span>
      </Link>,
      "/admin/users",
      <TeamOutlined style={{ fontSize: "20px", color: "black" }} />
    ),
    user &&
    getItem(
      <Link
        onClick={() => logout()}
        style={{ textDecoration: "none" }}>
        <span className="nav-text">Logout</span>
      </Link>,
      null,
      <LogoutOutlined style={{ fontSize: "20px", color: "black" }} />
    )

  ];
  useEffect(() => {
    if (collapsed) {
      setShowText(false) // Delay hiding text
    } else {
      setShowText(true); // Show text immediately on expand
    }
  }, [collapsed]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={260}
        collapsible
        className='gradient'
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1000,
          overflow: 'auto',
          borderRight: "1px solid black"
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <img
            src={collapsed ? "/img/logosmall.png" : "/img/logo.png"}
            alt="Logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
              opacity: collapsed ? 0.8 : 1,
              transform: collapsed ? 'scale(0.9)' : 'scale(1)',
            }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ borderRight: 0, background: 'none' }}
        />
      </Sider>

      <Layout style={{ marginLeft: siderWidth, minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ padding: '16px',backgroundColor: '#eaf8ff' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default App;
