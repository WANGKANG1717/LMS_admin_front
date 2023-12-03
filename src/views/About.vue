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
          "**[王庆康](http://121.41.110.43)**：项目整体结构设计，后端实现，管理端前台实现，用户端前台优化，接口对接，以及项目部署\n" +
          "\n" +
          "**张宇舜**：用户端前台实现，数据录入，图片获取及优化，文档编写，项目测试\n" +
          "\n" +
          "**朱晟良**：项目资料整理、ppt制作\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "## 项目介绍\n" +
          "\n" +
          "简单的图书馆管理系统\n" +
          "\n" +
          "\n" +
          "\n" +
          "此项目基于spring-boot+vue，前端使用的技术包括Vue3、vue router、element-plus、axios、v-md-editor，后端使用的技术包括SpringBoot、Mybatis-plus、jwt、lombok、jdb、spring-security、swagger等。\n" +
          "\n" +
          "包含三大模块：书籍管理、预约历史管理、用户管理，并且添加了主页的echarts图书分类图表，以及about模块。\n" +
          "\n" +
          "\n" +
          "\n" +
          "## 项目存在的问题\n" +
          "\n" +
          "- 预约机制存在不合理之处，有待优化。\n" +
          "- 前端安全性有待优化，更换用户时，可能存在显示旧缓存信息的bug。\n"+
          "- 接口内部的逻辑可以继续优化，安全性可以进一步优化。\n" +
          "- 权限管理机制有待优化\n"
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
