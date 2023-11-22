import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Layout from "@/layout/Layout.vue";
// import {request} from "axios";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/index",
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import("@/views/Index"),
                meta: {
                    title: '主页',
                    keepAlive: true, // 需要被缓存
                }
            },
            //     {
            //         path: 'book',
            //         name: 'Book',
            //         component: () => import("@/views/Book"),
            //         meta: {
            //             title: '书籍管理',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'category',
            //         name: 'Category',
            //         component: () => import("@/views/Category"),
            //         meta: {
            //             title: '书籍分类',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'order',
            //         name: 'Order',
            //         component: () => import("@/views/Order"),
            //         meta: {
            //             title: '订单管理',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'user',
            //         name: 'User',
            //         component: () => import("@/views/User"),
            //         meta: {
            //             title: '用户管理',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'message',
            //         name: 'Message',
            //         component: () => import("@/views/Message"),
            //         meta: {
            //             title: '用户留言',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'admin',
            //         name: 'Admin',
            //         component: () => import("@/views/Admin"),
            //         meta: {
            //             role: 1,
            //             title: '管理员管理',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'person',
            //         name: 'Person',
            //         component: () => import("@/views/Person"),
            //         meta: {
            //             title: '个人信息',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
            //     {
            //         path: 'about',
            //         name: 'About',
            //         component: () => import("@/views/About"),
            //         meta: {
            //             title: '关于',
            //             keepAlive: true, // 需要被缓存
            //         }
            //     },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login"),
        meta: {
            title: '登录',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Register"),
        meta: {
            title: '注册',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/m_login',
        name: 'MLogin',
        component: () => import("@/views/MLogin"),
        meta: {
            title: '登录',
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/m_register',
        name: 'MRegister',
        component: () => import("@/views/MRegister"),
        meta: {
            title: '注册',
            keepAlive: true, // 需要被缓存
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 限制某些页面禁止未登录访问
// 不在白名单里面的路径页面将会校验token
const whitePath = ['/login', '/register', '/m_register', '/m_login'];

//动态切换标题
// router.beforeEach((to, from, next) => {
//     window.document.title = (to.meta.title == undefined)?'图书馆管理系统':to.meta.title;
//     next();
// })

router.beforeEach((to, from, next) => {
    if (whitePath.includes(to.path)) {
        next();
        return;
    }
    // 判断用户信息和token信息
    var token = sessionStorage.getItem("token")
    var admin = sessionStorage.getItem("admin")
    if(!token || !admin) {
        next("/login")
    }
    else {
        next()
    }
})

export default router
