 import React from 'react';
 const test01 = (props) => {
    const add  =  (x, y) => x + y;
    const log = func => (...args) => {
        console.log(...args);
        return func (...args)
    }

    const logAdd =  log(add)

    return ( 
        <button onClick={log}>222</button>
     );
 }
  
 
export default test01;