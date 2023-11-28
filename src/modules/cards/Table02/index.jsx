import React, { useRef, useState, useEffect } from 'react'
import echarts from "echarts"
import ReactEcharts from 'echarts-for-react'
import Table from 'components/table'
import classNames from 'classnames'

const Charts = (props) => {

    const [maxEnd, setMaxEnd] = useState(0)
    const [minEnd, setMinEnd] = useState(0)

    const dataSource = [
        { children: [
           {
            title: 'name1',
            data1: 'name1'
           },
           {
            title: 'name2',
            data1: 'name2'
           },
           {
            title: 'name3',
            data1: 'name3'
           }
        ],data1: '1', data2: '2', data3: '10', data4: '-4', data5: '5', data6: '94.10', data7: '10', data8: '10' },
        { data1: '1', data2: '2', data3: '20', data4: '44', data5: '5', data6: '86.15', data7: '20' , data8: '0' },
        { data1: '1', data2: '2', data3: '30', data4: '4', data5: '5', data6: '71.48', data7: '30', data8: '30'  },
        { data1: '1', data2: '2', data3: '40', data4: '54', data5: '35', data6: '61.02', data7: '40' , data8: '40' },
        // { data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '53.49', data7: '50' , data8: '50' },
        // { data1: '1', data2: '2', data3: '30', data4: '4', data5: '5', data6: '41.48', data7: '60' , data8: '60' },
        // { data1: '1', data2: '2', data3: '40', data4: '54', data5: '35', data6: '31.02' , data7: '70', data8: '70' },
        // { data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '23.49', data7: '80', data8: '80'  },
        // { data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '13.49', data7: '90' , data8: '90' }
    ]



   

    const setOption = (num, text, max, min) => {
        // let colorR = new echarts.graphic.LinearGradient(1, 0, 0, 0. [
        //     {
        //         offset: 0,
        //         color: '#fff'
        //     }, {
        //         offset: 1,
        //         color: 'rgb(255, 90, 84)'
        //     }
        // ]);
        // if(text < 0){
        //     colorR = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
        //         offset: 0,
        //         color: 'rgb(111, 194, 84124)'
        //     }, {
        //         offset: 1,
        //         color: '#fff'
        //     }])
        // }

        // const normal = {
        //     color: colorR,
        //     backgroundColor: text > 0? 'rgb(255, 90, 84)' : text === 0 ? 'transparent' : 'rrgb(111, 194, 124)',
        //     borderWidth: 1
        // }


        let color = ''
        if(text === 'text2'){
            if(num > 0){
                color = 'rgb(249, 125, 111)';
            } else {
                color = 'rgb(99, 190, 123)';
            }
        }
        const ydata = []
        ydata.push(num)
        const colorBlue = [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#558cff' // 蓝色
                    }
                },
                data: ydata
                
            }
        ]

        const colorGreen = [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: color// 绿色
                    }
                },
                data: ydata
                
            }
        ]

        const colorRed = [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: 'rgb(249, 125, 111)' // 红色
                    }
                },
                data: ydata
                
            }
        ]

        // const colorR = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
        //     offset: 0,
        //     color: 'rgb(111, 194, 124)'
        // },{
        //     offset: 1,
        //     color: '#fff'
        // }])

        const seriesColor = text === 'text1' ? colorRed: text === 'text2' ? colorGreen : colorBlue;
        // const normal = {
        //     color: colorR,
        //     backgroundColor: num > 0 ? 'rgb(255, 90, 84)' : num === 0 ? 'transparent' : 'rgb(111, 194, 124)',
        //     borderWidth: 1
        // }

        const option = {
            title: {
                text: '',
                x: 'center',
                textStyle: {
                    align: 'center',
                    color: '#000',
                    fontSize: 14
                }
            },
            tootip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: params => {

                }
            },
            legend: {show: false},
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                borderWidth: 1
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                max:max,
                min:min,
                axisPointer: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                splitLine: {
                    show: true
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: true
                },
                data: ['1']
            },
            series: seriesColor,
            // series: [
            //    {
            //     type: 'bar',
            //     itemStyle: {
            //         normal
            //     },
            //     data: [10, 20, 30, 40, 50, 60, 70, 80, 90]
            //    }
            // ]
        }
        return option
    }

    

    const columns = [
        {
            title: '左侧',
            dataIndex: 'data1',
            align: 'center',
            // width: 300,
            children: [
                {
                    title: 'title1',
                    dataIndex: 'data1',
                    align: 'center',
                    width: 200,
                   
                },
                {
                    title: 'title1',
                    align: 'center',
                    dataIndex: 'data2',
                    width: 300
                },
                {
                    title: 'title1',
                    dataIndex: 'data3',
                    align: 'center'
                }
            ]
        },
        {
            title: '左侧',
            dataIndex: 'data2',
            align: 'center',
            render:(text,record) => (
                <div style={{position: 'relative'}}>
                    <ReactEcharts
                        notMerge
                        style={{height: 26, width: '100%'}}
                        option={setOption(text, 'text2', maxEnd, minEnd)}
                    />
                    <span style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, textAlign: 'right', lineHeight: '26px'}}>
                        {text}
                    </span>

                </div>
            )
        }
      
    ]


    useEffect(() => {
     
    }, [])

  

    return (
        <div>
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    expandable={{ defaultExpandAllRows: true}}
                    defaultExpandAllRows
                />
            </div>
        </div>
    )
}
export default Charts;


