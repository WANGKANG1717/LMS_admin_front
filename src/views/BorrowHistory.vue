<template>
    <div style="padding: 0px 0">
        <!--    功能区域-->
        <div style="margin-bottom: 10px; margin-left: 10px; width: 100%;">
            <span style="float: left; margin:10px 0px 0px 0px;">
                            <el-input v-model="searchParams.userId"
                                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                                      placeholder="请输入用户Id"
                                      clearable></el-input>
            <el-input v-model="searchParams.bookId" placeholder="请输入图书Id"
                      style="margin-right:  10px; margin-bottom: 10px; width: 200px"
                      clearable></el-input>
                <!--                0已借出 / 1已归还 / 2过期未还 / 3已预约-->
            <el-select v-model="searchParams.borrowStatus" placeholder="请选择借阅状态">
                <el-option label="全部" value=""></el-option>
              <el-option label="已借出" value="0"></el-option>
              <el-option label="已归还" value="1"></el-option>
              <el-option label="过期未还" value="2"></el-option>
              <el-option label="已预约" value="3"></el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
            </span>
        </div>
        <!--    行区-->
        <div style="margin: 10px">
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 99%"
            >
                <el-table-column
                        prop="userId"
                        label="UserId"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="bookId"
                        label="BookId"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="reservationTime"
                        label="预定时间"
                ></el-table-column>
                <el-table-column
                        prop="reservationToTime"
                        label="预定截止时间"
                ></el-table-column>
                <el-table-column prop="borrowDate" label="借阅日期"></el-table-column>
                <el-table-column prop="returnDate" label="归还时间"></el-table-column>
                <el-table-column prop="borrowStatus" label="借阅状态">
                    <template #default="scope">
                        {{ scope.row.borrowStatus | formatBorrowStatus }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #default="scope">
                        <el-button type="primary" size="mini" @click="showBook(scope.row.bookId)"
                                   style="margin-bottom: 5px">图书信息
                        </el-button>
                        <el-button type="primary" size="mini" @click="showUser(scope.row.userId)">用户信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--    分页区-->
        <div style="margin: 10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            >
            </el-pagination>
            <!--图书相关窗口-->
            <el-dialog title="图书信息" :visible.sync="bookVis" width="60%">
                <el-table :data="bookList" stripe border>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="bookName" label="图书名称"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>
                    <el-table-column prop="author" label="作者"></el-table-column>
                    <el-table-column prop="category" label="分类"></el-table-column>
                    <el-table-column prop="isbn" label="ISBN"></el-table-column>
                    <el-table-column prop="createtime" label="出版时间"></el-table-column>
                    <el-table-column label="封面" width="122px">
                        <template #default="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.cover"
                                    :preview-src-list="[scope.row.cover]"
                            >
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="inventory"
                            label="库存"
                            sortable
                    ></el-table-column>
                </el-table>
                <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="bookVis = false"
            >确 定</el-button
            >
          </span>
                </template>
            </el-dialog>
            <!--用户信息窗口-->
            <el-dialog title="用户信息" :visible.sync="userVis" width="50%">
                <el-table :data="userList" stripe border>
                    <el-table-column prop="id" label="ID" sortable></el-table-column>
                    <el-table-column label="头像" width="122px">
                        <template #default="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.avater"
                                    :preview-src-list="[scope.row.avater]"
                            >
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            label="学号/工号"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            prop="nickName"
                            label="昵称"
                            sortable
                    ></el-table-column>
                    <el-table-column prop="age" label="年龄" sortable></el-table-column>
                    <el-table-column prop="sex" label="性别" sortable></el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            prop="phonenumber"
                            label="手机号"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            sortable
                    >
                        <template #default="scope">
                            {{ scope.row.status | formatStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="账号类型"
                            sortable
                    >
                        <template #default="scope">
                            {{ scope.row.type | formatType }}
                        </template>
                    </el-table-column>

                    <!--                    <el-table-column label="角色">-->
                    <!--                        <template #default="scope">-->
                    <!--                            <span v-if="scope.row.role === 0">普通用户</span>-->
                    <!--                            <span v-if="scope.row.role === 1">会员</span>-->
                    <!--                        </template>-->
                    <!--                    </el-table-column>-->
                </el-table>
                <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="userVis = false"
            >确 定</el-button
            >
          </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import {getBorrowHistory} from "@/api/borrowHistory";
import {getBookDetail} from "@/api/book";
import {getUserDetail} from "@/api/admin";

export default {
    name: "BorrowHistory",
    components: {},
    filters: {
        formatBorrowStatus(value) {
            //    0已借出 / 1已归还 / 2过期未还 / 3已预约
            var map = {
                "0": '已借出',
                "1": "已归还",
                "2": "过期未还",
                "3": "已预约",
            }
            return map[value]
        },
        formatStatus(value) {
            //    0已借出 / 1已归还 / 2过期未还 / 3已预约
            var map = {
                "0": '正常',
                "1": "停用",
            }
            return map[value]
        },
        formatType(value) {
            //    0已借出 / 1已归还 / 2过期未还 / 3已预约
            var map = {
                "0": '普通用户',
                "1": "管理员",
            }
            return map[value]
        }
    },
    data() {
        return {
            //用户信息和图书信息
            bookVis: false,
            bookList: [],
            userVis: false,
            userList: [],
            rules: {
                bookId: [
                    {required: true, message: "请输入书籍ID", trigger: "blur"},
                    {type: "number", message: "bookId必须为数字值"},
                ],
                userId: [
                    {required: true, message: "请输入用户ID", trigger: "blur"},
                    {type: "number", message: "bookId必须为数字值"},
                ],
                totalPrice: [
                    {required: true, message: "请输入总价", trigger: "blur"},
                    {
                        pattern:
                            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: "请输入正确金额格式,可保留两位小数",
                    },
                ],
                payPrice: [
                    {required: true, message: "请输入实付款", trigger: "blur"},
                    {
                        pattern:
                            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: "请输入正确金额格式,可保留两位小数",
                    },
                ],
                discount: [
                    {required: true, message: "请输入优惠", trigger: "blur"},
                    {
                        pattern:
                            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: "请输入正确金额格式,可保留两位小数",
                    },
                ],
                transportPrice: [
                    {required: true, message: "请输入运费", trigger: "blur"},
                    {
                        pattern:
                            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: "请输入正确金额格式,可保留两位小数",
                    },
                ],
            },
            admin: {},
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 10,
            dialogVisible: false,
            form: {},
            tableData: [],
            importUrl: window.server.Url + "/order/import",
            ids: [], //需要删除的id的数组
            searchParams: {}
        };
    },
    //网页一加载就调用这个方法
    created() {
        let adminStr = sessionStorage.getItem("admin");
        this.admin = JSON.parse(adminStr);
        //请求服务器，确认当前用户的合法信息
        request.get("/admin/" + this.admin.id).then((res) => {
            if (res.code === "0") {
                this.admin = res.data;
            }
        });
        // console.log(window.server.filesUploadUrl);
        this.load();
    },
    methods: {
        showBook(bookId) {
            console.log(bookId)
            getBookDetail(bookId).then(
                res => {
                    if (res.code === 200) {
                        this.bookList = []
                        this.bookList.push(res.data)
                        this.bookVis = true;
                    } else {
                        this.$message.error(res.msg)
                    }
                }
            )
        },
        showUser(userId) {
            console.log(userId)
            getUserDetail(userId).then(
                res => {
                    if (res.code === 200) {
                        this.userList = []
                        this.userList.push(res.data)
                        this.userVis = true;
                    } else {
                        this.$message.error(res.msg)
                    }
                }
            )
        },
        load() {
            var params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.searchParams
            }
            console.log(params)
            getBorrowHistory(params).then((res) => {
                if (res.code === 200) {
                    console.log("load" + res);
                    this.tableData = res.data.rows;
                    this.total = parseInt(res.data.total);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            this.currentPage = pageNum;
            this.load();
        },
    },
};
</script>
