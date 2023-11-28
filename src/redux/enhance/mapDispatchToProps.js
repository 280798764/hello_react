
export const mapDispatchToPropsFactoryForCard = (actionObjects) => ( dispatch => {
    const result = {};
    Object.keys(actionObjects).forEach(actionKey => {
        result[actionKey] = (data) => {
            dispatch(actionObjects[actionKey]({
                ...data
            }))
        }
       
    })
    return result;
})