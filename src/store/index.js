import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import {getAdminInfo} from "@/api/admin";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        admin: null,
    },
    getters: {
        token() {
            return sessionStorage.getItem("token")
        },
        admin() {
            return JSON.parse(sessionStorage.getItem("admin"))
        }
    },
    mutations: {
        setToken(state, value) {
            state.token = value
        },
        setAdmin(state, value) {
            state.admin = value
        }
    },
    actions: {
        getAdminInfo(context) {
            // console.log(context)
            getAdminInfo().then(
                res => {
                    if (res.code == 200) {
                        context.state.admin = res.data
                        // context.commit('setAdmin', res.data)
                        sessionStorage.setItem("admin", JSON.stringify(res.data))
                        //登录成功之后进行页面跳转
                        router.push("/index")
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })
                    }
                }
            )
        }
    },
    modules: {}
})
