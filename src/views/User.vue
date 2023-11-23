<template>
    <div style="padding:0px 0">
        <!--    功能区域-->
        <div style="margin: 10px">
            <el-button type="primary" @click="add">新增</el-button>
            <span style="float: right; margin-right: 20px">
                            <el-input v-model="searchParams.userName"
                                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                                      placeholder="请输入用户名"
                                      clearable></el-input>
                <!--                0已借出 / 1已归还 / 2过期未还 / 3已预约-->
            <el-select v-model="searchParams.status" placeholder="请选择用户状态"
                       style="margin-right: 10px; margin-bottom: 10px; width: 200px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="已停用" value="1"></el-option>
            </el-select>
                <el-select v-model="searchParams.type" placeholder="请选择用户类型"
                           style="margin-right: 10px; margin-bottom: 10px; width: 200px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="普通用户" value="0"></el-option>
                </el-select>
            <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
            </span>
        </div>
        <!--    行区-->
        <div style="margin: 10px">
            <el-table :data="tableData" border stripe style="width: 99%">
                <el-table-column prop="id" label="ID" sortable></el-table-column>
                <el-table-column label="头像" width="122px">
                    <template #default="scope">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="scope.row.avatar"
                                :preview-src-list="[scope.row.avatar]"
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="学号/工号" sortable></el-table-column>
                <el-table-column prop="userName" label="用户名" sortable></el-table-column>
                <el-table-column prop="sex" label="性别" sortable></el-table-column>
                <el-table-column prop="email" label="邮箱" sortable></el-table-column>
                <el-table-column prop="phone" label="手机号" sortable></el-table-column>
                <el-table-column prop="address" label="地址" sortable></el-table-column>
                <el-table-column prop="status" label="状态" sortable>
                    <template #default="scope">
                        {{ scope.row.status | formatStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="账号类型" sortable>
                    <template #default="scope">
                        {{ scope.row.type | formatType }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="145px">
                    <template #default="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
                            <template #reference>
                                <el-button size="mini" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
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
                    :total="total">
            </el-pagination>
        </div>
        <!--      新增表单-->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="学号/工号" prop="number">
                    <el-input :disabled="number_disable" v-model="form.number" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="密码" v-if="!number_disable" prop="password">
                    <el-input v-model="form.password" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <div>
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status">
                        <el-option label="停用" value="1"></el-option>
                        <el-option label="正常" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type">
                        <el-option label="管理员" value="1"></el-option>
                        <el-option label="普通用户" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload ref="upload" :action="avatarUploadUrl" :on-success="avatarUploadSuccess"
                               :on-error="avatarUploadError">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import request from "@/utils/request";
import {addUser, deleteUser, getUserList, updateUser} from "@/api/admin";

export default {
    name: "User",
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
            rules: {
                number: [
                    {required: true, message: '请输入工号/学号', trigger: 'blur'},
                    {min: 10, max: 10, message: '长度在 10 个字符', trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请输入昵称', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                ],
                age: [
                    {required: true, message: '请输入年龄', trigger: 'blur'},
                    {type: 'number', message: '年龄必须为数字值'}
                ],
                sex: [
                    {required: true, message: '请选择性别', trigger: 'blur'},
                ],
                address: [
                    {required: false, message: '请输入地址', trigger: 'blur'},
                ],
                email: [
                    {
                        pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: '请输入检查邮箱格式',
                        trigger: 'blur'
                    }
                ],
            },
            admin: {},
            search: '',
            currentPage: 1,
            pageSize: 10,
            total: 10,
            dialogVisible: false,
            form: {},
            tableData: [],
            searchParams: {},
            avatarUploadUrl: window.server.Url + "/files/upload",
            number_disable: true
        }
    },
    //网页一加载就调用这个方法
    created() {
        this.admin = this.$store.getters.admin
        // console.log(window.server.filesUploadUrl);
        this.load();
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    this.$message({
                        type: "error",
                        message: "请检查表单"
                    })
                    return false;
                }
                this.save();
            });
        },
        avatarUploadSuccess(res) {
            console.log("avatarUploadSuccess" + res);
            this.form.avatar = res.data;
            this.$message.success("上传成功")
        },
        avatarUploadError(res) {
            this.$message.error("上传失败，请见文件大小和格式（小于2M）")
        },
        load() {
            var params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                ...this.searchParams
            }
            getUserList(params).then(
                res => {
                    if (res.code === 200) {
                        // console.log(res);
                        this.tableData = res.data.rows;
                        this.total = parseInt(res.data.total);
                    } else {
                        this.$message.error(res.msg)
                    }
                }
            )
        },
        //添加按钮
        add() {
            this.dialogVisible = true;
            this.number_disable = false;
            this.form = {};
            this.$nextTick(() => {
                if (this.$refs["upload"]) {
                    this.$refs["upload"].clearFiles();
                }
                this.$refs['form'].clearValidate() // 只清除清除验证
            });
        },
        //保存&更新
        save() {
            if (this.form.id) {
                updateUser(this.form).then(
                    res => {
                        console.log(res);
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                        } else {
                            this.$message.error(res.msg)
                        }
                        //刷新数据，并关闭弹窗
                        this.load();
                        this.dialogVisible = false;
                    }
                )
            } else {
                addUser(this.form).then(
                    res => {
                        console.log(res);
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                        } else {
                            this.$message.error(res.msg)
                        }
                        this.load();
                        this.dialogVisible = false;
                    }
                )
            }
        },
        handleDelete(id) {
            console.log(id);
            deleteUser( id).then(
                res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.load();
                }
            )
        },
        //编辑
        handleEdit(row) {
            //深拷贝，避免浅拷贝问题
            this.form = JSON.parse(JSON.stringify(row));
            this.dialogVisible = true;
            this.number_disable = true
            //这是一个处理未来元素的方法
            //处理可能因为点击按钮和弹窗是异步加载导致读取不到元素的情况
            this.$nextTick(() => {
                if (this.$refs["upload"]) {
                    this.$refs["upload"].clearFiles();
                }
                this.$refs['form'].clearValidate() // 只清除清除验证
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            this.currentPage = pageNum;
            this.load();
        },
    }
}
</script>
