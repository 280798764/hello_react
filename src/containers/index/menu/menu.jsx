import React from "react";
import { Dropdown, message, Tooltip, Button } from "antd";
// import { NavLink, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import withRouter from './withRouter'
import storage from "good-storage";
import request from "helpers/service";
import Menus from 'routers/routers';
import enhance from 'enhance';
import {getSystemName} from 'utils';
import {generateMenus} from 'utils/routes';
import {initMenu} from 'routers/routersChanged';
import meunData from './menuData'

import withSensor from '../withSensor';
import styles from './style.module'
// import urls from './urls'
// const SYSTEM_NAME = getSystemName();
const HOTQUERY_TYPE = {
    fund: 3,
    manager: 4,
    company: 5
}


class MenuCom extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            kyfmMenus: [],
            kymMenus: [],
            openId: '',
            commonMenu: ''
        }
    }

    renderMenus = () => {
        const {kyfmMenus, kymMenus, openId, commonMenu} = this.state;
        // const Menus = [...kyfmMenus, ...kymMenus].map((item, index) => {
            const Menus = meunData.map((item, index) => {
            const {child, httpTarget, path, name} = item;
            if(!child && httpTarget){
                return (
                    <a
                        key={index}
                        className={styles.navItme}
                        href={path}
                        target="_blank"
                    >
                        {name}
                    </a>
                )
            }

            return (
                <Dropdown
                    getPopupContainer={dom => dom}
                    key={index}
                    // overlay={item.permissin === openId ? Overlay : <></>}
                    onClick={() => this.toFirstRouter(item)}
                    // onVisibleChange={flagP=>this.handleOpenchange(item, flagP)}
                    visible={item.permissin === openId}
                >
                    <div className={styles.navItem}>
                        <NavLink
                            to={item.path}
                            aciveClassName={styles.activeClassName}
                        >
                            {item.name}
                        </NavLink>
                    </div>
                </Dropdown>
            )
        })
        
        return Menus;
    }

    render(){
        console.log(888)
        return (
            <div className={styles.menu}>
                {this.renderMenus()}
            </div>
        )
    }
}

const needMapStates={
    login: 'login'
}

// export default MenuCom;
// export default enhance(withRouter(MenuCom), needMapStates)

export default MenuCom;
