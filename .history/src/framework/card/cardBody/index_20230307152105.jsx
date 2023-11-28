
//卡片内容组件


import React from 'react';
import {isEqual} from "lodash";
import classNames from 'classnames';
import Loading  from 'components/loading';
import EmptyData from 'components/emptyData';
import GraphCardBody from './graphCardBody';
import styles from './cardBody.module.less'


class CardBody extends React.Component{
   state = {
        InnerComponent: null
    }

    componentDidMount = () => {
        const {cardModule, cardType, echarts} = this.props;
        const InnerComponent = echarts ? GraphCardBody : require(`modules/${cardModule}/${cardType}/index.jsx`).default;
        this.setState({
            InnerComponent
        });
    }


    // shouldComponentUpdate(nextProps,nextState){
    //     return !isEqual(this.props, nextProps) || isEqual(this.state, nextState)
    // }

    addCollapseClass = () => {
        const {collapseShow} = this.props;
        const {collapseVisible} = this.props.headerConfig;
        if(collapseVisible){
            return `${collapseShow ? 'openStatus' : 'closeStatus'}` 
        }
        return '';
    }

    addZoomClass = () => {
        const {zoomShow} = this.props;
        return `${zoomShow ? 'enLargeCardBody' : ''}`;
    }

    render(){
        const {InnerComponent} = this.state;
        const {
            filters,
            settings,
            setFilters,
            loading,
            isLoading,
            isEmpty,
            hideHeader,
            cardBodyClassName,
            openLoading,
            closeLoading,
            renderEmptyData,
            echarts,
            echartsLoading,
            echartsData,
            openGraphStatus,
            zoomShow,
            toggleCollapseShow,
            toggleZoomShow,
            headerConfig,
            getLoadingState,
            isSingleFormPage
        } = this.props;
        return(
            <div
                className={
                    isSingleFormPage ? (
                        classNames(
                            styles.cardBody,
                            styles.isSingleFormPage,
                            cardBodyClassName,
                            hideHeader && styles.noHeaderBody,
                            this.addCollapseClass(),
                            this.addZoomClass()
                        )
                    ) : (
                        classNames(
                            styles.cardBody,
                            cardBodyClassName,
                            hideHeader && styles.noHeaderBody,
                            this.addCollapseClass(),
                            this.addZoomClass()
                        )
                    )
                }
                style={typeof isSingleFormPage === 'number' ? {height: `calc(100vh - ${isSingleFormPage}px`} : {}}
            >
                {(isLoading || echartsLoading) && <div className={styles.isLoading}><Loading size="md" /></div>}
                {isEmpty && <div className={styles.isEmpty}><EmptyData size={`${zoomShow ? 'lg' : 'sm'}`}/></div>}
                {
                    InnerComponent
                    ?(
                        <InnerComponent
                            openLoading={openLoading}
                            closeLoading={closeLoading}
                            loading={loading}
                            isEmpty={isEmpty}
                            renderEmptyData={renderEmptyData}
                            filters={filters}
                            settings={settings}
                            setFilters={setFilters}
                            headerConfig={headerConfig}
                            echarts={echarts}
                            echartsData={echartsData}
                            openGraphStatus={openGraphStatus}
                            zoomShow={zoomShow}
                            toggleCollapseShow={toggleCollapseShow}
                            toggleZoomShow={toggleZoomShow}
                            getLoadingState={getLoadingState}
                            />
                    ) : null
                }
            </div>
        );
     }
    }

    export default CardBody;