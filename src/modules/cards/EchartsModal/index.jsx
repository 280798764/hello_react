import React, { Component } from 'react'
import { Modal } from 'antd';
import EChartsReact from 'echarts-for-react';
import { renderOption } from 'utils/echartsOption';
import { transform } from 'lodash';
 
export default class index extends Component {
  constructor(props){
    super(props);
    this.state={
      showModal: false
    }
  }

  getClickData = (start, end) => {
    console.log('处理数据===')
  }

  renderBrushed = (params) => {
    console.log(params, 'params======')
    const myChart = this.echartsReact.getEchartsInstance()
    let start;
    let end;
    if(params.areas.length){
      const arr = params.areas[0].coordRange[0]
      start = this.xAxisDatas[arr[0]]
      end = this.xAxisDatas[arr[1]]
      console.log(start, end, 'start, end======')
      this.setState({
        showModal: true,
        start,
        end
      }, this.getClickData(start, end))
      myChart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'brush',
        brushOption: {
          brushType: 'rect'
        }
      })
    }
  }
    

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
              
            ],
            brush: {
              xAxisIndex: 'all',
              yAxisIndex:'all',
              transformable: false,
              outOfBrush: {
                colorAlpha: 0.1
              }
            }
        }
     
        this.xAxisDatas = ['周一','周二','周三','周四','周五','周六','周日'] // x轴值
        setTimeout(() => {
          if(!this.echartsReact){
            this.setState({showModal: false})
          } else {
            const myChart = this.echartsReact.getEchartsInstance()
            myChart.dispatchAction({
              type: 'takeGlobalCursor',
              key: 'brush',
              brushOption:{
                brushType: 'rect'
              }
            })
            myChart.on('brushEnd', this.renderBrushed)
          }
        }, 300);
        // return option;
        return renderOption('plotxy', option);
      }
  render() {
    return (
        <div>
            <div>
            <EChartsReact
            notMerge
              option={this.getOption()}
              ref={chart => {
                this.echartsReact = chart
              }}
            />
            </div>
            <Modal
              open={this.state.showModal} 
              onCancel={()=> this.setState({showModal: false})}
            >
              <div>弹框</div>
              <div>弹框</div>
              <div>弹框</div>
              <div>弹框</div>
            </Modal>
        
        </div>
     
    )
  }
}
