import {GetLocalStorage} from 'utils';
import request from 'helpers/service';

const saveLog = menuId => {
    request({
        method: 'post',
        url: '/fof/api/admin/userMgt/saveLogNew',
        data: {
            showId: menuId
        }
    })
}

export let UI_SPECIAL_FLAG = false
let id2spe;



export const clearId2spe = () => {id2spe = null}

export const setSpecialFlag = menuId => {
    if(!id2spe){
        const menus = GetLocalStorage('menu') || []
        if(!menus.length) return null;
        id2spe = menus.reduce((acc, cur)=> {
            acc[cur.menuId] = cur.specialFlag;
            return acc;
        }, {})
    }
    const spe = id2spe[menuId]
    UI_SPECIAL_FLAG = spe !=='0' && spe;
    setTimeout(() => {
        saveLog(menuId)
    }, 1000);

    return UI_SPECIAL_FLAG;
}