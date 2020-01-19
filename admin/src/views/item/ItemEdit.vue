<template>
  <div class="category-edit">
    <!-- 判断是有id,有id就是修改物品界面 -->
    <h1>{{id?'修改物品':'新建物品'}}</h1>

    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- 嵌套在 el-form-item 中的 el-form-item 标签宽度默认为零，不会继承 el-form 的 label-width .如果需要可以为其单独设置 label-width 属性。-->
      <el-form-item :label="this.id?'修改物品':'添加物品'">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item :label="this.id?'修改图标':'添加图标'">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl_mixin"
          :show-file-list="false"
          :on-success="afterUpload"
          :headers='getAuthHeaders_mixin()'
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
      model: {}
    };
  },
  methods: {
    /**
     * 上传成功
     */
    async afterUpload(res){

      console.log(res)
      this.$set(this.model,'icon',res.url)
    },
    /**
     * 保存数据
     */
    async save() {
      //通过id判断是编辑还是新建
      if (this.id) {
        const res = await this.$http.put(`crud/items/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("crud/items", this.model);
      }
      //请求数据
      //跳转物品列表
      this.$router.push("/items/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条物品数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/items/${this.id}`);
      this.model = res.data;
    },
    /**
     * 获取上级物品
     */
    async fetchParent() {
      const res = await this.$http.get("crud/items");
      this.parents = res.data;
    }
  },
  created() {
    //当存在id的时候重新获取数据
    this.id && this.fetch();
  }
};
</script>
<style >

</style>