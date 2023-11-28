// 暂无数据

//@props
//type
// size: 大: lg, 中: md, 小: sm
// text: 文案 若传入则以传入为准 若不传入则按type默认文案显示
// fixedHeight: 是否固定高度 默认false






import React from "react";
import {AppleOutlined} from '@ant-design/icons';
// import SvgIcon from 'components/svgIcon';
import './style.modlue.less'

export default class EmptyData extends React.PureComponent {

    static defaultProps = {
        type: 'data',
        size: 'md',
        className: '',
        text: '' 
       }

       constructor(){
        super();
        this.textObj = {
            data: '暂无数据资料',
            news: '暂无相关内容',
            notice: '暂无消息',
            search: '没有找到符合条件的结果',
            nextNotice: '请先导入批量调仓或现金调整',
            permission: '您暂无权限， 请联系客服经理',
            columnList: '当前未选择任何指标，暂无数据',
            followCmd: '这里一片空白，快去创建自己的关注组吧'
        }
       }

       render(){
        const {type, size, className, text, fixedHeight} = this.props;
        return (
            <div className={`${fixedHeight ? 'fixedEmptyData' : 'commonEmptyData'} ${size} ${className}`}>
                {/* <SvgIcon path={`emptyData/${type}.svg`}/> */}
                <AppleOutlined/>
                <p>{text || this.textObj[type]}</p>
                {this.props.children}
            </div>
        )
       }
}