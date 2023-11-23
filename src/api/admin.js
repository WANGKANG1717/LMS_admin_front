import request from '@/utils/request'
import user from "@/views/User.vue";

// 登录
export function adminLogin(number,password) {
    return request({
        url: '/system/login',
        method: 'post',
        data: {'number':number,'password':password}
    })
}

export function logout() {
    return request({
        url: '/system/logout',
        method: 'post'
    })
}

export function getAdminInfo() {
    return request ({
        url: '/system/user',
        method: 'get',
    })
}

export function updateUser(data) {
    return request({
        url: '/system/user',
        method: 'put',
        data: data
    })
}

export function getUserDetail(userId) {
    return request({
        url: '/system/user/' + userId,
        method: 'get',
    })
}

export function getUserList(params) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params
    })
}

export function deleteUser(userId) {
    return request({
        url: '/system/user/' + userId,
        method: 'delete',
    })
}

export function addUser(data) {
    return request({
        url: '/system/user',
        method: 'post',
        data
    })
}