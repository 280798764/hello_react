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
            target
        } = props
        const commonRadius = [40, 60]
        const basics = {
            label: {
                normal:{
                    show: true,
                    position: 'outside'
                }
            },
            labelLine: {
                normal:{
                    show:true
                }
            },
            type: 'pie',
            radius: [`${commonRadius[0]-1}%`, `${commonRadius[1]-1}%`]
        }
        if(isObjectLike(target)){
            if(isArray(target)){
                target.forEach((item, index)=> {
                    result.push({
                        ...basics,
                        ...item,
                        radius: [`${commonRadius[0]-(24 * index)}%`, `${commonRadius[1]-(24 * index)}%`]
                    })
                })
            } else {
                result={
                    ...basics,
                    ...target
                }
            }
        }
        return result
    }

    function setRules(){
        return{
            grid:{
                normal:{
                    containLabel:true
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
                    top: 'bottom',
                    textStyle: {
                        color: '#666'
                    }
                },
                render: commonRender
            },
            title: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#333',
                        fontSize: 14,
                        fontWeight: 400
                    }
                },
                render: commonRender
            },
            series: {
                render: seriesRender
            }
        }
    }

    function pullNewOptions(originOption,skin){
        const normalConfig={
            color: skin.seriesColor,
            grid: true,
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
                }): option[key]
            }
        })
        return result;
    }

    export default (originOption, skin) => pullNewOptions(originOption, skin)