import React from 'react'
import Card from 'framework/card';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div>
                {/* <Card cardType="Right÷List" title='RightList'/> */}
                <Card cardType="Table01" title='Table01'/>
                <Card cardType="Table02" title='Table02'/>
                <Card cardType="Table03" title='Table03'/>
                <Card cardType="Table04" title='Table04'/>
            </div>
         );
    }
}
 
export default Table;