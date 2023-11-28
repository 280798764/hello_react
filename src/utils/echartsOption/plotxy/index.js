import { isObjectLike, isArray, cloneDeep, filter, merge, uniq, uniqBy } from "lodash";
// import commonIcon from '../assets/icon';
import {basicConfig} from '../basic';
import typeConfig from './typeConfig';

// 对series中的type类型进行排序
function sortSeries(d){
    const o = {};
    let r = [];
    if(d && d.length > 0){
        d.forEach(item => {
            r.push(item.type)
        })
        r = Array.from(new Set(r))
 
        r.forEach(item => {
            o[item] =  filter(d, v=> v.type === item);
        })
    }
    return o;
}

// 处理图表数据data
function formatData(data, type){
    const specialType = ['candlestick', 'k'];
    let result  = [];
    if(data){
        data.forEach(item => {
            if(isObjectLike(item)){
                if(isArray(item)){
                    let target = item;
                    if(target.length >= 2 && specialType.indexOf(type) < 0){ // k线图除外
                       target = item[1]
                    } 
                    result = result.concat(target);
                } else if (!isArray(item)){
                    if(item.value){
                        if(isObjectLike(item.value)){
                            if(isArray(item.value)){
                                let valueTarget = item.value;
                                if(valueTarget.length >=2 && specialType.indexOf(type)<0){ // k线图除外
                                    valueTarget = valueTarget[1]
                                }
                                result = result.concat(valueTarget);
                            }
                        } else {
                            result.push(item.value);
                        }
                    }
                }
            } else {
                result.push(item)
            }
        })
        return result;
    }
}

// 处理min && max 是function 时的转换
function formatMaxMin(type, item, obj,config){
    let o = item;
    const specialString ={
        min: 'dataMin',
        max: 'dataMax'
    }
    if(o || o === 0){
        if(typeof o === 'function'){
            o = item(obj)
        } else if(typeof o === 'string'){
            if(o = specialString[type]){
                delete config[type]
                o = obj[type]
            }
        }
    } else {
         o = obj[type]
    }
    return Number(o)
}

// 计算堆叠数据
function stackData(data){
    let result  =  data.concat();
    let newData = [];
    result = result.map((a, i) => {
        const thisItem = formatData(a.data, a.type)
            if(i === 0){
                newData = thisItem
            } else {
                newData = newData.map((num, index) => {
                    const newNum = thisItem[index] || 0
                    const basicNum = num || 0
                    return (Number(basicNum) + Number(newNum))
                })
            }
            return ({
                ...a,
                data: newData
            })
    })

    result = result.concat(data)
    return result
}

function mixData(data){
    let targetData = data.concat()
    let result = []
    //是否需要堆叠数据
    const isStack = filter(targetData, v => v.stack).length > 0
    if(isStack){
        let stackArr = []
        targetData.forEach(item => {
            stackArr.push(item.stack)
            stackArr = filter(stackArr, v => v)
            stackArr = uniq(stackArr)
        })
        const needStackData = []
        stackArr.forEach(item =>{
            const thisStackArr = filter(data, v => v.stack === item)
            needStackData.push(thisStackArr)
        })
        needStackData.forEach(item => {
            targetData = targetData.concat(stackData(item))
        })
    }
    targetData.forEach(item => {
        const thisItemData = formatData(item.data, item.type)
        result = result.concat(thisItemData)
    })

    return result;
}

function calculateyAxisMaxMin(config, series, index){
    if(config.type === 'value'){
        // 找出相同yAisIndex的数据
        const sameIndexSeries = filter(series, v => {
            const thisIndex = v.yAxisIndex ? Number(v.yAxisIndex): null
            return(
                thisIndex === index
            )
        })
        let data = []
        if(sameIndexSeries.length < 1){
            const noyAxisIndexSeries = filter(series, v => !v.yAxisIndex)
            data = mixData(noyAxisIndexSeries)
        } else {
            data = mixData(sameIndexSeries)
        }
        data = data.filter(v => (v && (typeof Number(v) === 'number' && !isNaN(Number(v)))) || v === 0) // 过滤没有值的数据
        data = data.sort((a, b) => a -b)
        let min = data[0]
        let max = data[data.length - 1]
        //min*=(min> 0?0.8:1.2)
        //max*=(max> 0?1.2:0.8)
        const MNobj ={
            min,
            max
        }
        min= formatMaxMin('min', config.min, MNobj, config)
        max= formatMaxMin('max', config.max, MNobj, config)
        if(min>1 || min < -1){
            min = Math.floor(min)
        }
        if(max > 1 || max < -1){
            max = Math.ceil(max)
        }

        //最大最小值相同时
        if(max===min){
            if(max>0){
                min = 0
            } else if(max < 0){
                max = 0
            } else {
                max = 1
            }
        }






















        return merge({}, {
            // interval,
            max,
            min
        }, config)
    }

    return config
}





