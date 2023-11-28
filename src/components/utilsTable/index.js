import { useState } from "react"
import {throttle} from 'lodash'

export const useResize = () => {
    const [resizeWidth, setResizeWidth] = useState('')

//   export const SORT_CONFIG = {
//         string: stringSort, // 字符串排序
//         date: dateSort, //日期排序
//         number: numberSort ,// 数值排序
//         percent: percentSort,// 百分比和数值字符串排序
//         dial: dialSort, // 千分号排序
//         html: htmlSort, // html标签排序
//         million: millionSort, // 亿元后缀排序
//         interval: intervalSort // 时间间隔排序（xx年xx天）
//     }

    const onResize = e => {
        let elem = e.currentTarget;
        for(;(elem = elem.parentElement) && elem.tagName !== 'TH';);
        elem.style['pointer-events'] = 'none';
        elem.parentElement.style['user-select'] = 'none';

        const ths = [...elem.parentElement.children];
        const index = this.indexOf(elem);
        let colsWidth = resizeWidth.slice();
        if(!colsWidth){
            colsWidth = ths.map(item => item.offsetWidth)
        }

        let originX = e.clientX;
        const mousemove = throttle(({clientX}) => {
            const delta = clientX - originX;
            const n = colsWidth[index] + delta;
            if(Math.abs(delta)>3 && n>15){
                originX = clientX;
                colsWidth[index] = n;
                setResizeWidth(colsWidth.slice())
            }
        }, 10)
        document.addEventListener('mousemove', mousemove)

        const mouseup = () => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            elem.parentElement.style['user-select'] = 'initial'
            elem.style['pointer-events'] = 'initial'
        }
        document.addEventListener('mouseup', mouseup)
    }
    return [onResize, resizeWidth]
}

export const addSerialWidth = width => {
    if(!width) return undefined;
    const num = Number(width)
    if(!isNaN(num)){
        return num + 42
    }
    const [, n] = width.match(/^(\d+)%$/) || []
    if(n){
        return `${Number(n) + 4}%`
    }
    return width
}

export const generateWidth = (resizeWidth, index, hasRowSelection, hasSerial) => {
    if(!resizeWidth) return {}
    if(hasRowSelection) index++
    if(hasSerial) index--
    return{width: resizeWidth[index]}
}

export const inValidRender = ({render, children}) => {
    if(children) return true;
    if(!render) return false;
    try{
        const content = render('', {fundManagerCode: '0'}, 0)
        if(content && content.children) return true;
        return false
     }catch (error){
        return true
    }
}