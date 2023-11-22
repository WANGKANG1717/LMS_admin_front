import request from '@/utils/request'

// 登录
export function adminLogin(number,password) {
    return request({
        url: '/system/login',
        method: 'post',
        data: {'number':number,'password':password}
    })
}

// {
//     "number":"1234567890124",
//     "userName":"wk12345124",
//     "password":"1234"
// }
export function userRegister(formData) {
    return request({
        url: '/user/register',
        method: 'post',
        data: formData
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

export function savaUserInfo(userinfo) {
    return request({
        url: '/user/userInfo',
        method: 'put',
        data: userinfo
    })
}