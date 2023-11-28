import React, {useState}  from "react";
import styles from './style.module.less';

const BaseCard = () => {
    const [data, setDate] = useState('9999999999')
    return (
        <div>{data}</div>
    )
}
export default BaseCard;

 class BaseCard extends React.Component {
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
 export default BaseCard