import request from 'helpers/service';
const cached = {}

export default function(...args){
    const key = JSON.stringify(args)
    if(!cached[key]){
        const temp = request(...args)
        temp.then(res => {
            if(res && JSON.stringify(res) !== '{}'){
                cached[key] = temp
            }
        })

        return temp;
    }

    return cached[key]
}