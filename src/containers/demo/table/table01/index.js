import React, { useRef, useState, useEffect } from 'react'
import Card from '../../../../framework/card'
// import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'
// import { Table } from 'antd';
import Table from '../table'
import classNames from 'classnames'
// import './style.module.less'

const Charts = (props) => {

    const [maxEnd, setMaxEnd] = useState(0)
    const [minEnd, setMinEnd] = useState(0)

    const dataSource = [
        { index: 1, data1: '1', data2: '2', data3: '10', data4: '-4', data5: '5', data6: '94.10', data7: '10', data8: '10' },
        { index: 2, data1: '1', data2: '2', data3: '20', data4: '44', data5: '5', data6: '86.15', data7: '20' , data8: '0' },
        { index: 3,data1: '1', data2: '2', data3: '30', data4: '4', data5: '5', data6: '71.48', data7: '30', data8: '30'  },
        { index: 4, data1: '1', data2: '2', data3: '40', data4: '54', data5: '35', data6: '61.02', data7: '40' , data8: '40' },
        { index: 5, data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '53.49', data7: '50' , data8: '50' },
        { index: 6, data1: '1', data2: '2', data3: '30', data4: '4', data5: '5', data6: '41.48', data7: '60' , data8: '60' },
        { index: 7, data1: '1', data2: '2', data3: '40', data4: '54', data5: '35', data6: '31.02' , data7: '70', data8: '70' },
        { index: 8, data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '23.49', data7: '80', data8: '80'  },
        { index: 9, data1: '1', data2: '2', data3: '50', data4: '4', data5: '5', data6: '13.49', data7: '90' , data8: '90' }
    ]



    const renderColor = (percent, title) => {
        const green = [99, 190, 123]
        const yellow = [255, 235, 132]
        const red = [248, 105, 107]
        const white = [252, 234, 237]
        const pink = [255, 192, 203]
        let low = []
        let high = []

        if(percent > 50){
            low = title === 'data8' ? red: yellow; high = red;
            percent = (percent -0.5) * 2;
        } else {
            low = title ===  'data7' ? white: green; high=title === 'text1' ? pink: yellow;
            percent*=2;
        }
        const res =[];
        for(let i = 0; i< 3; i++){
            res[i] = Math.round(high[i] - low[i]*percent + low[i])%256;
        }
        // console.log(`rgb(${res.join(',')})`, '99999')
        return `rgb(${res.join(',')})`;

    }

    //背景色
    const renderCell = (value, title) => {
        // console.log(value, title)
        // let percent = toPoint(value)
        const temp = dataSource.map(item => parseFloat((item[title])));
        const max = Math.max(...temp);
        const min =Math.min(...temp);
        const percent = (value-min)/(max -min);
        return {
            children: value,
            props:{
                style: {
                    backgroundColor: renderColor(percent, title)
                }
            }
        }
    }

    const setOption = (num, text, max, min) => {
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
            title: '列1',
            dataIndex: 'data1',
            align: 'center'
        },
        {
            title: '列2',
            dataIndex: 'data2',
            align: 'center'
        },
        {
            title: '列3',
            dataIndex: 'data3',
            align: 'center',
            width: '25%',
            render:(text,record) => (
                <div style={{position: 'relative'}}>
                    <ReactEcharts
                        notMerge
                        style={{height: 26, width: '100%'}}
                        option={setOption(text, 'text1', maxEnd, minEnd)}
                    />
                    <span style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, textAlign: 'center', lineHeight: '26px'}}>
                        {text}
                    </span>

                </div>
            )
        },
        {
            title: '列4',
            dataIndex: 'data4',
            align: 'right',
            ellipsis: true,
            width: '25%',
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
        },
        {
            title: '列5',
            dataIndex: 'data5',
            width: '25%',
            align: 'center',
            render:(text,record) => (
                <div style={{position: 'relative'}}>
                    <ReactEcharts
                        notMerge
                        style={{height: 26, width: '100%'}}
                        option={setOption(text, 'text3', maxEnd, minEnd)}
                    />
                    <span style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, textAlign: 'center', lineHeight: '26px'}}>
                        {text}
                    </span>

                </div>
            )
        }, {
            title: '列6',
            dataIndex: 'data6',
            align: 'center',
            sorter: 'string',
            render: value => renderCell(value, 'data6')
        },
        {
            title: '列7',
            dataIndex: 'data7',
            align: 'center',
            render: value => renderCell(value, 'data7')
        },
        {
            title: '列8',
            dataIndex: 'data8',
            align: 'center', 
            render: value => renderCell(value, 'data8')
        }
    ]


    useEffect(() => {
        const maxLists = []
        dataSource.forEach(item => {
            maxLists.push(item.data3)
        })

        setMaxEnd(Math.max(...maxLists))
        setMinEnd(-4)
    }, [])

   


    const { rowSelection, scrooll={},className, simplePagination, dataSource: propsDataSource, rowClassName, allowRowClassName, evenRowClassName, oddRowClassName, simolePagination } = props;
    const isChildren= columns.some(item => !!item.isChildren)
    const tableClassName = classNames(simplePagination ? 'commonTable simplePagination' : 'commonTable', className,
        !dataSource.length && scrooll.x && `emptyTable${isChildren ? 2 : 1}` )

    return (
        <div>
            {/* <Card cardType="RightList" setting={[]}/> */}
            <div className='commonTableWrapper'>
                <Table
                    columns={columns}
                    rowKey={(record,index)=>record.index}
                    dataSource={dataSource}
                    // rowClassName={
                    //     rowClassName || ((record, index) => (
                    //         allowRowClassName ? index % 2 === 0
                    //             ? `evenRowStyle ${evenRowClassName}`
                    //             : `oddRowStyle ${oddRowClassName}` : ''
                    //     ))
                    // }
                    // className={tableClassName} 
                    rowSelection={rowSelection &&{
                        ...rowSelection,
                        columnWidth: 41
                    }}
                />
            </div>
        </div>

    )
}
export default Charts;


