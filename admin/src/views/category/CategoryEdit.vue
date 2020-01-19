<template>
  <div class="category-edit">
    <!-- 判断是有id,有id就是修改分类界面 -->
    <h1>{{id?'修改分类':'新建分类'}}</h1>

    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- 上级分类 -->
      <el-form-item label='上级分类'>
        <!-- 这里v-model注意要绑定到子分类的父分类上 -->
        <el-select v-model="model.parent" placeholder="请选择">
          <!-- value是选中的值,应该为id而不是name,label显示的名字-->
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- ************************************************************************************************* -->
      <!-- 嵌套在 el-form-item 中的 el-form-item 标签宽度默认为零，不会继承 el-form 的 label-width .如果需要可以为其单独设置 label-width 属性。-->
      <el-form-item :label="this.id?'修改分类':'添加分类'">
        <el-input v-model="model.name"></el-input>
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
        const res = await this.$http.put(`crud/categories/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("crud/categories", this.model);
      }
      //请求数据
      //跳转分类列表
      this.$router.push("/categories/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条分类数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/categories/${this.id}`);
      this.model = res.data;
    },
    /**
     * 获取上级分类
     */
    async fetchParent(){
      const res = await this.$http.get('crud/categories')
      this.parents = res.data
    }

  },
  created() {
    //当存在id的时候重新获取数据
    this.id && this.fetch();
    //获取上级分类
    this.fetchParent()
  }
};
</script>
<style >
</style>