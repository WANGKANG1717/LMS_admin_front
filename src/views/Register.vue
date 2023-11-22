<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
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
            <el-form-item><el-button type="text" @click="$router.push('/login')">前往登录 >> </el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <video :style="fixStyle" autoplay loop muted class="fillWidth">
        <source src="../assets/sea.mp4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Register",
  data() {
    return {
      fixStyle: '',
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
    if(this._isMobile()) {
      console.log("mobile");
      this.$router.push('/m_register');
      return ;
    }
  },
  mounted() {
    sessionStorage.removeItem("admin");
    this.getSize();
    window.onresize = () => {
      this.getSize();
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    getSize() {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
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
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img{
  z-index: -9;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  /*background: rgba(0, 0, 0, 0.4);*/
  width: 100%;
}

.fillWidth {
  z-index: -10;
  width: 100%;
  position: absolute;
}
</style>