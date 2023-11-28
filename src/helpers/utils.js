
import storage from "good-storage";
import { forEach } from "lodash";

export const getSystemName = () => {
    if(location.hostname.lastIndexOf('kyz') > -1) {
        return 'KYZ';
    }
    if(location.hostname.lastIndexOf('kyf') > -1) {
        return 'KYF';
    }
    if(location.hostname.lastIndexOf('tjfm') > -1) {
        return 'TJFM';
    }
    return 'KYMF';
}

export const clearStorage = () => {
    const whiteList = ['KYFHandsGuidance', 'menuPathSearch'];
    const keys = [];
    storage.forEach(item => {
        if(whiteList.indexOf(item) === -1){
            keys.push(item)
        }
    })
    keys.forEach(item => {
        storage.remove(item);
    })
}