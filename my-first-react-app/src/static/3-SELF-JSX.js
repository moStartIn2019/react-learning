// babel基于强大的正则词法分析（还有语法分析）
// JSX的渲染机制
/**
 * 1.创建一个对象（默认有四个属性：type、props、ref、key）
 *   最后要把这个对象返回
 * 2.根据传递的值修改这个对象
 *   type =》传递的type
 *   props =》 需要做一些处理：大部分传递props中的属性都赋值给对象的props
 *             有一些比较特殊的，如果是ref或者key，就需要把传递的props中的这两个属性值，给创建对象的两个属性，
 *             而传递的props中把这两个值删除掉（undefined）；
 *             把传递的children作为新创建对象的props中的一个属性
 * 
 * 创建jsx对象，参数至少两个 type，props。children这个部分可能没有，可能有多个
 * @param {*} type 
 * @param {*} props 
 * @param {*} children 
 */
export function createElement(type, props, ...children) {
  props = props || {} // props为null的处理
    // 创建一个对象，设置一些默认属性
  let obj = {
    type: null,
    props: {},
    ref: null,
    key: null
  };
  // 用传递的type和props覆盖原有的默认值
  // obj = {...obj, type, props}
  // 把传递的children放到props中
  obj = {...obj, type, props: {...props} };
  if (children.length && children.length === 1) {
    obj.props.children = children[0];
  } else if (children.length && children.length > 1) {
    obj.props.children = children;
  }
  // 把ref和key提取出来（并且删除props中的key和ref）
  'key' in obj.props && getPropsVal('key', obj)
  'ref' in obj.props && getPropsVal('ref', obj)
  return obj;
}

function getPropsVal(name, obj) {
  obj[name] = obj.props[name]
  obj.props[name] = undefined
}
console.log(createElement('div', {
    style: {
      color: 'red'
    },
    className: 'box',
    id: 'box',
    ref: 'aa',
    key: 'aa'
  },
  'hello word',
  createElement('div', {
    style: {
      color: 'green'
    },
    className: 'box1',
    id: 'box1',
    ref: 'aa1',
    key: 'aa1'
  }, 'hello word-1')
));

console.log(createElement('div', null))

/**
 * render: 把创建的对象（vdom）生成对应的dom元素，最后插入到页面中
 */

export function render(obj, container, callback) {
  let { type, props } = obj || {},
    newElement = document.createElement(type);
  for (let attr in props) {
    if (!props.hasOwnProperty(attr)) break; // 不是私有的（公有，原型上的），直接结束遍历
    if (!props[attr]) continue; // 如果当前属性没有值(undefined)，直接跳过进入下一个，不处理即可
    let value = props[attr]; // 接下来的既是私有的，也是有值的
    switch (attr.toUpperCase()) {
      case 'CLASSNAME': // className的处理
        newElement.setAttribute('class', value);
        break;
      case 'STYLE': // style的处理
        if (value === '') break; // 如果style的值为空字符串，不做处理，继续下一个遍历
        for (let styAttr in value) {
          if (value.hasOwnProperty(styAttr)) {
            newElement['style'][styAttr] = value[styAttr]
          }
        }
        break;
      case 'CHILDREN': // children的处理
        /**
         * children可能是一个值：字符串或者是一个jsx对象
         *         也可能是一个数组：数组中的每一项可能是字符串或者是jsx对象
         * 
         * 首先把一个值也变为数组，这样后期统一操作数组即可
         */
        if (!Array.isArray(value)) {
          value = [value];
        }
        value.forEach((item, index) => {
          // 验证item是什么类型的： 
          // 如果是字符串就创建文本节点，
          // 如果是对象就创建元素节点，需要再次执行render方法，把当前创建的newElement当做children的container
          if (typeof item === 'string') { // textNode
            const text = document.createTextNode(item)
            newElement.appendChild(text)
          } else { // elementNode
            render(item, newElement) // item => obj, newElement => container
          }
        })
        break;
      default:
        newElement.setAttribute(attr, value); // 基于set-attribute可以让设置的属性表现在HTML的结构上
    }
  }
  container.appendChild(newElement);
  callback && callback();
}