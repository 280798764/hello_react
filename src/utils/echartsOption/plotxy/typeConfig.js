import echarts from 'echarts-for-react';

export default (skin, color) => ({
    bar: {
        type: 'bar',
        renderOption: (params) => {
            const {length, index} = params;
            return {
                barMaxWidth:length > 1 ? 16 :20,
                barGap: '0',
                itemStyle: {
                    normal: {
                        color: color ? color[index] : skin.barSeriesColor[index]
                    }
                }
            }
        }
    },
    line: {
        type: 'line',
        renderOption:(params)=> {
            const {index, custom}= params
            let lineType = 'line'
            if(custom.areaStyle) lineType = 'area'
            const customAreaColor = custom.areaStyle ? custom.areaStyle.normal ? custom.areaStyle.normal.color: custom.areaStyle.color : null
            const customColor = lineType = 'line' ? skin.lineSeriesColor[index] : customAreaColor || skin.areaSeriesColor[index]
            return{
                symbol: 'none',
                symbolSize:lineType === 'line' ?  8 : 0,
                lineStyle:{
                    width: 2
                },
                itemStyle: {
                    normal: {
                        width: 2,
                        color: color? color[index]: customColor
                    }
                },
                areaStyle: custom.areaStyle
            }
        }
    },
    scatter: {
        type:'scatter',
        renderOption:(params)=> {
            const {index} = params;
            return{
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal:{
                        borderWidth: 2,
                        color: color ? color[index] : skin.scatterSeriesColor[index]
                    }
                }
            }
        }
    },
    k: {
        type: 'k',
        renderOption: () => ({
            barWidth: 10,
            itemStyle:{
                normal: {
                    color: color ? color[0] : skin.candlestickSeriesColor.color,
                    color0: color ? color[1] : skin.candlestickSeriesColor.color0,
                    borderColor: color ? color[0] : skin.candlestickSeriesColor.color,
                    borderColor0: color ? color[1] : skin.candlestickSeriesColor.color0
                }
            }
        })
    },
    candlestick: {
        type: 'candlestick',
        renderOption:()=> ({
            barWidth: 10,
            itemStyle:{
                normal: {
                    borderWidth: 0,
                    color: color ? color[0] : skin.candlestickSeriesColor.color,
                    color0: color ? color[1] : skin.candlestickSeriesColor.color0,
                    borderColor: color ? color[0] : skin.candlestickSeriesColor.color,
                    borderColor0: color ? color[1] : skin.candlestickSeriesColor.color0
                }
            }
        })
    },
    bubble: {
        type: 'scatter',
        renderOption:(params) =>{
            const {index} = params
            return{
                itemStyle: {
                    normal: {
                        shadowBlur:4,
                        shadowColor: 'rgba(120,36, 50,0.5)',
                        shadowOffsetY: 2,
                        opacity: 0.7,
                        color:() => new echarts.graphic.LinearGradient(0,0,0,1,[{
                            offset:0.4,
                            color:skin.bubbleSeriesColor[index][0]
                        },{
                            offset:0.92,
                            color:skin.bubbleSeriesColor[index][1]
                        }])
                    }
                }
            }``
        }
    }

})