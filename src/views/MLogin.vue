<template>
  <div class="bg">
    <div style="width: 400px; margin: 100px auto">
      <div style="font-size: 30px; text-align: center; padding: 30px 0; color: #333">欢迎登录</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.passwd" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <el-input prefix-icon="el-icon-key" v-model="form.validCode" style="width: 50%;"
                      placeholder="请输入验证码"></el-input>
            <ValidCode @input="createValidCode"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="$router.push('/m_register')">前往注册 >></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import ValidCode from "@/components/ValidCode";

export default {
  name: "MLogin",
  components: {
    ValidCode,
  },
  data() {
    return {
      fixStyle: '',
      form: {},
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        passwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      validCode: '',
    }
  },
  created() {
    if (!this._isMobile()) {
      console.log("!mobile");
      this.$router.push('/login');
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
    // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
      this.validCode = data;
    },
    login() {
      this.$refs['form'].validate((valid) => {
        // console.log(this.form);
        if (valid) {
          if (!this.form.validCode) {
            this.$message.error("请填写验证码");
            return;
          }
          if (this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
            this.$message.error("验证码错误");
            return;
          }
          request.post("/admin/login", this.form).then(
              res => {
                if (res.code === '0') {
                  this.$message({
                    type: "success",
                    message: "登录成功"
                  })
                  sessionStorage.setItem("admin", JSON.stringify(res.data));  // 缓存用户信息
                  //缓存用户信息
                  this.$router.push("/index")  //登录成功之后进行页面跳转
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
          return;
        }
      });
    },
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