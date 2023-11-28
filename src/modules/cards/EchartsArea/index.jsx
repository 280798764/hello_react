import React, { Component } from 'react'
import EChartsReact from 'echarts-for-react';
import { renderOption } from 'utils/echartsOption';
 
export default class index extends Component {
    

    getOption =()=> {
        let option = {
            legend: {
                show: true,
                icon: 'dot'
            },
            title:{
              text:'用户骑行订单'
            },
            tooltip:{   //展示数据
              trigger:'axis'
            },
            xAxis:{
              data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
            //  axisLabel: {
            //     formatter: '{value}'
            //  }
            },
            series:[
              {
                name:'历史区间',
                type:'line',
                areaStyle: {
                  origin: 'auto',
                  opacity: 0.5
                },
                lineStyle: {
                  opacity: 0
                },
                yAxisIndex: 0,
                data:[10000,20000,15000,30000,20000,12000,8000]
               
              },
              {
                name:'订单量',
                type:'line',
                data:[800,4000,2000,800,400,100,1800]
              },
              {
                name:'订单量2',
                type:'line',
                data:[800,100,300,6000,1000,200,1800]
              },
              {
                name:'订单量3',
                type:'line',
                data:[200,400,900,1000,8000,1200,900]
              },
              {
                name:'',
                type:'line',
                areaStyle: {
                  color: '#fff',
                  opacity: 1,
                  shadowColor: '#F3F3F3',
                  shadowOffset: 1
                },
              
                lineStyle: {
                  opacity: 0
                },
                color: 'yellow',
                yAxisIndex: 0,
                data:[5000,1000,7000,13000,10000,6000,4000]
              },
            ]
        }
        // return option;
        return renderOption('plotxy', option);
      }
  render() {
    return (
        <div>
            <div>
            <EChartsReact option={this.getOption()}/>
            </div>
        
        </div>
     
    )
  }
}
