import { useEffect, useCallback, useRef } from 'react';
import getSkin from './skin';
import plotxyOption from './plotxy';
import pieOption from './pie'
import radarOption from './pie'
import { delay } from 'lodash';


// plotxy: 二维图(柱状， 折线， 散点等)
// radar: 雷达图
// pie: 饼图


function renderOption(type = 'plotxy', options, skinType){
    options = { backgroundColor: '#fff', ...options };
    if(!options.grid){
        options = {...options, grid: {top: 55}};
    }
    if(!options.legend || !options.legend.right && !options.legend.left && !options.legend.top && !options.legend.bottom){
        options = { ...options, legend: {...options.legend, left: 10, top: 0}};
    }
    const skin = getSkin(skinType);
    let result = plotxyOption(options, skin.plotxy)
    if(type === 'plotxy'){
        result = plotxyOption(options, skin.plotxy)
    }else if (type === 'radar'){
        result = radarOption(options, skin.radar)
    } else if (type === 'pie'){
        result = pieOption(options, skin.pie)
    }
    return result
}

export {
    renderOption
}

export const skin = getSkin();

export const useDebounce = (fn, delay, dep = []) => {
    const {current} = useRef({fn, timer: null})
    useEffect(() => {
        current.fn = fn
    }, [fn])
    return  useCallback(function f(...args){
        if(current.timer){
            clearTimeout(current.timer)
        }
        current.timer = setTimeout(() => {
            current.fn.call(this,...args)
        }, delay)
    }, dep)
}

export const debounce = (fn, wait = 1000) => {
    let timer = null;
    return function f(...args){
        const context = this
        if(timer){
            clearTimeout(timer)
        }
        timer= setTimeout(() => {
            fn.apply(context,args)
        }, wait)
    }
}