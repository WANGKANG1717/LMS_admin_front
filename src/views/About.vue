<template>
  <div>
    <v-md-preview :text="text"></v-md-preview>
<!--    <div align="center">-->
<!--      <el-button type="text" @click="dialogVisible = true" size="medium">源码下载</el-button>-->
<!--    </div>-->
  </div>
<!--  <el-dialog v-model="dialogVisible" title="Warning" width="30%">-->
<!--    <span>GitHub给我点星了吗？</span>-->
<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false" style="background: dodgerblue">-->
<!--          <a :href="'https://github.com/WANGKANG1717/SoftwareEngineering-BookManagementSystem'"-->
<!--             target="_blank"-->
<!--             style="text-decoration: none; color:white"-->
<!--        >没有(这就去)</a></el-button>-->
<!--        <el-button @click="dialogVisible = false" style="background: dodgerblue">-->
<!--          <a :href="'https://github.com/WANGKANG1717/SoftwareEngineering-BookManagementSystem'"-->
<!--             target="_blank"-->
<!--             style="text-decoration: none; color:white"-->
<!--          >点了(好孩子)</a></el-button>-->
<!--      </span>-->
<!--    </template>-->
<!--  </el-dialog>-->
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      dialogVisible:false,
      text: "# **图书馆管理系统**\n" +
          "\n" +
          "\n" +
          "\n" +
          "## 小组成员及分工\n" +
          "\n" +
          "**[王庆康](http://121.41.110.43)**：项目整体结构设计，管理端前端代码实现，后端代码整合，以及项目部署\n" +
          "\n" +
          "**张宇舜**：用户端前端代码实现\n" +
          "\n" +
          "**朱晟良**：项目资料整理、ppt制作\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "## 项目介绍\n" +
          "\n" +
          "简单的图书馆管理系统。。。\n" +
          "\n" +
          "\n" +
          "\n" +
          "此项目基于spring-boot+vue，前端使用的技术包括Vue3、vue router、element-plus、axios、v-md-editor，后端使用的技术包括SpringBoot、Mybatis-plus、hutool、jwt、lombok、poi、jdbc。\n" +
          "\n" +
          "包含三大模块：书籍管理、预约历史管理、用户管理，并且添加了主页的echarts图书分类图表，以及about模块。\n" +
          "\n" +
          "此项目进行了较为严格的权限验证，超级管理员和普通管理员登陆界面有所不同，并且，为了防止通过更改存储在浏览器sessionStorage的内容，来绕过系统的权限验证，此项目使用了token验证，在每次加载页面前都会通过token进行权限验证，确保了权限的有效控制。并且，当token被人破坏，或过期时，系统会强制下线，确保系统的安全性。\n" +
          "\n" +
          "对数据的主要操作不仅包含了常见的增删改查，文件的上传下载，还包括数据的导入、导出，以及数据的可视化统计。\n" +
          "\n" +
          "\n" +
          "\n" +
          "## 项目存在的问题\n" +
          "\n" +
          "- 不少，就不一一列举了，因为没有真正花时间去搞。。。。\n"
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
