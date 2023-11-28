import React, { useState } from "react";
import styles from './style.module.less';
import Table02 from 'containers/demo/table/table02'
import Table01 from 'containers/demo/table/table01'
// const BaseCard = () => {
//     const [data, setDate] = useState('9999999999')
//     return (
//         <div>{data}</div>
//     )
// }
// export default BaseCard;

class BaseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
   
        return (
            <div className={styles.wrapper}>
                <div>
                <Table02/>
                </div>
            </div>


        )
    }
}
export default BaseCard