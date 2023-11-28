//头部组件



import React from "react";
import { isEqual } from "lodash";
import {Icon as LegacyIcon} from '@ant-design/compatible';
import {Popover} from 'antd'
// import SvgIcon from 'componets/svgicon'
// import hoverMsg from 'asset/icon/hoverMsg.svg'
// import {Shrink, Enlarge} from 'kyz-icons'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import classNames from "classnames";
import styles from './cardHead.module.less'

const filtersSvgStyle = {
    marginLeft: '4px',
    width: '24px',
    height: '24px',
    lineHeight: '24px'
}

class CardHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
    }
    
    toggleCollapseCardBody = (e, collapseVisible) => {
        e.stopPropagation();
        const { openCollapse, cllopseShow } = this.props;
        if(collapseVisible) {
            openCollapse(cllopseShow)
        }
    }

    toggleZoomCardBody = (e, zoomVisible) => {
        e.stopPropagation();
        const {enlargeZoom, zoomShow} = this.props;
        if(zoomVisible){
            enlargeZoom(zoomShow)
        }
    }

    renderCustom = () => {
        const {renderCustom, settings, filters, setFilters, headerConfig} = this.props;
        if(renderCustom){
            return renderCustom({ settings, filters, setFilters, headerConfig});
        }
        return null;
    }

    hideSvgHoverMsg = () => {
        const { hideSvgHoverMsg, settings, filters, setFilters, headerConfig } = this.props;
        if(hideSvgHoverMsg){
            return hideSvgHoverMsg({ settings, filters, setFilters, headerConfig })
        }
        return null;
    }

    render(){
        console.log('header, ------------------')
        const {
            title,
            cardHeadClassName,
            collapseShow,
            zoomShow,
            svgHoverMsg,
            noTitleSvgHoverMsgPositionsX,
            noTitleSvgHoverMsgPositionsY,
            headerConfig,
            noflag,
            noPaddingLeft,
            filtersFullWidth,
            setCardHeaderHeight,
            cardHeadBorderBottom
            } = this.props;
            const {
                collapseVisible,
                zoomVisible
            } = headerConfig;

            const filtersStyle = {
                height: '100%',
                zIndex: '10',
                width: filtersFullWidth ? '100%': 'auto'
            };
            const content = (
                <div dangerouslySetInnerHTML={{_html: svgHoverMsg}}/>
            );
            return (
                <div
                    className={classNames(styles.cardHead, cardHeadClassName)}



                    style={setCardHeaderHeight ? (cardHeadBorderBottom ? {height: setCardHeaderHeight,padding:0, borderBottom: `${cardHeadBorderBottom}`}: {height: setCardHeaderHeight, padding:0}) : (cardHeadBorderBottom ? {borderBottom: `${cardHeadBorderBottom}`}: {})}
                    onClick={e => this.toggleCollapseCardBody(e, collapseVisible)}
                >

                    <div className={title ? noflag ? noPaddingLeft ? styles.noPaddingLeft: styles.title : classNames(styles.title, styles.titleBorder) : styles.title} style={setCardHeaderHeight ? {padding: 0}: {}}>
                        {title}
                        {!this.hideSvgHoverMsg() && svgHoverMsg && !(noTitleSvgHoverMsgPositionsX || noTitleSvgHoverMsgPositionsY) ? (
                            <Popover
                                content={content}
                                placement='bottomLeft'
                                getPopupContainer={triggerNode => triggerNode.parentElement.parentElement}
                            >
                                <span className={styles.hoverMsgContent}>
                                    {/* <SvgIcon */}
                                    <LeftOutlined
                                        className={styles.hoverMsg}
                                        // svg={hoverMsg}
                                        style={{
                                            with: 14,
                                            height: 14
                                        }}
                                        />
                                </span>
                            </Popover>
                        ): null}
                    </div>
                    {!this.hideSvgHoverMsg() && svgHoverMsg && (noTitleSvgHoverMsgPositionsX || noTitleSvgHoverMsgPositionsY) ? (
                        <Popover
                            content={content}
                            placement="bottomLeft"
                            getPopupContainer={triggerNode=>triggerNode.parentElement.parentElement}
                        >
                            <span style={{position: 'absolute', top: `${noTitleSvgHoverMsgPositionsY || 0}px`, left:`${noTitleSvgHoverMsgPositionsX || 0}px`}}>
                                {/* <SvgIcon */}
                                <LeftOutlined
                                        className={styles.hoverMsg}
                                        // svg={hoverMsg}
                                        style={{
                                            with: 14,
                                            height: 14
                                        }}
                                        />
                            </span>
                        </Popover>
                    ): null}
                    {(collapseVisible || zoomVisible) ? (
                        <div className='filters' style={filtersStyle}>
                            {this.renderCustom()}
                            {collapseVisible ? (
                                <LegacyIcon
                                    style={filtersSvgStyle}
                                    type={collapseShow? 'caret-down' : 'caret-up'}
                                    onClick={e => this.toggleCollapseCardBody(e, collapseVisible)}
                                />
                            ): null}
                            {zoomVisible ? (
                                <span style={filtersSvgStyle}>
                                    {zoomShow ? (
                                        <LeftOutlined
                                            onClick={e => this.toggleCollapseCardBody(e, zoomVisible)}
                                        />
                                    ): (
                                        <RightOutlined
                                        onClick={e => this.toggleZoomCardBody(e, zoomVisible)}
                                        />
                                    )}
                                </span>
                            ): null}
                        </div>
                    ): this.renderCustom()}
                </div>
            )
    }
}

export default CardHead;

