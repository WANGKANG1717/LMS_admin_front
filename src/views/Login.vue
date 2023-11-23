<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <div :style="fixStyle" class="filter">
                <div style="width: 400px; margin: 100px auto">
                    <div style="font-size: 30px; text-align: center; padding: 30px 0; color: #333">欢迎登录</div>
                    <el-form ref="form" :model="form" size="normal" :rules="rules">
                        <el-form-item prop="number">
                            <el-input prefix-icon="el-icon-user-solid" v-model="form.number"
                                      placeholder="请输入工号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div style="display: flex; background-color: #cccccc">
                                <el-input prefix-icon="el-icon-key" v-model="form.validCode" style="width: 50%;"
                                          placeholder="请输入验证码"></el-input>
                                <ValidCode @input="createValidCode"/>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
                        </el-form-item>
<!--                        <el-form-item>-->
<!--                            <el-button type="text" @click="$router.push('/register')">前往注册 >></el-button>-->
<!--                        </el-form-item>-->
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
import ValidCode from "@/components/ValidCode";
import {adminLogin, getAdminInfo} from "@/api/admin";
import {mapMutations} from "vuex";

export default {
    name: "Login",
    components: {
        ValidCode,
    },
    data() {
        return {
            fixStyle: '',
            form: {},
            rules: {
                number: [
                    {required: true, message: '请输入工号', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ],
            },
            validCode: '',
        }
    },
    created() {
        if (this._isMobile()) {
            console.log("mobile");
            this.$router.push('/m_login');
            return;
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
            const windowWidth = document.documentElement.clientWidth;
            const windowHeight = document.documentElement.clientHeight;
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
        // 接收验证码组件提交的 4位验证码
        createValidCode(data) {
            this.validCode = data;
            this.form.validCode = data
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
                    console.log(this.form)
                    adminLogin(this.form.number, this.form.password).then(
                        res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "登录成功"
                                })
                                this.$store.commit('setToken', res.data.token)
                                // sessionStorage.setItem("token", res.data.token)
                                // 获取当前登录的管理员的信息
                                this.$store.dispatch("getAdminInfo")
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
.homepage-hero-module,
.video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.video-container .poster img {
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