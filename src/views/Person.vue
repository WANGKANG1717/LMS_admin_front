<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span style="color: dodgerblue">个人信息</span>
            </div>
        </template>
        <div style="margin: 0px; width: 500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="头像">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="form.avatar"
                            :preview-src-list="[form.avatar]">
                    </el-image>
                    <el-upload ref="upload" :action="avatarUploadUrl" :on-success="avatarUploadSuccess">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="工号" prop="number">
                    <el-input :disabled="true" v-model="form.number" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" style="width: 80%"></el-input>
                </el-form-item>
                 <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="form.nickName" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="form.sex" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phonenumber">
                    <el-input v-model="form.phonenumber" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <span v-if="form.role==='1'">超级管理员</span>
                    <span v-if="form.role==='2'">普通管理员</span>
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
import {updateUser} from "@/api/admin";

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
                    {pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入检查邮箱格式', trigger: 'blur'}
                ],
            },
            form: {},
            avatarUploadUrl: window.server.Url + "/files/upload",
        }
    },
    created() {
        //深拷贝，避免浅拷贝问题
        // console.log(sessionStorage.getItem("admin"))
        this.form = this.$store.getters.admin
        console.log(this.form)
    },
    methods: {
        avatarUploadSuccess(res) {
            console.log("avatarUploadSuccess" + res);
            this.form.avatar = res.data;
        },
        update() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    updateUser(this.form).then(
                        res => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message.success(res.msg)
                                //刷新数据，并关闭弹窗
                                this.$store.dispatch("getAdminInfo")
                                this.form = res.data
                                // sessionStorage.setItem("admin", JSON.stringify(res.data))  // 缓存用户信息
                                // this.form = JSON.parse(sessionStorage.getItem("admin"));
                            } else {
                                this.$message.error(res.msg)
                            }
                            // this.$router.back()
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