import React, { useRef, useState, useEffect } from 'react'
import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts';
// import echarts from 'echarts-for-react';
import { renderOption, useDebounce } from 'utils/echartsOption';


const Charts = (props) => {
    const echartsRef =  useRef();
    const [pctCompList, setPctCompList] = useState([]);
    const [legendToggleObject, setLegendToggleObject] =  useState({'真实值': true, '预测值': true, '箭头': true})
    const [echartsOptions, setEchartsOptions] = useState({})
        const clickRadar = (params) => {
            setLegendToggleObject(params.selected)
        }

      const onEvents = {
        'legendselectchanged': clickRadar
      }
  

      const option = {

    
      }
      const pieOption = (listColor) => {
        const seriesList = listColor.length !== 0 ? [
            {
                 type: 'bar',
                barWidth: 20,
                name: '22',
                data: [listColor[0].divList],
                itemStyle: {
                    normal: {
                        color: listColor[0].color
                    }
                },
                stack: 'a'
            },
            {
                type: 'bar',
                barWidth: 20,
                name: '33',
                data: [listColor[1].cip],
                itemStyle: {
                    normal: {
                        color: listColor[1].color
                    }
                },
                stack: 'a'
            },
            {
                type: 'bar',
                barWidth: 20,
                name: '44',
                data: [listColor[2].gdp],
                itemStyle: {
                    normal: {
                        color: listColor[2].color
                    }
                },
                stack: 'a'
            },
            {
                type: 'bar',
                barWidth: 20,
                name: '55',
                data: [listColor[3].pe],
                itemStyle: {
                    normal: {
                        color: listColor[3].color
                    }
                },
                stack: 'a'
            }]: []

            const option = {
                legend: {
                    show: false
                },
                grid: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left:0,
                    containLabel: true
                },
                series: seriesList,
                yAxis: {
                    inverse: true,
                    axisLabel: {
                     show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                },
                xAxis: {
                    show: false,
                    axisLine: {
                        show: false
                    },
                    splitLine:{
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    boundaryGap: false,
                    axisTick:{
                        show: false
                    }

                }

            }
            return option
      }
   const getOption =(props)=> {

        const arr = [
            [{coord: [0,50]}, {coord: [0,0]}],
            [{coord: [1,50]}, {coord: [1,10]}],
            [{coord: [2,50]}, {coord: [2,0]}],
            [{coord: [3,50]}, {coord: [3,10]}],
            [{coord: [4,50]}, {coord: [4,0]}],
            [{coord: [5,15.19]}, {coord: [5,-29.5]}],
            [{coord: [6,50]}, {coord: [6,18.31]}],
            [{coord: [7,78.79]}, {coord: [7,42.73]}],
            [{coord: [8,41.36]}, {coord: [8,138.87]}],
            [{coord: [9,43.12]}, {coord: [9,'-']}],
            [{coord: [10,-8.09]}, {coord: [10,'-']}],
            [{coord: [11,-7.67]}, {coord: [11,'-']}]
        ]

        const a = [50, 50, 50, 50 ,50,15.19, 50,78.79, 41.36, 43.12, -8.09, -7.67 ]
        const b = [0, 10, 0, 10, 0,-29.5, 18.31,42.73, 138.87, '-', '-', '-']
        const colorOffset = a.length ? b.filter(it => it !== '-').length / a.length : 1
      
        let option = {
            legend: {
                selected: legendToggleObject,
                data:[
                    {
                        name: '预测值',
                        icon: 'diamond'
                    },
                    {
                        name: '真实值',
                        icon: 'circle'
                    },
                    {
                        name: '箭头方向',
                        icon: 'triangle'
                    }
                ],
            },
    
            title:{
              text:''
            },
            tooltip:{   //展示数据
              trigger:'axis'
            },
            xAxis:{
              data:['周一1','周二2','周三3','周四4','周五5', '周一','周二','周三','周四','周五','周六','周日'],
              boundaryGap: true,
              axisLabel: {
                rotate: 40
              },
              axisLine: { // x轴生线条
                lineStyle: {
                    color: lineColor(colorOffset, legendToggleObject)
                }
                },
            },
           
            yAxis:{
                dataZoom: [{
                    type: 'slider',
                    show: true,
                    bottom: 5
                }],
                // type: 'inside',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: lineColor(colorOffset, legendToggleObject)
                    }
                }
            //  axisLabel: {
            //     formatter: '{value}'
            //  }
            },
            series:[
              {
                name:'预测值',
                type:'line',
                symbol: 'diamond',
                data:['50', '50', '50', '50', '50','15.29','50.00','78.79','41.36','43.12','-8.09','-7.67'],
                itemStyle: {
                    normal: {
                        color: '#F7BC7B'
                    }
                },
                lineStyle: {
                    color: 'transparent'
                },
                symbolSize: 12
              },
              {
                name:'真实值',
                type:'line',
                symbol: 'circle',
                data:['0', '10', '0', '10', '0', '-29.4','18.31','42.73','138.87','-','-','-'],
                itemStyle: {
                    normal: {
                        color: '#FF7875'
                    }
                },
                lineStyle: {
                    show: false,
                    color: '#fff'
                },
                symbolSize: 10
              },
              {
                name:'箭头方向',
                type:'line',
                symbol: 'arrow',
                data: arr,
                itemStyle: {
                    normal: {
                        color: '#2B80E3'
                    }
                },
                markLine: { // 定义箭头值
                    symbol: ['none', 'arrow'],
                    silent: false,
                    lineStyle: {
                        type:'solid',
                        color: '#2B80E3'
                    },
                    data: legendToggleObject['真实值'] === false || legendToggleObject['预测值'] === false ? [] : arr
                },
                lineStyle: {
                  
                    color: 'transparent'
                },
                symbolSize: 12
              }
            ],
            tooltip:{
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: params => {
                    const data = params[0].data;
                    let str = `${params[0].name}<br/>`
                    if(!params[0]){
                        const data = params.data;
                        return `${data.name}</br>${data.label}`
                    }
                    
                    // str +=`<div>预测值${data.value}</div>`
                    const color = ['#4484CE', '#F28427', '#FECD4F', '#F1D6C9', '#38CBD3', '#7FA4FE', '#F2609C', '#21A67B', '#0FA6E4', '#E95C5C'];
                    str += `<span id="tooltipPie" style="float: right; width: 20px; height: 120px;"></span>`

                    if(params){
                        setTimeout(() => {
                            let pieList = [
                                {divList: 45.42, color: '#F28427'},
                                {cpi: 15.02, color: '#FECD4F'},
                                {gdp: 6.66, color: '#F1D6C9'},
                                {pe: 3.23, color: '#38CBD3'},
                            ]
                            if(document.getElementById('tooltipPie') !== null && document.getElementById('tooltipPie').innerHTML === ''){
                                const tooltipChart = echarts.init(document.getElementById('tooltipPie'))
                                if(typeof tooltipChart !== 'undefined'){
                                    return tooltipChart.setOption(pieOption(pieList))
                                }
                                tooltipChart.setOption(pieOption(pieList))
                            }
                            
                        }, 10);
                    }

                    return str;
                }
            }
        }
        // return option;
        return renderOption('plotxy', option);
      }

    

      const setOptions = useDebounce(args => {
        setEchartsOptions(prevOptions => {
            prevOptions.xAxis.axisLine = {
                lineStyle: {
                    color: lineColor(args.colorOffset, )
                }
            }
            prevOptions.yAxis.splitLine = {
                lineStyle:{
                    lineStyle: {
                        type: 'dashed',
                        color: lineColor(args.colorOffset, )
                    }
                }
            }

            prevOptions.dataZoom[0] = {
                ...prevOptions.dataZoom[0],
                start: args.start,
                end: args.end
            }
            return {...prevOptions}
        })
      })

      const lineColor = (colorOffset, legendToggleObject) => ({
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 0, color: '#D0D2DC'
        }, {
            offset: colorOffset, color: '#D0D2DC'
        }, {
            offset: Math.min(1, colorOffset + 0.09), color: legendToggleObject['预测值'] === false ? '#D0D2DC' : '#F7BC7B'
        }, {
            offset: 1, color: legendToggleObject['预测值'] === false ? '#D0D2DC' : '#F7BC7B'
        }]
      })

      const replaceData = data => {
        const newData = [];
        data.forEach(item => {
            if(item && item !== '-'){
                newData.push(JSON.parse(item).replace('%', ''))
            } else {
                newData.push('-')
            }
        })
        return newData;
      }

      useEffect(() => {
        if(echartsRef.current){
            const myCharts = echartsRef.current.getEchartsInstance()
            myCharts.on('datazoom', (params) => {
                let start = 0;
                let end = 0;
                if((params.start || params.start === 0) && (params.end || params.end === 0)){
                    start = params.start;
                    end = params.end
                } else {
                    start = params.batch[0].start;
                    end = params.batch[0].end
                }

                const dataY1 = replaceData(pctCompList ||[])
                const x1 = Math.floor(dataY1.length * (start / 100))
                const x2= Math.ceil(dataY1.length * (end / 100))
                const mark = dataY1.slice(x1, x2 + 1).filter(it => it === '-').length
                const colorOffset = 1- mark / (x2 + 1 - x1)
                setOptions(colorOffset, start, end)
            })
        }
      })

      useEffect(() => {
        setEchartsOptions(getOption())

      }, [legendToggleObject])

      return (
        <div>
            <div>
            <EChartsReact
            notMerge
             onEvents={onEvents}
             option={echartsOptions}
             ref = {echartsRef}
             />
            </div>
        
        </div>
     
    )
}
export default Charts;


  
