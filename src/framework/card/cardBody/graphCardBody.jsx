import React from "react";
import ReactEcharts from 'echarts-for-react';
import _, {isEqual, cloneDeep} from 'lodash';
import request from '../../../helpers/service' // 缺

class GraphCardBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            option: {}
        };
    }

    componentDidMount(){
        const { settings, filters } = this.props;
        const params = { ...settings, ...filters };
        this.getChartData(params);
    }

    componentDidUpdate(prevProps){
        const {settings, filters, echartsData} = this.props;
        if(!isEqual(settings, prevProps.settings)
        || !isEqual(echartsData, prevProps.echartsData)
        || !isEqual(filters, prevProps.filters)) {
            const params = { ...settings, ...filters };
            this.getChartData(params)
        }
    }

    getChartData(params){
        const id = this.state.id + 1;
        this.setState({
            id
        });
        const { echartsData, openLoading, openGraphStatus } = this.props;
        const { response } = this.props.echarts;
        if(echartsData){
            const option = response(echartsData, params)
            this.setState({ option }, this.dealOptionStatus)
            return;
        }

        // 开启loading
        if(openGraphStatus){
            openLoading();
        }
        const { method, url, requestParams } = this.props.echarts;
        const requestParamsData =  requestParams ? cloneDeep(requestParams(params)) : {};
        if(method === 'post'){
            request({
                method: 'post',
                url,
                data: requestParamsData
            }).then(res => {
                if(id !== this.state.id){
                    return;
                }
                const option = response(res, requestParamsData);
                this.setState({option}, this.dealOptionStatus)
            })
            return;
        }
        request({url, params: requestParamsData}).then(res => {
            const option = response(res, requestParamsData);
            this.setState({option}, this.dealOptionStatus)
        })
    }

    dealOptionStatus = () => {
        const { option } = this.state;
        const { closeLoading, openGraphStatus, renderEmptyData } = this.props;
        if(openGraphStatus){
            if(this.checkIsEmpty(option)){
                renderEmptyData();
                return
            }
            closeLoading()
        }
    }

    checkIsEmpty = (option = {}, isEmpty) =>{
        let i = isEmpty;
        const { series } = option;
        if(!isEmpty){
            if(series){
                if(_.isObjectLike(series)){
                    if(_.isArray(series)){
                        i = _.filter(series, v => v.data && v.data.length > 0 && _.filter(v.data, s => (s || s === 0)).length > 0).length < 1;
                    }else {
                        i = series.data && series.data.length < 1
                    }
                } else {
                    i = true;
                }
            } else {
                i = true
            }
        }
        return i;
    }   

    render(){
        const { height = 357, config } = this.props.echarts;
        const { option } = this.state;
        const newConfig = config ? typeof config === 'function' ? config(this.props) : config : {}
        const {zoomShow} =  this.props;
        return(
            <section
            style={{ height: '100%' }}
            >
                <ReactEcharts
                    notMerge
                    option={option}
                    style={{height: zoomShow ? '100%': height}}
                    {...newConfig}
                    />
            </section>
        )
    }
}


export default GraphCardBody
