<template>
    <div>
        <el-menu
                :default-active="this.$route.path"
                router
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
        >
            <el-menu-item @click="toggleCollapse">
                <i :class="isCollapse? 'el-icon-arrow-right':'el-icon-arrow-left'"></i>
            </el-menu-item>
            <el-menu-item index="/index">
                <i class="el-icon-house"></i>
                <template #title>主页</template>
            </el-menu-item>
            <el-menu-item index="/book">
                <i class="el-icon-notebook-1"></i>
                <template #title>书籍管理</template>
            </el-menu-item>
            <el-menu-item index="/category">
                <i class="el-icon-menu"></i>
                <template #title>书籍分类</template>
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="el-icon-s-order"></i>
                <template #title>订单管理</template>
            </el-menu-item>
            <el-menu-item index="/user">
                <i class="el-icon-user"></i>
                <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="/message">
                <i class="el-icon-message"></i>
                <template #title>用户留言</template>
            </el-menu-item>
<!--            <el-menu-item index="/admin" v-if="this.$store.admin.type===1">-->
            <el-menu-item index="/admin">
                <i class="el-icon-user-solid"></i>
                <template #title>管理员管理</template>
            </el-menu-item>
            <el-menu-item index="/about">
                <i class="el-icon-coffee"></i>
                <template #title>关于</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Aside",
    setup() {
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        };
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        };
        return {
            handleOpen,
            handleClose,
        }
    },
    data() {
        return {
            Arrow: 'el-icon-arrow-left',
            // 由于使用了vuex来存储信息，这里的局部变量就没有留着的必要了
            // admin: {},
            isCollapse: false,
        }
    },
    created() {
        // let adminJson = sessionStorage.getItem("admin");
        // if (!adminJson) {
        //   this.$router.push("/login");
        //   return;
        // }
        // this.admin = JSON.parse(adminJson);
    },
    methods: {
        //点击按钮折叠菜单
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;	//点击折叠按钮后，对isCollapse进行取反
        }
    },
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 170px;
}

.el-menu-vertical-demo {
    min-height: calc(100vh - 70px);
}
</style>