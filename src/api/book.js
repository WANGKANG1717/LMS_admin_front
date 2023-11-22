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