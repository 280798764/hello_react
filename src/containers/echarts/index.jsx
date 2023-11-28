import React from 'react';
import Card from 'framework/card'
class Echarts extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div>
                 <Card cardType="EchartsLine" title='EchartsLine'/>
                 <Card cardType="EchartsArrow" title='EchartsArrow'/>
                 <Card cardType="EchartsArea" title='EchartsArea'/>
                 <Card cardType="EchartsGong" title='EchartsGong'/>
                 <Card cardType="EchartsModal" title='EchartsModal'/>
                 <Card cardType="EchartsPie" title='EchartsPie'/>
                 <Card cardType="EchartsPoint" title='EchartsPoint'/>
            </div>
         );
    }
}
 
export default Echarts;