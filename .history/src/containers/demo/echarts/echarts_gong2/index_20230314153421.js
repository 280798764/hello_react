import React, { Component } from 'react'
import EChartsReact from 'echarts-for-react';
import { renderOption } from '../../../../utils/echartsOption';
 
const index = (props) => {

const dimensions = [
  null, '均值', '最小', '最大', 'type'
];
const data = [
  [100, 40, 20, 60, '本期'],
  [200, 155.8, 126.03, 188.8],
];

const data2 = [
  [100, 40, 20, 60, '上期'],
  [200, 155.8, 126.03, 188.8],
];
function renderItem(params, api) {
  console.log(params, api, 999999999)
const group = {
  type: 'group',
  children: []
};
let coordDims = ['x', 'y'];
for (let baseDimIdx = 0; baseDimIdx < 2; baseDimIdx++) {
  let otherDimIdx = 1 - baseDimIdx;
  let encode = params.encode;
  let baseValue = api.value(encode[coordDims[baseDimIdx]][0]);
  let param = [];
  param[baseDimIdx] = baseValue;
  param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][1]);
  let highPoint = api.coord(param);
  param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][2]);
  let lowPoint = api.coord(param);
  let halfWidth = 5;
  var style = api.style({
    stroke: api.visual('color'),
    fill: undefined
  });
  group.children.push(
    {
      type: 'line',
      transition: ['shape'],
      shape: makeShape(
        baseDimIdx,
        highPoint[baseDimIdx] - halfWidth,
        highPoint[otherDimIdx],
        highPoint[baseDimIdx] + halfWidth,
        highPoint[otherDimIdx]
      ),
      style: style
    },
    {
      type: 'line',
      transition: ['shape'],
      shape: makeShape(
        baseDimIdx,
        highPoint[baseDimIdx],
        highPoint[otherDimIdx],
        lowPoint[baseDimIdx],
        lowPoint[otherDimIdx]
      ),
      style: style
    },
    {
      type: 'line',
      transition: ['shape'],
      shape: makeShape(
        baseDimIdx,
        lowPoint[baseDimIdx] - halfWidth,
        lowPoint[otherDimIdx],
        lowPoint[baseDimIdx] + halfWidth,
        lowPoint[otherDimIdx]
      ),
      style: style
    }
  );
}
function makeShape(baseDimIdx, base1, value1, base2, value2) {
  var shape = {};
  shape[coordDims[baseDimIdx] + '1'] = base1;
  shape[coordDims[1 - baseDimIdx] + '1'] = value1;
  shape[coordDims[baseDimIdx] + '2'] = base2;
  shape[coordDims[1 - baseDimIdx] + '2'] = value2;
  return shape;
}
console.log(group, 'group====')

return group;
}


    const getOption =()=> {
      const option = {
        tooltip: {},
        legend: {
          data: ['本期', '上期']
        },
        grid: {
          bottom: 80
        },
        xAxis: {},
        yAxis: {},
        //  xAxis:{
    //           data:['周一','周二','周三','周四','周五','周六','周日']
    //         },
        series: [
          {
            type: 'scatter',
            name: '本期',
            data: data,
            dimensions: dimensions, //  null, '均值', '最大', '最小', 'type'
            encode: {
              x: 0,
              y: [1],
              tooltip: [ 1, 2, 3],
              // itemName: 0
            },
            itemStyle: {
              color: '#77bef7'
            }
          },
          {
            type: 'custom',
            name: '本期',
            renderItem: renderItem,
            dimensions: dimensions, //  null, '均值', '最大', '最小', 'type'
            encode: {
              x: 0,
              y: [1,2, 3],
              tooltip: [ 1, 2, 3, 4],
              // itemName: 0
            },
            data: data,
            // z: 100
          },
          {
            type: 'scatter',
            name: '上期',
            data: data2,
            dimensions: dimensions, //  null, '均值', '最大', '最小', 'type'
            encode: {
              x: 0,
              y: [1],
              tooltip: [ 1, 2, 3],
              // itemName: 0
            },
            itemStyle: {
              color: '#77bef7'
            }
          },
          {
            type: 'custom',
            name: '上期',
            renderItem: renderItem,
            dimensions: dimensions, //  null, '均值', '最大', '最小', 'type'
            encode: {
              x: 0,
              y: [1,2, 3],
              tooltip: [ 1, 2, 3, 4],
              // itemName: 0
            },
            data: data2,
            // z: 100
          }
        ]
        };
        console.log(option, 'option=====')
        return renderOption('plotxy', option);
    }
    

    // const getOption =()=> {
    //     let option = {
    //         legend: {
    //             show: true,
    //             icon: 'dot'
    //         },
    //         title:{
    //           text:'用户骑行订单'
    //         },
    //         tooltip:{   //展示数据
    //           trigger:'axis'
    //         },
    //         xAxis:{
    //           data:['周一','周二','周三','周四','周五','周六','周日']
    //         },
    //         yAxis:{
    //         //  axisLabel: {
    //         //     formatter: '{value}'
    //         //  }
    //         },
    //         series:[
    //           {
    //             name:'订单量',
    //             type:'line',
    //             data:[1000,2000,1500,3000,2000,1200,800]
    //           },
    //           {
    //             name:'订单量2',
    //             type:'line',
    //             data:[800,100,300,6000,1000,200,1800]
    //           },
    //           {
    //             name:'订单量3',
    //             type:'line',
    //             data:[200,400,900,1000,8000,1200,900]
    //           }
    //         ]
    //     }
    //     // return option;
    //     return renderOption('plotxy', option);
    //   }
    return (
        <div>
            <div>
            <EChartsReact option={getOption()}/>
            </div>
        
        </div>
     
    )
}

export default index;
