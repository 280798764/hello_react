// 读取localStorage


export function GetLocalStorage(key) {
    const value =localStorage.getItem(key)
    if(!value){
        return value
    }
    if(value.substr(0, 1) ==='{' || value.substr(0, 1) === '['){
        return JSON.parse(value)
    }
    return value;
  }