import { isObject, split } from "lodash";

const location = {
    search: '',
    hash: '11',
    href: 'http://localhost:3000/'
}

// 获取URLsearch参数
export function getUrlAllParams(){
    console.log(location, 'location======')
    const url = decodeURI(location.search || location.hash);
    const params = split(url, '?')[1] || '';
    if(!params) return {};

    const urlData =  split(params, '#')[0];
    const paramsArr = split(urlData, '&');
    return paramsArr.reduce((acc, cur) => {
        const item = split(cur, '=');
        acc[item[0]] = item[1];
        return acc;
    }, {})
}

export const getHash = () => {
    const index = location.href.lastIndexOf('#');
    if(index === -1) return '';
    return location.href.slice(index);
}

// 把对象以参数的形式拼接在URL后边
export function getObjToUrlParams(obj){
    let str = '';
    if(isObject(obj)){
        for(const key in obj){
            str += `${key}=${obj[key]}&`
        }
    }
    return str.slice(0,str.length - 1)
}