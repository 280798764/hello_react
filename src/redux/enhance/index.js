

/**
 * component 传入的组件
 * needMapState : key 值为传入的属性值  
 *  当value为字符串时， value状态树所保存的值,当value为函数时，有两个参数state， ownProps
 * const needMapState = {
    InternalYieldCurve: 'InternalYieldCurve',
    Login: state => state.Login.cardPermission
}
 * needMapActions: 需要的action

*/


import {connect} from 'react-redux';
import { mapDispatchToPropsFactoryForCard } from './mapDispatchToProps'
import{ mapStateToPropsFactoryForCard } from './mapStateToProps'

const enhance = (component, needMapStates={}, needMapActions ={}) => {
    const mapStateToProps = mapStateToPropsFactoryForCard(needMapStates);
    const mapDispatchToProps = mapDispatchToPropsFactoryForCard(needMapActions);
    return connect(mapStateToProps, mapDispatchToProps)(component)
}
export default enhance;