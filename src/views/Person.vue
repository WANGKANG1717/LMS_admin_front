<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span style="color: dodgerblue">个人信息</span>
            </div>
        </template>
        <div style="margin: 0px; width: 500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="头像：">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="form.avatar"
                            :preview-src-list="[form.avatar]">
                    </el-image>
                    <el-upload ref="upload" :action="avatarUploadUrl" :on-success="avatarUploadSuccess">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="工号：" prop="number">
                    <el-input :disabled="true" v-model="form.number" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="用户名：" prop="userName">
                    <el-input v-model="form.userName" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                    <div style="width: 80%">
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="form.email" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="form.phone" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.password" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="角色：">
                    <span v-if="form.type==='1'">管理员</span>
                    <span v-if="form.role==='0'">用户</span>
                </el-form-item>
                <div style="text-align: center;">
                    <el-button type="primary" @click="update" style="margin-right: 120px">保存</el-button>
                    <el-button type="primary" @click="$router.back()">返回</el-button>
                </div>
            </el-form>
        </div>
    </el-card>
</template>

<script>
import request from "@/utils/request";
import {getAdminInfo, updateUser} from "@/api/admin";
import router from "@/router";

export default {
    name: "Person",
    data() {
        return {
            rules: {
                name: [
                    {required: true, message: '请输入管理员名', trigger: 'blur'},
                    {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
                ],
                password: [
                    {min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur'}
                ],
                email: [
                    {
                        pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: '请输入检查邮箱格式',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    },
                ],

            },
            form: {},
            avatarUploadUrl: window.server.Url + "/files/upload",
        }
    },
    mounted() {
        getAdminInfo().then(
            res => {
                if (res.code == 200) {
                    this.form = res.data
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
            },
            err => {
                this.$message.error(err.message)
                console.log(err.message);
            }
        )
        console.log(this.form)
    },
    methods: {
        avatarUploadSuccess(res) {
            console.log("avatarUploadSuccess" + res);
            this.form.avatar = res.data;
        },
        getAdminInfo() {
            //刷新数据，并关闭弹窗
            getAdminInfo().then(
                res => {
                    if (res.code == 200) {
                        this.form = res.data
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })
                    }
                },
                err => {
                    this.loading = false;
                    this.$message.error(err.message)
                    console.log(err.message);
                }
            )
        },
        update() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    updateUser(this.form).then(
                        res => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message.success(res.msg)
                                this.getAdminInfo()
                            } else {
                                this.$message.error(res.msg)
                            }
                            this.$router.push("/index")
                        },
                        err => {
                            this.loading = false;
                            this.$message.error(err.message)
                            console.log(err.message);
                        }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>