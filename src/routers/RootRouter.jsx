import React from 'react'
import { hot } from 'react-hot-loader/root';
import enhance from 'enhance';
import 'moment/locale/zh-cn';
import { ConfifProvider } from 'antd';
import EmptyDate from '../components/emptyData'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Index from 'containers/index';


const customizeRenderEmpty = () => (
    <EmptyDate className="resetAntdEmpty" size='sm'/>
  
)

class RootRouter extends React.Component {
    getPopupContainer = trigger => {
        let dom = document.getElementById('headBar');
        if(dom && dom.contains(trigger)) return document.body;

        dom = document.getElementById('layout');
        if(dom) return dom;

        if(trigger){
            if(trigger.className === 'ant-select-selector'){
                return trigger.parentElement;
            }
        }
        return document.getElementById('content')
    }
  render() {
    return (
      <ConfifProvider locale={zhCN} renderEmpty={customizeRenderEmpty} getPopupContainer={this.getPopupContainer}>
        <Index/>
      </ConfifProvider>
    )
  }
}

const needMapStates = {
    login: 'login'
}

const needMapActions = {}
export default hot(enhance(RootRouter, needMapStates, needMapActions))
