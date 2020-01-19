<template>
  <div class="login">
    <el-card header="登陆界面">
      <!--            native代表监听el-form的原生表单事件，prevent防止跳转-->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // localStorage代表浏览器的存储，下次关闭浏览器还存在
      // sessionStorage是关闭浏览器就不存在，按需要来写
      localStorage.token = res.data.token;
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登陆成功'
      })
    }
  }
};
</script>
<style >

</style>