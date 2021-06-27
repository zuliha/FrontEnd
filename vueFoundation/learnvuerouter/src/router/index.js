// 配置路由相关信息

import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router' //VueRouter 相当于插件

// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

//路由懒加载导入
const Home = () =>
    import ('../components/Home')
    // 导入子组件
const HomeNews = () =>
    import ('../components/HomeNews')
const HomeMessage = () =>
    import ('../components/HomeMessage')

const About = () =>
    import ('../components/About')
const User = () =>
    import ('../components/User')
const Profile = () =>
    import ('../components/Profile')


// 1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

// 2.创建VueRouter对象
const routes = [{ //变量名是routes,而不是routers
        // 默认处于首页位置
        path: '/',
        redirect: '/home' //重定向
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '首页'
        },
        children: [{
                path: '',
                redirect: 'news'
            },
            {
                path: 'news', //不用加/
                component: HomeNews
            },
            {
                path: 'message',
                component: HomeMessage
            }
        ]
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: '关于'
        },
        beforeEnter: (to, from, next) => {
            console.log('about beforeEnter');
            next()
        }
    },
    { //动态路由的获取
        path: '/user/:id',
        component: User,
        meta: {
            title: '用户'
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            title: '档案'
        }
    }

]
const router = new VueRouter({
    // 配置路由和组件之间的映射关系 ,ES6缩写语法，相当于routes:routes
    routes,
    mode: 'history'
})

// 前置守卫（guard）
router.beforeEach((to, from, next) => {
    //三个参数解析：
    //to：即将要进入的目标的路由对象
    //from：当前导航即将要离开的路由对象
    //next：调用该方法后，才能进入下一个钩子
    document.title = to.matched[0].meta.title
    console.log(to);
    console.log('+++++++++++++++');
    next()
})

// 后置钩子（hook）
router.afterEach((to, from) => {
    console.log('------------');

})

// 3.将router对象传入到vue实例中
export default router //导出