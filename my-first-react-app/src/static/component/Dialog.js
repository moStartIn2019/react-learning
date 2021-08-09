import React from 'react' // 每一个组件中，写的是jsx结构的组件的，都要依赖基于react的createElement把jsx进行解析渲染
/**
 * 函数式声明组件
 *  1.函数返回结果是一个新的jsx（也就是当前组件的jsx结构）
 *  2.props变量存储的值是一个对象，包含了调取组件时候传递的属性值（不传递是一个空对象）
 */
// export default function Dialog (props) {
//   let {con,lx=0,children,style={}} = props,
//       title = lx === 0 ? '系统提示' : '系统警告';
//   /**
//    * children：
//       可能有，可能没有;
//       可能只是一个值，也可能是一个数组;
//       可能每一项是一个字符串,也可能是一个对象等(代表双闭合组件中的子元素)
//     */
//   return <section style={style}>
//     <h2>{con}</h2>
//     <div>{title}</div>
//     {/* 把属性中传递的子元素放到组件中的指定位置 */}
//     {children}
//     {/* 也可以基于React中提供的专门遍历Children的方法来完成遍历操作 */}
//     {
//       React.Children.map(children, item => item)
//     }
//   </section>;
// }

export default function Dialog(props) {
  console.log(this); // undefined
  const {type, content, children} = props;
  // 样式
  const objStyle = {
    width: '50%',
    margin:　'0 auto'
  };
  // 类型处理
  let typeVal = type || '系统提示';
  if (typeof type === 'number') {
    switch (type) {
      case 0:
          typeVal = '系统提示';
          break;
      case 1:
          typeVal = '系统警告';
          break;
      case 2:
          typeVal = '系统错误'
          break;
    }
  }
  return <section className="panel panel-default" style={objStyle}>
    <div className="panel-heading">
      <h3>{typeVal}</h3>
    </div>
    <div className="panel-body">
      {content}
    </div>
    {/* 如果传递了children，把内容放到尾部中，不传递就什么都不显示 */}
    {
      children ? <div className="panel-footer">
        {React.Children.map(children, item => item)}
      </div> : null
    }
  </section>
}