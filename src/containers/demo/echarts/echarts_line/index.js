import React, { Component } from 'react'
import EChartsReact from 'echarts-for-react';
import { renderOption } from '../../../../utils/echartsOption';
 
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
                name:'订单量',
                type:'bar',
                data:[1000,2000,1500,3000,2000,1200,800]
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
                name:'订单量4',
                type:'line',
                data:[500,300,100,9000,2000,700,400]
              }
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
