
import React, { Fragment } from "react";
import Card from 'framework/card'
import CustomAnchor from 'components/anchor'
import Layout, { Sider, Content} from 'components/layout';
import style from './style.module.less'
// import Menu from 'containers/index'
import Menu from "./myMenu";

import {anchorItems} from './data'

const Wrapper = () => {
    return(
        <Fragment>
            <div  className={style.appContainer}>
                {/* <Menu></Menu> */}
                {/* <div className={style.head}>header</div> */}
                <div className={style.header}>
                <Menu></Menu>
                    {/* <div>000</div> */}
                    {/* <div>4444</div> */}
                </div>
            <div id="content" className={style.content}>
            <div className={style.headBar}>header</div>
            <Layout>
                <Sider>
                    <CustomAnchor anchorItems={anchorItems}/>
                </Sider>
                <Content>
                    <div style={{height: '3000px'}}>
                        <Card cardType="RightList"/>
                        <Card cardType="RightList"/>
                    </div>
                </Content>
            </Layout>
            </div>
            </div>

        </Fragment>
    )
}
export default Wrapper;
