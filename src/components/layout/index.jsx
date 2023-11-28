//

//@props

// siderWidth 左侧导航列表的宽度

// By ChenBoWen
//

import React from "react";
import './style.module.less';
import ctx from './context';

const { Provider } = ctx;

export { Content } from './content';
export { Sider } from './sider';

class Layout extends React.PureComponent {
     state = {
        siderVisible: true
     }

     setSiderVisible = bool => this.setState({ siderVisible: bool });

     render(){
        const { children, siderWidth = 160, leftSliderWidth } = this.props;
        const { siderVisible } = this.state;
        return(
            <div className="layout" id="layout">
                <Provider value={{
                    siderWidth: siderVisible ? Number(leftSliderWidth) || siderWidth: 0,
                    siderVisible,
                    setSiderVisible: this.setSiderVisible
                }}>
                    {children}
                </Provider>
            </div>
        )
     }
}

export default Layout;
