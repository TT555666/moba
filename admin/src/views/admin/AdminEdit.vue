<template>
  <div class="category-edit">
    <!-- 判断是有id,有id就是修改管理员界面 -->
    <h1>{{id?'修改管理员':'新建管理员'}}</h1>
    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- 嵌套在 el-form-item 中的 el-form-item 标签宽度默认为零，不会继承 el-form 的 label-width .如果需要可以为其单独设置 label-width 属性。-->
      <el-form-item :label="this.id?'修改管理员':'添加管理员'">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
       <el-form-item label='密码'>
        <el-input v-model="model.password" type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'修改':'新建'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    id: ""
  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    /**
     * 保存数据
     */
    async save() {
      //通过id判断是编辑还是新建
      if (this.id) {
        const res = await this.$http.put(`crud/admins/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("crud/admins", this.model);
      }
      //请求数据
      //跳转管理员列表
      this.$router.push("/admins/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条管理员数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/admins/${this.id}`);
      this.model = res.data;
    },

  },
  created() {
    //当存在id的时候重新获取数据
    this.id && this.fetch();
  }
};
</script>
<style >
</style>