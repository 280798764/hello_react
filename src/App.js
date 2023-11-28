// // import logo from './logo.svg';
// import zhCN from 'antd/es/locale/zh_CN';
// import { ConfigProvider, Button } from 'antd';
// import Home from 'containers/home'
// // import 'antd/dist/antd.css';
// import { Routes, Route } from "react-router-dom";
// import { divide } from 'lodash';

// export default function MyRouter(){
//   return(
//     <div>
//       {/* <Button>888</Button> */}
//     <Home/>

//     </div>

//   )
// }

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import Login from './pages/Login';
import Home from 'containers/home'

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" exact component={Login} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;

