/*
 * @Datetime : 2023/11/23 10:00
 * @Author   : WANGKANG
 * @Email    : 1686617586@qq.com
 * @Blog     : kang17.xyz
 * @File     : borrowHistory.vue
 * @brief    : 借阅历史接口
 * Copyright 2023 WANGKANG, All Rights Reserved.
 */
import request from '@/utils/request'

export function getBorrowHistory(params) {
    return request({
        url: '/system/borrow_history',
        method: 'get',
        params
    })
}

export function addBorrowHistory(data) {
    return request({
        url: '/system/borrow_history',
        method: 'post',
        data
    })
}