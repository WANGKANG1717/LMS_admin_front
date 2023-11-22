import request from '@/utils/request'

// 登录
export function adminLogin(number,password) {
    return request({
        url: '/system/login',
        method: 'post',
        data: {'number':number,'password':password}
    })
}

export function userRegister(username,nickName,email,password) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
            isToken :false
        },
        data: {"username":username,"nickName":nickName,"email":email,"password":password}
    })
}


export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getAdminInfo() {
    return request ({
        url: '/system/user',
        method: 'get',
    })
}

export function savaUserInfo(userinfo) {
    return request({
        url: '/user/userInfo',
        method: 'put',
        data: userinfo
    })
}