
import React from "react";
import { Dropdown, Menu, message, Tooltip, Button } from "antd";
// import { NavLink, withRouter } from "react-router-dom";
import meunData from './menuData'
import { NavLink } from "react-router-dom";
import styles from './style.module'
import routers  from 'routers/routers'
import { closeSync } from "fs-extra";


console.log(routers, 'routers===')
class  Dom extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { 
        openId: ''
     }

    toFirstRouter = ()=> {
        console.log('toFirstRouter====')
    }

    toPage = () => {
        console.log(8888)
    }


    renderLinkItem = (item, index) => {
        let {path, disable} = item;
        const {activeClassName, disableClassName, defaultClassName} = styles;
        const className = disable ? disableClassName : defaultClassName;

        return (
            // <NavLink
            //     to={path}
            //     key={index}
            //     className={className}
            //     activeClassName={activeClassName}
            //     // isActive={(match, location)=> {
            //     //     return true;
            //     // }}
            // >
            //     {item.name}
            // </NavLink>
            <div className={className} onClick={this.toPage}>
                {item.name}
            </div>
        )
    }
    

    renderMenus = () => {
    
        const {kyfmMenus, kymMenus, openId, commonMenu} = this.state;
        // const Menus = [...kyfmMenus, ...kymMenus].map((item, index) => {
            const menus = routers.map((item, index) => {
            const {children, httpTarget, path, name} = item;
            if(!children && httpTarget){
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

            console.log(item, 'item====')

            let Overlay = (
                <div className={styles.wrapper} key={index}>
                    {
                        item.children && item.children.map((param, key) => (
                            <React.Fragment key={key}>
                                <div className={styles.module}>
                                    <div className={styles.nameBox}>
                                        <b className={styles.name}>
                                            {param.name}
                                        </b>
                                    </div>
                                    <div className={styles.item}>
                                        {
                                            param.routes&&param.routes.map((it, idx)=> this.renderLinkItem(it, idx))
                                        }
                                        
                                    </div>
                                </div>
                                <div className={styles.line}></div>
                            </React.Fragment>
                        ))
                    }

                </div>
            )

            return (
                <Dropdown
                    getPopupContainer={dom => dom}
                    key={index}
                    overlay={Overlay}
                    // visible={false}
                    // overlay={item.permissin === openId ? Overlay : <></>}
                    // onClick={() => this.toFirstRouter(item)}
                    // onVisibleChange={flagP=>this.handleOpenchange(item, flagP)}
                    // visible={item.permissin === openId}
                >
                    <div className={styles.navItem}>
                        <span>{item.name}</span>
                        {/* <NavLink
                            to={item.path}
                            aciveClassName={styles.activeClassName}
                        >
                            {item.name}
                        </NavLink> */}
                    </div>
                </Dropdown>
            )
        })
        
        return menus;
    }
    render() { 
        return ( 
            <div className={styles.menu} >
                 {this.renderMenus()}
            </div>
         );
    }
}
 
export default Dom;