function formatyAxisName(config, index){
    const result  = config
    let distance = 0;
    if(config && config.name){
        distance = config.name.length > 1 ? ((config.name.length / 2) - 1) * 24 : 0
    }
    let padding = [0, 0, 0, distance]
    if(index===1){
        padding = [0, distance, 0, 0]
    }
    return merge({}, result, {
        nameTextStyle: {
            padding
        }
    })
}

function setLegendIcon(config ={}, series){
    const data = []
    let names = []
    if(config.data){
        config.data.forEach(item => {
            names.push(isObjectLike(item) ? item.name : item)
        })
    } else {
        series.forEach(item => {
            const {name} = item
            if(name){
                names.push(item.name)
            }
        })
    }
    names = uniq(names)


    
    // const {line, rect, dot} = commonIcon
    names.forEach(item => {
        // const customItem = find(config.data, v => v.name === item) || {}
        // let icon = customItem.icon || line
        let icon = '';
        let t = filter(config.data ? config.data : series, v => v.name === item)
        t = uniqBy(t, 'type')
            if(t.length > 0){
                if(t.length === 1){
                    const {type} = t[0]
                    switch(type){
                        case 'line':
                          icon = 'line'
                          break;
                        case 'k':
                          icon = 'line'
                          break
                          case 'candlestick':
                            icon = 'line'
                            break;
                          case 'bar':
                            icon = 'line'
                            break
                            case 'scatter':
                                icon = 'line'
                                break;
                              case 'bubble':
                                icon = 'line'
                                break
                                default:
                                break
                    }
                }
        }
        data.push({
            name: item,
            icon
        })
    })
    return merge({}, {
        data
    }, config)
}

function singleRender(props){
    const {target, config, key, originOption: {series}, index} = props
    let r = merge({}, config, target)
    let formatValue = v => (/^[+-]?\d*\.\d*$/.test(v) ? Number(v.toFixed(2)): v)
    if(r.axisLabel && r.axisLabel.needPrecision){
        formatValue = v => (/^[+-]?\d*\.\d*$/.test(v) ? Number(v): v)
    }
    if(key === 'yAxis'){
        r = calculateyAxisMaxMin(r, series, index)
        r = formatyAxisName(r, index)
        if(r.axisLabel && r.axisLabel.formatter){
            const {formatter} = r.axisLabel
            if(typeof formatter === 'function'){
                r.axisLabel.formatter = v => formatter(formatValue(v))
            }else {
                const w = String(r.axisLabel.formatter)
                r.axisLabel.formatter = v => w.replace(/^{value}/, formatValue(v))
            }
        } else {
            r.axisLabel.formatter = v => formatValue(v)
        }
    }
    if(key === 'legend'){
        // r.setLegendIcon(r, series)
    }
    return r
}

function commonRender(props){
    const {
        config,
        target,
        key
    } = props
    let t = cloneDeep(target)
    if(isObjectLike(t)){
        if(isArray(t)){
            t = t.map((item, index) => {
                const o = singleRender({
                    ...props,
                    target: item,
                    index
                })
                return o
            })
           
        } else {
        t = singleRender({
            ...props,
            target: t,
            index: 0
        })
    }
    } else if(!isObjectLike(t)){
        if(t){
            t = singleRender({
                ...props,
                target: {},
                index: 0
            })
        } else {
            t = config
        }
    }
    if(t && t.length && key === 'dataZoom'){
        t = t.map(it => {
            if(it.yAxisIndex && it.yAxisIndex.length){
                return {
                    yAxisIndex: it.yAxisIndex,
                    type: it.type,
                    right: 5,
                    width: 15
                }
            }
            return it;
        })
    }
    return t
}

function seriesRender(props){
    const {
        target,
        skin,
        originOption: {
            color
        }
    } =  props;
    const result = [];
    const newTypeConfig = typeConfig(skin, color && color.length > 0 ? color : null);
    const seriesCombine = sortSeries(cloneDeep(target));
    const keys = Object.keys(seriesCombine);
    keys.forEach(item => {
        const children = seriesCombine[item];
        const len = children.length;
        const t = newTypeConfig[item];
        children.forEach((child, index) => {
            result.push(t
                ? merge({}, t.renderOption({
                    type: item,
                    length: len,
                    custom: child,
                    index
                }), { ...child, type: t.type})
                : child
                );
        })
    })
    return result;
}

function checkIsOnlyType(data){
    const seriesCombine = sortSeries(cloneDeep(data))
    const keys = Object.keys(seriesCombine)
    let result = {
        isOnly: false,
        type: keys
    }
    if(keys.length > 0){
        const target = keys[0]
        const isOnly = filter(keys, v => v !==target).length < 1
        result ={
            isOnly,
            type: isOnly? target: keys
        }
    }
    return result
}

