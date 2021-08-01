import React from 'react';
import ReactDOM from 'react-dom';
import './static/less/index.less'
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

/**
 * 将jsx语法转换为真实dom，结构ReactDom.render([jsx], [container], [callback])
 * @params jsx: jsx syntax
 * @params container: 容器，我们想把元素放到页面中的哪个容器中
 * @params callback: （不常用）当把内容放到页面中后呈现触发的回调函数
 */ 
const author = 'mo';
const data = [{name: '张三', age: 18}, {name: '李四', age: 20}];
const root = document.querySelector('#root')
// ReactDOM.render(
//   <div>hello world by {author}
//   <ul>
//     {
//       data.map((item, index) => {
//         const {name, age} = item;
//         return  <li key={index}>
//                   <span>{name}</span>
//                   <span>{age}</span>
//                 </li>;
//       })
//     }
//   </ul>
//   </div>, root)

/** jsx中的用法
 * 只能有一个父div，与vue的template一样
 * className 替代 class
 * style 里面{}再包含了一个对象 即{{}}
 */
ReactDOM.render(<div id="box" className="box">
  <h1>{author}</h1>
  <span style={{fontSize: '30px', fontWeight: 'bold'}}>2021/8/1</span>
</div>,root)