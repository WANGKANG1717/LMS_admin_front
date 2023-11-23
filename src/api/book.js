/*
 * @Datetime : 2023/11/22 15:01
 * @Author   : WANGKANG
 * @Email    : 1686617586@qq.com
 * @File     : book.js.vue
 * @brief    : $brief$
 * Copyright 2023 WANGKANG, All Rights Reserved.
 */

import request from '@/utils/request'
import router from '@/router'

export function bookCount() {
    return request({
        url: '/system/book/count',
        method: 'get',
    })
}

export function bookList(params) {
    return request({
        url: '/system/book/list',
        method: 'get',
        params: params
    })
}

export function updateBook(data) {
    return request({
        url: '/system/book/update',
        method: 'put',
        data: data
    })
}

export function deleteBook(id) {
    return request({
        url: "/system/book/delete/" + id,
        method: 'delete',
    })
}

export function addBook(data) {
    return request({
        url: "/system/book/add",
        method: 'post',
        data: data,
    })
}

export function deleteBatchBook(data) {
    return request({
        url: "/system/book/deleteBatch",
        method: 'post',
        data: data,
    })
}