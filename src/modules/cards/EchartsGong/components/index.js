import React from "react";
import ReactEcharts from "echarts-for-react";
import { renderOption } from 'utils/echartsOption';

const BaseChart = (props) => {

    const { loading, legendData, xAxisData, currentPeriodLineData, lastPeriodLineData } = props
    const legendDataArr = ['上期', '本期']

    const renderCurrentItem = (params, api) => {
        const xValue = api.value(0)
        const openPoint = api.coord([xValue, api.value(1)])
        const closePoint = api.coord([xValue, api.value(2)])
        const lowPoint = api.coord([xValue, api.value(1)])
        const highPoint = api.coord([xValue, api.value(2)])
        const halfWidth = 10;

        const style = api.style({
            stroke: api.visual('color')
        })
        return {
            type: 'group',
            children: [{
                type: 'line',
                shape: {
                    x1: lowPoint[0],
                    y1: lowPoint[1],
                    x2: highPoint[0],
                    y2: highPoint[1]
                },
                style: style
            }, {
                type: 'line',
                shape: {
                    x1: openPoint[0] + halfWidth,
                    y1: openPoint[1],
                    x2: openPoint[0] - halfWidth,
                    y2: openPoint[1]
                },
                style: style
            }, {
                type: 'line',
                shape: {
                    x1: closePoint[0] - halfWidth,
                    y1: closePoint[1],
                    x2: closePoint[0] + halfWidth,
                    y2: closePoint[1]
                },
                style: style
            }]
        }
    }

    const renderLastScatterItem = (params, api) => {

        const xValue = api.value(0)
        const openPoint = api.coord([xValue, api.value(1)])
        const highPoint = api.coord([xValue, api.value(3)])

        const style = api.style({
            fill: '#FE6D70'
        })
        return {
            type: 'group',
            children: [{
                type: 'circle',
                symbolSize: 10,
                shape: {
                    cx: openPoint[0] + 30,
                    cy: highPoint[1] ,
                    r: 4
                },
                style: style
            }
            ]

        }
    }

    const renderLastItem = (params, api) => {
        const xValue = api.value(0)
        const openPoint = api.coord([xValue, api.value(1)])
        const closePoint = api.coord([xValue, api.value(2)])
        const lowPoint = api.coord([xValue, api.value(1)])
        const highPoint = api.coord([xValue, api.value(2)])

        const halfWidth = 10;

        const style = api.style({
            stroke: api.visual('color')
        })
        return {
            type: 'group',
            children: [
                {
                type: 'line',
                shape: {
                    x1: lowPoint[0] + 30,
                    y1: lowPoint[1],
                    x2: highPoint[0] + 30,
                    y2: highPoint[1]
                },
                style: style
            }, 
            {
                type: 'line',
                shape: {
                    x1: openPoint[0] + halfWidth + 30,
                    y1: openPoint[1],
                    x2: openPoint[0] - halfWidth + 30,
                    y2: openPoint[1]
                },
                style: style
            }, 
            {
                type: 'line',
                shape: {
                    x1: closePoint[0] - halfWidth + 30,
                    y1: closePoint[1],
                    x2: closePoint[0] + halfWidth + 30,
                    y2: closePoint[1]
                },
                style: style
            }]
        }
    }

    const setGradeDetailChartOption = () => {
        const option = {
            animation: false,
            tooltip: {
                trigger: 'item',
                formatter: params => {
                    const i = params.dataIndex;
                    const type = params.data && params.data[4]
    
                    if (!params.data) return null
                    let str1 = ''
                    str1 = `<span>${legendData[i]}</span><br/>`
                        + `<span style="  display: inline-block;
                        border-radius: 5px;
                        margin-right: 8px;
                        width: 10px;
                        height: 10px;
                        background-color: #42c2fe;"></span>`
                        + `<span>上期：</span><br/>`
                        + `<span>最大值：${params.data[1]}</span><br/>`
                        + `<span>最小值：${params.data[2]}</span><br/>`
                        + `<span>均值：${params.data[3]}</span><br/>`
                    let str2 = ''
                    str2 = `<span>${legendData[i]}</span><br/>`
                        + `<span style=" display: inline-block;
                        border-radius: 5px;
                        margin-right: 5px;
                        width: 10px;
                        height: 10px;
                        background-color: #fe6d70;
                        color: red;"></span>`
                        + `<span>本期：</span><br/>`
                        + `<span>最大值：${params.data[1]}</span><br/>`
                        + `<span>最小值：${params.data[2]}</span><br/>`
                        + `<span>均值：${params.data[3]}</span><br/>`
                    if (type === '本期') {
                        return str2
                    }
                    return str1
                },
                axisPointer: {
                    show: false
                },
            },

            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        interVal: 0,
                        color: '#666666',
                        formatter: (p, i) => legendData[i]
                    },
                    nameTextStyle: {
                        color: "#666666"
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#D1D7E0'
                        }
                    },
                    scale: true, // 是否脱离0值比例 为true后坐标刻度不会强制包含零刻度。在双值轴的散点图有用
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: false
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: true
                }
            ],
            yAxis: [
                {
                    name: '得分',
                    min: -4,
                    max: 4,
                    type: 'value',
                    data: [-4, -2, -1, 0, 1, 2, 4],
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#666666'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#D1D7E0'
                        },
                    },
                    axisLabel: {
                        color: '#666666'
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name:legendDataArr[0],
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: 8,
                    // hoverAnimation: true,
                    // animation: true,
                    data: currentPeriodLineData,
                    dimensions: [null, 'lowest', 'highest', 'average', 'type'],
                    encode: {
                        x: 0,
                        y: 3,
                        tooltip: [1, 2, 3, 4]
                    },
                    itemStyle: {
                        color: '#447db4'
                    }
                },

                 {
                    name: legendDataArr[1],
                    type: 'custom',
                    renderItem: renderLastScatterItem,
                    dimensions: [null, 'lowest', 'highest', 'average', 'type'],
                    encode: {
                        x: 0,
                        y: [1, 2, 3],
                        tooltip: [1, 2, 3, 4]
                    },
                    itemStyle: {
                        color: '#FE6D70'
                    },
                    data: lastPeriodLineData
                 }, 
                 {
                    name: legendDataArr[0],
                    type: 'custom',
                    renderItem: renderCurrentItem,
                    dimensions: [null, 'lowest', 'highest', 'average', 'type'],
                    encode: {
                        x: 0,
                        y: [1, 2],
                        tooltip: [1, 2, 3, 4]
                    },
                    itemStyle: {
                        color: '#42C2FE'
                    },
                    data: currentPeriodLineData
                 }, 
                 {
                    name: legendDataArr[1],
                    type: 'custom',
                    renderItem: renderLastItem,
                    dimensions: [null, 'lowest', 'highest', 'average', 'type'],
                    encode: {
                        x: 0,
                        y: [1, 2],
                        tooltip: [1, 2, 3, 4]
                    },
                    itemStyle: {
                        color: '#FE6D70'
                    },
                    data: lastPeriodLineData
                 }
            ]
        }
        return renderOption('plotxy', option)
      
    }
    return (
        <div>
            <ReactEcharts
                notMerge
                loading={loading}
                option={setGradeDetailChartOption()}
                style={{ width: '100%', height: '200px' }}
            />
        </div>
    )
}
export default BaseChart;