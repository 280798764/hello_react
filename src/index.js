// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import {HashRouter } from 'react-router-dom';
// import RootRouter from './routers/RootRouter';
// import 'assert/less/reset.module';
// import './index.css';
// // import store from './redux/store';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// const hotRender = NextRouter => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <HashRouter>
//         <NextRouter/>
//       </HashRouter>
//     </Provider>,
//     document.getElementById('root')
//   )
// };

// // hotRender(RootRouter)

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();