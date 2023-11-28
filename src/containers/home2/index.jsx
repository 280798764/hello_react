import React from "react";
import { Layout } from 'antd';
import styles from './style.module';


const { Header, Footer, Sider, Content } = Layout;

// import './style.module.less';
 function Home() {

  return (
    <div>
    <Layout>
          <Header theme='light'>Header</Header>
          <Layout>
            <Sider theme='light'>Sider</Sider>
            <Content>
            Content
              <div class={styles.box}></div>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
    </div>
  )
  
}

export default Home;