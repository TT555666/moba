<template>
  <div class="category-edit">
    <!-- 判断是有id,有id就是修改文章界面 -->
    <h1>{{id?'修改文章':'新建文章'}}</h1>

    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- 上级文章 -->
      <el-form-item label="分类">
        <!-- 这里v-model注意要绑定到文章的分类上 -->
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <!-- value是选中的值,应该为id而不是name,label显示的名字-->
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- ************************************************************************************************* -->
      <!-- 嵌套在 el-form-item 中的 el-form-item 标签宽度默认为零，不会继承 el-form 的 label-width .如果需要可以为其单独设置 label-width 属性。-->
      <el-form-item :label="this.id?'修改标题':'添加标题'">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <vue-editor v-model="model.body"  useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'修改':'新建'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {},
  props: {
    id: ""
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    /**
     *   //自定义图片,默认是base64，对大图片不友好
     */
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // 提交数据有两种方法json和提交表单数据，文件上传使用表单
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    /**
     * 保存数据
     */
    async save() {
      //通过id判断是编辑还是新建
      if (this.id) {
        const res = await this.$http.put(
          `crud/articles/${this.id}`,
          this.model
        );
      } else {
        const res = await this.$http.post("crud/articles", this.model);
        console.log(res);
      }
      //请求数据
      //跳转文章列表
      this.$router.push("/articles/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条文章数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/articles/${this.id}`);
      this.model = res.data;
    },
    /**
     * 获取分类
     */
    async fetchCategories() {
      const res = await this.$http.get("crud/categories");
      this.categories = res.data;
    }
  },
  created() {
    //当存在id的时候重新获取数据
    this.id && this.fetch();
    //获取上级文章
    this.fetchCategories();
  },
  components: {
    VueEditor
  }
};
</script>
<style >
</style>