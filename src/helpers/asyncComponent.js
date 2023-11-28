// 动态引入组件

import React from "react";
import Loading from 'components/loading';
import {setSpecialFlag, sensorData, setLogPV} from 'utils';
import { isFunction } from "lodash";
export const asyncComponent = (loadComponent, params) => (
    class AsyncComponent extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                loading: true,
                Comment: null
            }
        }
        
        componentDidMount(){
            if(params){
                const {menuId, breads} = params;
                if(menuId){
                    setSpecialFlag(menuId)
                }
                if(breads){
                    sensorData.setMoudle(breads)
                }
            }
            this.mounted = true;
            const importComponent = isFunction(loadComponent) ? loadComponent() : loadComponent;
            importComponent.then(cmp => {
                if(this.mounted){
                    if(params && params.exact){
                        setLogPV()
                    }
                    this.setState({
                        loading: false,
                        Component: cmp.default
                    })
                }
            })
        }

        componentWillUnmount(){
            this.mounted = false;
        }

        render(){
            const {loading, Component} = this.state;
            return loading ? <Loading size='lg' /> : <Component {...this.props}/>
        }
    }
)