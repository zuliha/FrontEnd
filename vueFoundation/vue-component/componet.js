// 组件类似于自定义元素
Vue.component('todo-item', {
    // 类似于自定义attribute
    props: ['todo'],
    template: `<li>
    {{ todo.text }}
    </li>`
})

var app7 = new Vue({
    el: '#app',
    data: {
        List: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
})