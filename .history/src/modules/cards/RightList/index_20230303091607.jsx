import React  from "react";
import styles from './style.module.less';

 class Basecard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '99999999'
        }
    }


    render() {
        console.log(88888)
    console.log(this.state, '000000000')
    const {data} = this.state;

        return(
            <div>{data}</div>
        )
    }
 }
 export default Basecard