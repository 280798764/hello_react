
export const mapStateToPropsFactoryForCard = (needMapStates) => ((state, ownProps)=> {
    const result={...needMapStates};
    Object.keys(needMapStates).forEach(item => {
        const value = result[item];
        if(typeof value === 'string'){
            result[item] = state[value]
            if(typeof value === 'function'){
                result[item] = value(state, ownProps)
            }
        }
    })
    return result;
})