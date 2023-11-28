
//laoding

//传入参数
// size: 大: lg, 中: md , 小: sm

// 参数尺寸说明：
// lg: 68px*56px, 显示Loading... 文字
// md: 44px * 36px
// sm: 32px*26px


// fixedHeight: 是否固定高度 默认false

import React from "react";
import './style.module.less';
import{ Spin } from 'antd';

const sizeMap = {
    'lg': 'large',
    'md': '',
    'sm': ''
}

export default class Loading extends React.PureComponent {
    render() {
        const { size = 'md', className = '', fixedHeight, fixedMinHeight } = this.props;
        return(
            <div className={`${fixedHeight ? 'fixedLoadingWrapper' : 'commonLoadingWrapper'} ${size || '' } ${className}`} style={{minHeight: fixedMinHeight}}>
                <Spin size={sizeMap[size]}/>
                { size === 'lg'
                    ?<p>Loading...</p>
                    : ''}
            </div>
        );
    }
}