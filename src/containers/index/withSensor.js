import React from "react";

import { setLogPageStayTime } from "utils";

const MAX_NO_OPT_TIME = 15 * 60 *1000; // 15min无操作停止统计
const MIN_DURATION = 1000; // 停留时长<1s不上报

export default WrappedComponent => class extends React.Component {
    constructor(props){
        super(props)
        this.startTime = 0;
        this.lastOperateTime = 0;

        this.timer = null;
        this.documentClick = this.active.bind(this)

    }

    componentDidMount(){
        // console.log(888)
        this.init()
        document.addEventListener('click', this.documentClick);
        window.addEventListener('beforeunload', () => {
            this.log()
        })
    }

    componentDidUpdate(prevProps){
        const prevPath = prevProps.location.pathname;
        if(prevPath !== this.props.location.pathname){
            this.log(prevPath)
            this.init()
        }
    }

    componentWillUnmount(){
        this.unmount()
        document.removeEventListener('click', this.documentClick)
    }

    init(){
        this.startTime = Date.now()
        this.lastOperateTime = Date.now()
        clearInterval(this.timer)
        this.timer = setInterval(()=> {
            this.checkMaxTime()
        }, 5000)
    }

    active(){
        this.lastOperateTime = Date.now()
        if(!this.timer){
            this.init()
        }
    }

    log(prevPath, autoLog = false){
        if(!prevPath){
            prevPath = this.props.location.pathname;
        }
        const duration = Date.now() -this.startTime
        if(duration>MIN_DURATION){
            setLogPageStayTime(duration, prevPath, autoLog)
        }
    }

    checkMaxTime(){
        const noOperateTime = Date.now() - this.lastOperateTime;
        if(noOperateTime > MAX_NO_OPT_TIME){
            this.log('', true)
            this.unmount()
        }
    }

    unmount(){
        clearInterval(this.timer)
    }

    rrender(){
        return <WrappedComponent {...this.props} />
    }

}