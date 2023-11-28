// x轴下有横线且线上有点点的
import React, { Component } from 'react'
import EChartsReact from 'echarts-for-react';
import { renderOption } from '../../../../utils/echartsOption';
import { findAllByAltText } from '@testing-library/react';
 
export default class index extends Component {
    

  xAxisBottom = () => {
    return [
      {
        show: false,
        data: ['周一','周二','周三','周四','周五','周六','周日'],
        gridIndex: 1
      }
    ]
  }

  reloadData = () => {
    console.log('reloadData===')
  }

    getOption =()=> {
      const data1 = [
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: 1,
              show: false
            }
          },
          symbolSize: 12,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 1
        }
      ]
      const data2 = [
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: 2,
              show: false
            }
          },
          symbolSize: 12,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: 2,
              show: false
            }
          },
          symbolSize: 12,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 2
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 2
        }
      ]
      const data3 = [
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: 3,
              show: false
            }
          },
          symbolSize: 12,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: 3,
              show: false
            }
          },
          symbolSize: 12,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 3
        },
        {
          label:{
            normal: {
              formatter: '',
              show: false
            }
          },
          symbolSize: 0,
          value: 3
        }
      ]

      console.log(data1, 'data1000000000')
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
            xAxis:[
              {
                type: 'category',
                axisLabel: {

                },
                data: ['周一','周二','周三','周四','周五','周六','周日']
              }, ...this.xAxisBottom()],
            yAxis: [
              {
                name: '收益率(%)',
                nameLocation: 'center',
                nameGap: 40,
                splitLine: {show: false}
              },
              {
                show: false,
                splitLine: {show: false},
                silent: true,
                axisLabel: {
                  formatter: () => ''
                },
                gridIndex: 1
              }, {
                name: '  打分',
                nameLocation: 'center',
                min: value => value.min,
                max: value => value.max,
                nameGap: 30,
                gridIndex: 0,
                splitLine: {show: false}
              }
            ],
            grid:[
              {
                bottom: '30%',
                left: 50,
                right: 30,
                top: '10%',
              },
              {
                top: '80%',
                left: 50,
                right: 30,
                bottom: 20
              }

            ],
            dataZoom: {
              show: true,
              type: 'slider',
              realtime: true,
              start: 0,
              end: 100,
              bottom: 5, 
              xAxisIndex: [0, 1]
            },
            series:[
              {
                name:'订单量1',
                type:'line',
                yAxisIndex: 0,
                xAxisIndex: 0,
                data:[20,899,453,3000,222,890,100]
              },
              {
                name:'订单量11',
                type:'line',
                yAxisIndex: 0,
                xAxisIndex: 0,
                data:[1000,2000,1500,3000,2000,1200,800]
              },
              {
                name:'订单量2',
                type:'line',
                yAxisIndex: 0,
                xAxisIndex: 0,
                data:[800,100,300,6000,1000,200,1800]
              },
              {
                name:'订单量22',
                type:'line',
                yAxisIndex: 0,
                xAxisIndex: 0,
                data:[400,500,100,500,2000,1200,2900]
              },
              {
                name:'订单量3',
                type:'line',
                yAxisIndex: 2,
                xAxisIndex: 0,
                data:[200,400,900,1000,8000,1200,900]
              },
              {
                name:'订单量32',
                type:'line',
                yAxisIndex: 2,
                xAxisIndex: 0,
                data:[400,1400,1900,500,1000,900,100]
              },
              {
                name:'横线1',
                type:'line',
                smooth: false,
                symbolSize: 10,
                symbol: 'circle',
                yAxisIndex: 1,
                xAxisIndex: 1,
                connectNulls: true,
                showAllSymbol: true,
                itemStyle: {
                  borderWidth: 2
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10
                  }
                },
                data:data1
              },
              {
                name:'横线2',
                type:'line',
                smooth: false,
                symbolSize: 10,
                symbol: 'circle',
                yAxisIndex: 1,
                xAxisIndex: 1,
                connectNulls: true,
                showAllSymbol: true,
                itemStyle: {
                  borderWidth: 2
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10
                  }
                },
                data:data2
              },
              {
                name:'横线3',
                type:'line',
                smooth: 1,
                symbolSize: 10,
                symbol: 'circle',
                yAxisIndex: 1,
                xAxisIndex: 1,
                connectNulls: true,
                showAllSymbol: true,
                itemStyle: {
                  borderWidth: 2
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10
                  }
                },
                data:data3
              },
            ]
        }
        // return option;
        setTimeout(() => {
          if(!this.echartsReact){
            const myChart = this.echartsReact.getEchartsInstance()
            myChart.off('legendselectchanged')
            myChart.on('legendselectchanged', e => {
              if(e.name === ''){

              }
            })
            myChart.off('datazoom')
            myChart.on('datazoom', (event) => {
              this.setState({
                start: 0,
                end: 100
              }, this.reloadData)
            })
          }
          
        }, 100);
        return renderOption('plotxy', option);

     
      }

      clickRadar = (params) => {
        console.log(params, 'params=======')

      }
  render() {

    const onEvents = {
      'click': this.clickRadar
    }
    return (
        <div>
            <div style={{'height': '500px'}}>
            <EChartsReact 
              option={this.getOption()}
              notMerge
              onEvents={onEvents}
              ref={chart => {
                this.echartsReact = chart
              }}
             style={{height: '100%'}}
            />
            </div>
        
        </div>
     
    )
  }
}
