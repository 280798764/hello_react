import React, { useState } from "react";
import styles from './style.module.less';

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
            data: '99999999'
        }
    }

    componentDidMount() {
        console.log(111111)
        this.setState({ data: 8888888888 })
    }


    render() {
        console.log(88888)
        console.log(this.state, '000000000')
        const { data } = this.state;

        return (
            <div className={styles.wrapper}>
                <div>{data}</div>
                <div>
                    66666666666666666
                </div>
            </div>


        )
    }
}
export default BaseCard