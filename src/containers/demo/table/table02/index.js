import React, { useRef, useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
// import { Table } from 'antd';
import Table from '../table'
import classNames from 'classnames'
// import style from './style.module.less'
// import './style.less'

// console.log(style, 'style====')

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
                    width: 200
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


