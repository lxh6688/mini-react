//v1 
// const dom = document.createElement('div')
// dom.id = 'app'
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = 'app'
// dom.append(textNode)

//v2 react -> vdom -> js object

// type props children
// const textEl = {
//   type: 'TEXT_ELEMENT',
//   props: {
//     nodeValue: 'app',
//     children: []
//   }
// }

// const el = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [textEl]
//   }
// }
 
// const dom = document.createElement(el.type)
// dom.id = el.props.id
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

// 封装 v2
function createTextNode(text){
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children){
  return {
    type,
    props:{
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

// const textEl = createTextNode('app')
// const App = createElement("div", {id: 'app'}, textEl)

// const dom = document.createElement(App.type)
// dom.id = App.props.id
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

//1. 创建节点 2.设置prop 3.append
function render(el, container){
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)

  Object.keys(el.props).forEach((key) => {
    if(key !== 'children'){
      dom[key] = el.props[key]
    }
  })

  const children = el.props.children
  children.forEach(child => {
    render(child, dom)
  });
  container.append(dom)
}

const textEl = createTextNode('app')
const App = createElement("div", {id: 'app'}, 'app', textEl)
console.log(App)
// render(App, document.querySelector('#root'))

const ReactDom = {
  createRoot(container){
    return {
      render(App){
        render(App, container)
      }
    }
  }
}

ReactDom.createRoot(document.querySelector('#root')).render(App)