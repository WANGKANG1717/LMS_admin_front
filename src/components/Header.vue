<template>
    <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
        <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">图书馆管理系统</div>
        <div style="flex: 1"></div>
        <div style="width: 100px">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-avatar :size="30" :src="admin.headpic" style="position: relative; top: 10px"
                             align="center"></el-avatar>
                  {{ admin.name }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import {logout} from "@/api/admin";

export default {
    name: "Header",
    data() {
        return {
            admin: {},
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        handleCommand(command) {
            if (command == 'logout') {
                this.logout()
            }
            else if (command == 'info') {
                console.log('info')
                this.$router.push("/person")
            }
        },
        logout() {
            logout().then(
                res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                    sessionStorage.clear()
                    this.$router.push("/login")
                }
            )
        },
        load() {
            this.admin = this.$store.getters.admin
            // this.admin = this.$store.state.admin
            // if (!this.admin) {
            //     this.$router.push("/login");
            //     return;
            // }
            // console.log(this.admin)
        },
    },
}
</script>

<style scoped>

</style>
