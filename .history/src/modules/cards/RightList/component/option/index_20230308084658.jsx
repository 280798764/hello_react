import React from "react";
import { Button } from 'antd';
import styles from './style.module';

class BaseSearch extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handAdd = () => {
        this.props.setFilters({
            visible: true
        })
    }
    render() {
         return (
            <div className={styles.BaseSearch}>
                <Button type="primary" onClick={this.handAdd}>调整评级</Button>
            </div>
         )
    }
}

export default BaseSearch;