<template>
  <div class="bg">
    <div style="width:400px; margin:100px auto">
      <div style="font-size: 30px; text-align: center; padding: 30px 0; color: #333">欢迎注册</div>
      <el-form ref="form" :model="form" :rules="rules" size="normal">
        <el-form-item prop="name">
          <el-input v-model="form.name" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input v-model="form.passwd" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input v-model="form.confirm" prefix-icon="el-icon-lock" show-password placeholder="请重复输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="register">
          <el-button style="width:100%" type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="$router.push('/m_login')">前往登录 >></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "MRegister",
  data() {
    return {
      form: {},
      //表单校验
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
        ],
        passwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ],
        confirm: [
          {required: true, message: '请输入重复密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符, 需和首次输入密码一致', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (!this._isMobile()) {
      console.log("!mobile");
      this.$router.push('/register');
      return;
    }
  },
  mounted() {
    sessionStorage.removeItem("admin");
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    register() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.passwd != this.form.confirm) {
            this.$message({
              type: "error",
              message: "两次输入的密码不一致"
            })
            return;
          }
          request.post("/admin/register", this.form).then(
              res => {
                if (res.code === '0') {
                  this.$message({
                    type: "success",
                    message: "注册成功"
                  })
                  this.$router.push("/login") //注册成功后路由到登录界面
                } else {
                  this.$message({
                    type: "error",
                    message: res.msg
                  })
                }
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

<style scoped>
.bg {
  background: url("../assets/bg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>