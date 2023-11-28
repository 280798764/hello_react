import React, { Fragment } from "react";
import configs from '../../modules/mapping.js';
import { isEqual, isNil } from "lodash";
import classNames from "classnames";
import CardHead from './cardHead';
import CardBody from "./cardBody";
import styles from './card.module.less';


// 是否开启图像加载动画和空状态
const openGraphStatus = true;
class Card extends React.Component {
    constructor(props) {
        super(props);
        // isNill检查value是否是null或者underfind
        const propsLoading = isNil(configs[props.cardType].loading)
        ? (openGraphStatus ? !!configs[props.cardType].echarts : false)
        : configs[props.cardType].loading;
        this.state={
            isLoading: propsLoading,
            isEmpty: false,
            collapseShow: false,
            zoomShow: false,
            filters: configs[props.cardType].filters || {}
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
    }

    toggleCollapseShow = boolean => {
        this.setState({ collapseShow: boolean })
    }

    toggleZoomShow = boolean => {
        this.setState({ zoomShow: boolean })
    }

    setFilters = (newFilters, callback) => {
        this.setState( state => ({
            ...state,
            filters: {...state.filters, ...newFilters}
        }), callback);
    }

    openLoading = () => {
        this.setState({
            isLoading: true,
            isEmpty: false
        })
    }

    openCollapse = collapseShow => {
        this.setState({ collapseShow: !collapseShow })
    }

    enLargeZoom = zoomShow => {
        this.setState({ zoomShow: !zoomShow })
    }

    renderEmptyData = () => {
        this.setState({
            isLoading: false,
            isEmpty: true
        })
    }

    closeLoading = () => {
        this.setState({
            isLoading: false,
            isEmpty: false
        })
    }

    addZoomClass =()=> {
        const {zoomShow} = this.state;
        return `${zoomShow ? 'enLarge' : ''}`;
    }

    render() {
        const { filters, isLoading, isEmpty, collapseShow, zoomShow } = this.state;
        const {
            title,
            cardType,
            cardClassNames,
            settings={},
            loading,
            echartsData,
            id,
            style ={},
            echartsLoading = false,
            svgHoverMsg,
            hasPermission = true,
            getLoadingState,
            hideTopHeader
        } = this.props;
        const {
            name,
            renderCustom,
            hideSvgHoverMsg,
            hideHeader,
            cardClassName,
            cardHeadClassName,
            svgHoverMsgConfig,
            noTitleSvgHoverMsgPositionsX,
            noTitleSvgHoverMsgPositionsY,
            noflag,
            noPaddingLeft,
            filtersFullWidth,
            setCardHeaderHeight,
            cardHeadBorderBottom,
            isSingleFormPage,
            headerConfig = {
                collapseVisible: false,
                zoomVisible: false
            },
            ...otherProps
        } = configs[cardType];
        const withSpaceSize = isNil(configs[cardType].withSpaceSize) ? {} : {margin: configs[cardType].withSpaceSize}
        return (
            <div
                id={id}
                className={classNames(
                    styles.cardWrapper,
                    cardClassName,
                    cardClassNames,
                    this.addZoomClass()
                )}
                style={{...withSpaceSize, ...style}}
                data-type={cardType}
            >
                {
                    hideTopHeader ? '' : !hideHeader && (
                        <CardHead
                            title={title || name}
                            collapseShow={collapseShow}
                            zoomShow={zoomShow}
                            cardHeadClassName={cardHeadClassName}
                            renderCustom={renderCustom}
                            hideSvgHoverMsg={hideSvgHoverMsg}
                            openCollapse={this.openCollapse}
                            enLargeZoom={this.enLargeZoom}
                            filters={filters}
                            settings={settings}
                            setFilters={this.setFilters}
                            headerConfig={headerConfig}
                            svgHoverMsg={svgHoverMsg || svgHoverMsgConfig}
                            noTitleSvgHoverMsgPositionsX={noTitleSvgHoverMsgPositionsX}
                            noTitleSvgHoverMsgPositionsY={noTitleSvgHoverMsgPositionsY}
                            hasPermission={hasPermission}
                            noflag={noflag}
                            noPaddingLeft={noPaddingLeft}
                            filtersFullWidth={filtersFullWidth}
                            setCardHeaderHeight={setCardHeaderHeight}
                            cardHeadBorderBottom={cardHeadBorderBottom}
                        />
                    )
                }
                <CardBody
                    loading={loading}
                    isLoading={isLoading}
                    isEmpty={isEmpty}
                    hideHeader={hideHeader}
                    collapseShow={collapseShow}
                    zoomShow={zoomShow}
                    toggleCollapseShow={this.toggleCollapseShow}
                    toggleZoomShow={this.toggleZoomShow}
                    openLoading={this.openLoading}
                    closeLoading={this.closeLoading}
                    renderEmptyData={this.renderEmptyData}
                    openGraphStatus={openGraphStatus}
                    settings={settings}
                    echartsLoading={echartsLoading}
                    echartsData={echartsData}
                    headerConfig={headerConfig}
                    setFilters={this.setFilters}
                    {...otherProps}
                    filters={filters}
                    getLoadingState={getLoadingState}
                    isSingleFormPage={isSingleFormPage}
                />
                {
                    zoomShow ? (
                        <Fragment>
                            <div className="bottomBlock"/>
                            <div className="rightBlock"/>
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

export default Card;