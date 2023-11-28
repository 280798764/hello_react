import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import {BackTop} from 'antd';
import {asyncComponent} from 'helpers/asyncComponent'
import enhance from 'enhance';
// import { isKyz, clearId2spe } from utils;
import { clearId2spe } from 'utils';
import {generateRoutes} from 'utils/routes';
import styles from './style.module';
import Menu from './menu';

class Index extends React.Component {
    componentDidUpdate(prevProps){
        if(prevProps.login.menuId !== this.props.login.menuId){
            clearId2spe()
        }
    }

    renderRoutes = routes => routes.map(item => {
        const {path, exact = true, name, permission, component, breads} = item;
        const Component = asyncComponent(component, {name, menuId: permission, breads, exact})
        return (
            <Route
                path={path}
                key={path+exact}
                exact={exact}
                render={props => <Component {...props}/>}

            />
            )
    })
    render() {
        const {login: {menuId}} = this.props;
        const routes = generateRoutes(menuId);

        return (
            <div className={styles.container}>
                <Menu />
                <div
                    id='content'
                    className="defaultContent"
                    // style={isKyz ? {marginTop: 42, height: 'calc(100% - 42px)'} : {}}
                >
                    <Routes>
                        {this.renderRoutes(routes)}
                        {menuId.length && <Navigate from='/*' to="/" />}
                    </Routes>
                </div>
                <BackTop
                    style={{right: 20, bottom: 20}}
                    visibilityHeight={120}
                    target={() => document.getElementById('content')}
                ></BackTop>
            </div>
        )
    }
}

const needMapStates = {
    login: 'login'
}
export default enhance(Index, needMapStates)