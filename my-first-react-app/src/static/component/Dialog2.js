import React, {Component} from 'react';
import ReactDOM from 'react-dom';

/**
 * 基于继承Component类来创建组件
 * 基于create-element把“jsx”转换成一个“对象”，当render渲染这个对象的时候，遇到type是一个函数或者
 * 类，不是直接创建元素，而是先把方法执行：
 *  =》如果是函数式声明的组件，就把它当做普通方法执行（方法中的this是undefined），把函数返回的jsx元素（也是解析后的对象）进行渲染
 *  =》如果是类声明式的组件，会把当前类new它执行，创建类的一个实例（当前本次调取的组件就是它的实例），所以this指向它的实例，
 *     在执行constructor之后，会执行this.render()，把render中返回的jsx拿过来渲染，所以“类”声明式组件，必须有一个render的方法，方法中需要返回一个jsx元素
 * 
 * 但是不管哪一种方式，最后都会把解析出来的props属性对象作为实参传递给对应的函数或者类
 * 
 */
class Dialog extends Component {
  constructor (props) {
    super(props); // es6中的extends继承，一旦使用了constructor，第一行位置必须设置super执行，相当于React.Component.call(this)，也就是call继承，把父类私有的属性继承过来
              // super(props,context,updater) // 默认值是undefined 
    // 如果只写super()，虽然创建实例的时候把属性传递进来了，但是并没有传递父组件，也就是没有把属性挂载到实例上，使用this.props获取的结果是undefined
    
    /**
     * 但是，在constructor中不设置形参props接收属性，执行super的时候也不传这个属性，除了constructor
     * 中不能直接使用this.props，其它生命周期函数中（比如componentWillMount）都可以使用
     * 也就是执行完成constructor，react已经帮我们把传递的属性接收，并且挂载到了实例上（不是undefined）
     */

    // props：当render渲染并且把当前类执行创建实例的时候，会把之前jsx解析出来的props对象中的信息（可能有children）传递给参数props =》 调取组件传递的属性
    /** 
     * this.props：属性集合
     * this.refs：ref集合（非受控组件中用到）
     * this.context：上下文
     * this.state
     * this.updater
     */
    console.log(this); // new Dialog()
    console.log(this.props); // super必须传入props，否则this.props为undefined
  }

  render() {
    return <section>
      <h3>系统提示</h3>
      <div></div>
    </section>
  }
}

export default Dialog

/**
 * 总结：函数式声明组件，基于继承Component类的组件
 * 
 * 【函数式】
 *    1.操作非常简单
 *    2.能实现的功能也很简单，只是简单的调取和返回jsx而已
 * 【创建类式】
 *    1.操作相对复杂些，但是也可以实现更为复杂的业务功能
 *    2.能够使用生命周期函数操作业务（重点）
 *    3.函数式可以理解为静态组件（组件中的内容调取的时候就已经固定了，很难再修改），而类这种方法，可以基于组件内部的状态来动态更新渲染的内容
 *    4. xxx
 */