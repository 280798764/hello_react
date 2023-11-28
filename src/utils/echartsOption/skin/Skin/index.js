const normalFontColor = '#333333';
const secondaryFontColor = '#666666';
const primaryColor = '#558CFF';
const dataViewBgColor = '#fff';

export default {
    normalFontColor,
    secondaryFontColor,
    primaryColor,
    dataViewBgColor,
    tooltipTextColor: '#fff',
    tooltipBackgroundColor: 'rgba(0,0,0,.75)',
    tooltipAxisPointerTextColor: '#fff',
    tooltipAxisPointerBackgroundColor:'rgba(0,0,0,.75)',
    legendTextColor: secondaryFontColor,
    legendPageTextColor: '#333333',
    legendPageIconColor: '#333333',
    legendPageIconInactiveColor: '#7F7F7F',
    plotxy: {
        axisLabelColor: secondaryFontColor,
        axisLineColor: '#D1D7E0',
        axisSplitLine: '#D1D7E0',
        lineSeriesColor: ['#42C3FF', '#FF6E70', '#859DFF', '#FFB96F', '#D195FF', '#00DBE1', '#FF7D00', '#AB88C2', '#D77B68', '30082EA','#C74BE2'],
        areaSeriesColor: ['#7BAAD6', '#DCCAB6', '#91BBB9', '#8FA1CE', '#BCBCC6', '#B196CC', '#DBB082', '#7799DE', '#DC9A9A', '#4C99A8'],
        barSeriesColor: ['#4484CE', '#F28427', '#FECD4F', '#F1D6C9', '#38CBD3', '#7FA4FE', '#F2609C', '#21A67B', '#0FA6E4', '#E95C5C'],
        scatterSeriesColor: ['rgba(82,143,255,.8)', 'rgba(255,152,88,.8)','rgba(168,128,255,.8)','rgba(47,204,166,.8)','rgba(255,106,106,.8)', 'rgba(52,189,217,.8)','rgba(98,87,185,.8)', 'rgba(215,159,213,.8)', 'rgba(189,84,126,.8)', 'rgba(104,145,173,.8)', 'rgba(167,207,234,.8)', 'rrgba(196,196,196,.8)'],
        bubbleSeriesColor: [
            ['#9FC1F7', '#325FCF'],
            ['#D09D69', '#BE2222'],
            ['#ECDA7A', '#FC9D15'],
            ['#C5EC9C', '#6AC825'],
            ['#F1CD89', '#D36241'],
            ['#E89494', '#D62828'],
            ['#72BBE2', '#23B385'],
            ['#92B2F5', '#0F7CA9'],
            ['#EF9CE6', '#C12362'],
            ['#3525D1', '#C86DD7'],
        ],
        candlestickSeriesColor: {
            color: '#EC3730',
            color0: '#57CEB2'
        }
    },
    radar: {
        splitAreaColor: '#FBFBFB',
        axisLineColor: '#D1D7E0',
        splitLineColor: '#D1D7E0',
        splitGradualColor: ['#FFB400'],
        seriesColor: ['#FF0000', '#0BAEF1', '#0CC489', '#FC4C93', '#668DED', '#26CFD8', '#EFA9A6', '#F1B724', '#F77B13', '#2B80E3']
    },
    pie: {
        seriesColor: ['#4484CE', '#F28427', '#FECD4F', '#F0DFC4', '#F7B996', '#C9E9DE', '#38CBD3', '#21A67B', '#A778A2', '#01669C', '#B85151', '#2E9BD6', '#A9C9F8', '#8C97F8', '#EBAFEB'],
        labelColor: secondaryFontColor
    }
}