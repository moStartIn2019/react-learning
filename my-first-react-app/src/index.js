import React, { Children } from 'react';
import ReactDOM, {render} from 'react-dom'; // 从react-dom中导入一个ReactDOM，逗号后面的内容是把
// react-dom这个对象进行解构
import './static/less/index.less';
import Dialog from './static/component/Dialog';
import Dialog2 from './static/component/Dialog2'
/** 
 * 1.我们一般都把程序中的公用样式放到index.js中导入，这样在其他组件中也可以使用了
 *  （webpack会把所有的组件最后都编译到一起，index是主入口）
 * 2.导入bootstrap，可以导入min，但是里面依赖了一些font-face，需要连同fonts一起导入，
 *   但是bootstrap已成过去式，现在都用阿里的ant-design
 *  */
import './static/css/bootstrap.min.css';
// import { createElement, render } from './static/3-SELF-JSX'
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
const data = [{ name: '张三', age: 18 }, { name: '李四', age: 20 }];
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
 * 
 * jsx的渲染机制
 * 1.基于BABEL中的语法解析（@babel/preset-react）把JSX语法编译为React createElement(...)结构
 * 2.执行React.createElement(type, props, children)，创建一个虚拟dom
 *    虚拟dom就是一个对象，记录了必要的信息（比如type,key,props(children,style,id,className...),ref...）
 *  // 1.jsx经过babel的@babel/preset-react变成React.createElement(type,props,children)
    // 2.React.createElement(type,props,children)生成vdom
    // 3.再调用render(vdom，container)
 * 3.ReactDom.render(JSX语法最后生成的对象，容器)，基于RENDER方法把生成的对象动态创建为DOM，插入到指定的容器中 
 */
//@babel/preset-react => 
//  (0, _reactDom.render)( /*#__PURE__*/_react.default.createElement("div", {
//   id: "box",
//   className: "box"
//    }, /*#__PURE__*/_react.default.createElement("h1", null, author), /*#__PURE__*/_react.default.createElement("span", {
//    style: styleObj
//    }, "2021/8/1")), root);

// <div id="box" className="box">
// <h1>{author}</h1>
// <span style={styleObj}>2021/8/1</span>
//</div> 
const styleObj = { fontSize: '40px', fontWeight: 'bold' }
// render(<div id="box" className="box">
//   <h1>{author}</h1>
//   <span style={styleObj}>2021/8/1</span>
// </div>,root)

/**
 * 知识点：
 *  createElement在处理的时候，遇到一个组件，返回的对象中：
 *  type就不再是字符串标签名了，而是一个函数（类），但是属性还是存在props中
 * {
 *  type: Dialog,
 *  props: {
 *    lx: 1,
 *    con: 'xxx',
 *    children:一个值或者一个数组
 *  }
 * }
 * 
 * =》render渲染的时候，需要做处理，
 * 首先判断type的类型，
 * 如果是字符串，就创建一个元素标签，
 * 如果函是函数或者类，就把函数执行，把props中的每一项（包含children）传递给函数
 * =》在执行函数的时候，把函数中return的jsx转换为新对象（通过createElement），把这个对象返回
 * =》紧接着render按照以往的渲染方式，创建dom元素，插入到指定的容器中即可
 */
// render(<div>
//   {/*注释：jsx中调取组件，只需要把组件当做一个标签调取使用即可
//   (单闭合和双闭合即可) */}
//    <Dialog con="111" style={{color: 'red'}}/>
//    {/* 属性值不是字符串的话，需要使用大括号包起来，比如数字 */}
//    <Dialog con="222" lx={2}>
//      <span>1</span>
//      <span>2</span>
//    </Dialog>
// </div>,root)
ReactDOM.render(<main>
  <Dialog content='111'/>
  {/* <Dialog content='111'/>
  <Dialog type={1} content="222"/>
  <Dialog type={2} content={
    <div>
      <input type="text" className="form-control" placeholder="请输入用户名"/>
      <br />
      <input type="password" className="form-control" placeholder="请输入密码"/>
    </div>
  }>
    <button className="btn btn-success">login in</button>
    <button className="btn btn-danger">login out</button>
  </Dialog> */}
  <Dialog2 con='哈哈'></Dialog2>
</main>, root)

// React.createElement(type, props, children)
// console.log(React.createElement("span", {
//   style: styleObj,
//   ref: 'aa',
//   key: 'bb'
// }, "2021/8/1"));
//==>
//  返回一个Object，
//  $$typeof: Symbol(react.element)
//  key: "bb"
//  props: (props包含了children和style)
  // children: "2021/8/1"
  // style: {fontSize: "40px", fontWeight: "bold"}
  // key: undefined
  // ref: undefined
  // get key: ƒ ()
  // get ref: ƒ ()
  // [[Prototype]]: Object
//  ref: "aa"
//  type: "span"
//  _owner: null
//  _store: {validated: false}
//  _self: null
//  _source: null
//  [[Prototype]]: Object

// render(createElement('div', {
//     style: {
//       color: 'red'
//     },
//     className: 'box',
//     id: 'box',
//     ref: 'box',
//     key: 'box'
//   },
//   'hello word',
//   createElement('div', {
//     style: {
//       color: 'green'
//     },
//     className: 'box1',
//     id: 'box1',
//     ref: 'box1',
//     key: 'box1'
//   }, 'hello word-1')), root)