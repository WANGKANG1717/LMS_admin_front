<template>
  <div>
    <Header/>
    <div style="display: flex">
      <Aside/>
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";

export default {
  name: "Layout",
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      admin: {}
    }
  },
  created() {
    this.refreshAdmin();
  },
  methods: {
    refreshAdmin() {
      let adminJson = sessionStorage.getItem("admin");
      if (!adminJson) {
          console.log(1)
        this.$router.push("/login");
          console.log(2)
      }
      // let adminId = JSON.parse(adminJson).id
      // request.get("/admin/" + adminId).then(res => {
      //   this.admin = res.data;
      //   sessionStorage.setItem("admin", JSON.stringify(res.data));
      // })
    }
  }
}
</script>

<style scoped>

</style>