function setRules(data, skin){
    const {axisLabelColor, axisLineColor, axisSplitLine} = skin
    const {type} =  checkIsOnlyType(data.series)
    const specialType = ['scatter', 'bubble']; // 散点图 && 气泡图
    const basicGutter = 6
    let gridTop = 12
    let gridBottom = 2
    let dataZoomHeight = 18
    let dataZoomBottom = 0
    const legendHeight = 20
    let legendTop = 0
    if(data.title){
        gridTop +=20
    }
    if(data.legend){
        legendTop = data.title ?  32: 10
        gridTop+=legendHeight
    }
    if(data.dataZoom){
        const checkDataZoom = p => {
            if(!p.type || p.type === 'slider'){
                if(p.size){
                    if(p.size === 'sm'){
                        dataZoomHeight = 12
                    } else if(p.size ==='lg'){
                        dataZoomHeight = 24
                    } else {
                        const customSize = Number(p.size)
                        if(typeof customSize === 'number'){
                            dataZoomHeight = customSize
                        }
                    }
                }
                dataZoomBottom = gridBottom
                gridBottom+=(dataZoomHeight + (basicGutter * 2))
            } else {
                dataZoomHeight = 'auto'
                dataZoomBottom = 'auto'
            }
        }
        if(isObjectLike(data.dataZoom)){
            if(isArray(data.dataZoom)){
                const filterDataZoom = filter(data.dataZoom, v => !v.type || v.type === 'slider')
                if(filterDataZoom.length> 0){
                    checkDataZoom(filterDataZoom[0])
                }
            } else {
                checkDataZoom(data.dataZoom)
            }
        }else {
            checkDataZoom(data.dataZoom)
        }
    }
    return {
        grid: {
            normal: {
                containLabel: true,
                top: gridTop,
                left: 12,
                right: 12,
                bottom: gridBottom
            },
            render: commonRender
        },
        tooltip: {
            normal: {
                ...basicConfig.tooltip
            },
            render: commonRender
        },
        legend: {
            normal: {
                ...basicConfig.legend,
                top: legendTop,
                height: legendHeight,
                textStyle: {
                    color: '#666',
                    lineHeight: legendHeight,
                    height: legendHeight
                }
            },
            render:commonRender
        },
        dataZoom: {
            normal: {
                type: 'slider',
                height: dataZoomHeight,
                left: 100,
                right: 100,
                bottom: dataZoomBottom
            },
            render: commonRender
        },
        title: {
            normal: {
                show: true,
                top: 'top',
                left: 'center',
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                    fontWeight: 400
                }
            },
            render: commonRender
        },
        xAxis: {
            normal: {
                type: specialType.indexOf(type) > -1 ? 'value': 'category',
                nameTextStyle: {
                    color: axisLabelColor
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor
                    }
                },
                axisLabel: {
                    color: axisLabelColor

                },
                splitLine: {
                    show: specialType.indexOf(type) > -1,
                    lineStyle: {
                        type: 'dashed',
                        color: axisSplitLine
                    }
                },
                axisPointer: {
                    show: true,
                    label: {
                        show: true,
                        color:'#fff',
                        backgroundColor:'rgba(0, 0, 0,.75)',
                        formatter: (params) => {
                            const {value} = params
                            return /^[+-]?\d*\.\d*$/.test(value) ? Number(value).toFixed(2):value;
                        }
                    },
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                boundaryGap: false
            },
            render: commonRender
        },
        yAxis: {
            normal: {
                type: 'value',
                nameTextStyle: {
                    color: axisLabelColor
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: axisLineColor
                    }
                },
                axisLabel: {
                    color: axisLabelColor
                },
                splitLine: {
                    show:true,
                    lineStyle: {
                        type: 'dashed',
                        color: axisSplitLine
                    }
                },
                axisPointer: {
                    show: true,
                    triggerTooltip: false,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: 'rgba(0, 0, 0, .75)',
                        formatter: (params) => {
                            const {value} =  params;
                            return /^[+-]?\d\.\d*$/.test(value) ? Number(value).toFixed(2): value;
                        }
                    },
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            render: commonRender
        },
        series: {
            render: seriesRender
        }
    }
}

function pullNewOptions(o={}, skin){
    const originOption = o;
    const normalConfig= {
        color: skin.seriesColor,
        grid: true,
        tooltip: true,
        legend: true
    };
   if(isObjectLike(originOption.series)){
    if(!isArray(originOption.series)){
        originOption.series = [originOption.series]
    }
   } else {
    originOption.series = [];
}
const option = merge({}, normalConfig, originOption);
const result  = {};
const rules = setRules(option, skin);
const keys = Object.keys(option);
keys.forEach(key => {
    const target = rules[key];
    if(option[key]){
        result[key]=target ? target.render({
            config: target.normal,//默认参数
            target: option[key],// 传入参数
            skin,//参数配置
            key,//参数键值
            originOption: option // 全部参数
        }) : option[key]
    }
})
return result;
}

export default (originOption, skin) => pullNewOptions(originOption, skin)