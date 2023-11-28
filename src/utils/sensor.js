import { duration } from "moment/moment";
import { GetLocalStorage } from "./storage";


const SENSORS_EVENT = {
    page_stay_time: 'page_stay_time',
    page_view: 'page_view' // 页面浏览pv
}

export const setLogExternal = (event, eventId, params ={}) => {
    if(window.sensors){
        if(event && eventId && Object.values(SENSORS_EVENT).includes(event)){
            const {typeId: typeid, ...others} = params;
            window.sensors.track(event, {
                event_id: eventId,
                product_id: 10,
                typeid,
                ...others
            })
        }
    }
}

export const setLogPV = () => {
    setLogExternal(SENSORS_EVENT.page_view, SENSORS_EVENT.page_view)
}

export const setLogPageStayTime = (
    duration = 0,
    prevPath = '',
    autoLog = false
) => {
    setLogExternal(
        SENSORS_EVENT.page_stay_time,
        SENSORS_EVENT.page_stay_time,
        {
            duration,
            prev_page: prevPath,
            autoLog
        }
    )
}

export const sensorData = {
    moudle: [],
    userInfo: null,
    setMoudle(module){
        if(Array.isArray(module)){
            this.module = module;
        }
    },
    getMoudle(){
        return this.module
    },
    setUserInfo(userInfo){
        const {
            atCompany, atDepartment, isBussiness, pinganType
        } = userInfo || {}

        this.userInfo = {
            atCompany, atDepartment, isBussiness, pinganType
        }
    },
    getUserInfo(){
        if(this.userInfo === null){
            this.setUserInfo(GetLocalStorage('userInfo'))
        }
        return this.userInfo;
    }
}