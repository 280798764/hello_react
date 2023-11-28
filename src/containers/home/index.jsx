import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import Table from 'containers/table';
// import Home from 'containers/ome';
import Echarts from 'containers/echarts';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Abc = () => {
 const [current, setCurrent] = useState('mail')
  const handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <SubMenu
        key="mail"
          title={
            <span className="submenu-title-wrapper">
              Echarts
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">
            <Link to="/">Echarts</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
            <Link to="/containers/table">Table</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
         <span>Table</span>
        </Menu.Item>
      </Menu>
        </Header>
      <Layout>
      <Sider width={200}>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            {/* <Link to="/">首页</Link> */}
          </Menu.Item>
          <Menu.SubMenu key="2" title="Demo">
            <Menu.Item key="2.1">
              <Link to="/">Echarts</Link>
            </Menu.Item>
            <Menu.Item key="2.2">
              <Link to="/containers/table">Table</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        </Sider>
        <Content style={{ margin: '16px' }}>
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact component={Echarts} />
            <Route path="/containers/table" exact component={Table} />
          </Switch>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Abc;
