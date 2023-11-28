import logo from './logo.svg';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Table } from 'antd';
// import './App.css';
import EchartsPie from './containers/demo/echarts/echarts_pie'
import EchartsLine from './containers/demo/echarts/echarts_line'
import Echarts01 from './containers/demo/echarts/echarts_01' // 剪头
import Echarts02 from './containers/demo/echarts/echarts_modal' // 弹框
import Echarts03 from './containers/demo/echarts/echarts_gong' // 最大值  最小值  平均值
import Echarts04 from './containers/demo/echarts/echarts_gong2'
import EchartsPoint from './containers/demo/echarts/echarts_point'
// import EchartsGong2 from './containers/demo/echarts/ech÷arts_gong÷2'
// import Table01 from './containers/demo/table/table01'
import Table01 from './containers/demo/table/table01'
import Table04 from 'containers/demo/table/table04'
import Table02 from './containers/demo/table/table02'
import Test01 from './containers/demo/test/01.jsx'
import Slider from './containers/demo/layout/01';
function App() {


  return (
   <div className='appContainer' id='appContainer'>
    <div className='container'>
      <div className='content'>
      <ConfigProvider>
    {/* <Slider/> */}
    {/* <Slider/> */}
    <Table01/>
    <Table04/>
    {/* <EchartsPoint/> */}
    {/* <Slider/> */}
    </ConfigProvider>
      </div>

  
    </div>
    {/* <EchartsPie/> */}
    {/* <EchartsLine/> */}
   
    <div>
    {/* <Echarts04/> */}
    {/* <Echarts01/> */}
    
    {/* <Test01 /> */}
    {/* <Echarts03 />
    <Echarts04 /> */}
    </div>
   </div>
  );
}

export default App;


