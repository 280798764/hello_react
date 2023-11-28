import { isObjectLike, isArray, cloneDeep, merge } from "lodash";
import { basicConfig } from "../basic";

function commonRender(props){
    const {
        config,
        target
    } = props
    let result = cloneDeep(target)
    if(isObjectLike(target)){
        if(isArray(target)){
            result = result.map(item => merge({}, config, item))
        } else {
            result = merge({}, config, result)
        }
    } else {
        result = config
    }

    return result
}

function seriesRender(props){
    let result = []
    const {
        target,
        skin,
        orignOption: {
            color
        }
    } =  props
    const fillOption = (index) => ({
        type: 'radar',
        symbol: 'circle',
        symbolSize: index === 0 ? 6 : 0,
        lineStyle: {
            width: 2,
            color: color ? color[index] : skin.seriesColor[index]
        },
        itemStyle: {
            normal: {
                color: color ? color[index] : skin.seriesColor[index]
            }
        },
        areaStyle: index === 0 ? {
            color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0,
                    color: '#FFFF00'
                }, {
                    offset: 1,
                    color: '#FF0000'
                }],
                global: false
            }
        }: null
    })
    if(isObjectLike(target)){
        if(isArray(target)){
            target.forEach((item, index)=> {
                result.push(merge({}, fillOption(index), item))
            })
        } else {
            result = merge({}, fillOption(0), target)
        }
    }
    return result
}

function setRules(data, skin){
    return{
        grid: {
            normal: {
                containLabel: true
            },
            render: commonRender
        },
        tooltip: {
            normal: {
                ...basicConfig.tooltip,
                trigger: 'item'
            },
            render: commonRender
        },
        legend: {
            normal: {
                ...basicConfig.legend,
                top:'bottom',
                textStyle: {
                    color: '#666'
                }
            },
            render: commonRender
        },
        radar: {
            normal: {
                symbolSize: 8,
                name: {
                    nameGap: 6,
                    align:'center',
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: skin.splitAreaColor,
                        opacity: 0.2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: skin.axisLineColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: skin.splitLineColor
                    }
                },
                radius: '60%'
            },
            render: commonRender
        },
        series: {
            render: seriesRender
        }
    }
}

function pullNewOptions(originOption, skin){
    const normalConfig = {
        color: skin.seriesColor,
        tooltip: true,
        legend: true
    }
    const option = merge({}, normalConfig, originOption)
    const result = {}
    const rules = setRules(option, skin)
    const keys = Object.keys(option)
    keys.forEach(key => {
        const target = rules[key]
        if(option[key]){
            result[key] = target ? target.render({
                config: target.normal, // 默认参数
                target: option[key],// 传入参数
                skin, // 参数配置
                key, // 参数键值
                originOption: option // 全部参数
            }) : option[key]
        }
    })
    return result;
}

export default (originOption, skin) => pullNewOptions(originOption, skin)