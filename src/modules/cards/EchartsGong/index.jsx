import React, { Component } from 'react'
import EChartsReact from 'echarts-for-react';
import { renderOption } from 'utils/echartsOption';
import BaseChart from './components'; 

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
                type:'line',
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
              }
            ]
        }
        // return option;
        return renderOption('plotxy', option);
      }
  render() {
    const legendData = ['宏观经济', '货币政策', '供应与需求', '收益率水平', '债券市场情绪', '总得分']
    const arr1 = [
      ['100', '4.0', '-4.0', '-0.77', '上期'],
      ['200', '4.0', '-4.0', '-0.4', '上期'],
      ['300', '4.0', '-4.0', '-0.3', '上期'],
      ['400', '4.0', '-2.0', '0.83', '上期'],
      ['500', '4.0', '-4.0', '-0.4', '上期'],
      ['600', '0.75', '-1.4', '-0.3', '上期'],
    ]
    const arr2 = [
      ['100', '4.0', '-4.0', '0.23', '本期'],
      ['200', '4.0', '-4.0', '0.07', '本期'],
      ['300', '4.0', '-4.0', '-0.6', '本期'],
      ['400', '4.0', '-4.0', '0.77', '本期'],
      ['500', '4.0', '-4.0', '-0.33', '本期'],
      ['600', '2.45', '-2.2', '-0.03', '本期']
    ]
    return (
        <div>
            <div>
            <BaseChart
            //  option={this.getOption()}
             loading={true}
             xAxisData={[100, 200, 300, 400, 500, 600]}
             legendData={legendData}
             currentPeriodLineData={arr1}
             lastPeriodLineData={arr2}
             />
            </div>
        
        </div>
     
    )
  }
}
