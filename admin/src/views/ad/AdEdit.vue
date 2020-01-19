<template>
  <div class="img-upload-edit">
    <!-- 判断是有id,有id就是修改广告界面 -->
    <h1>{{id?'修改广告':'新建广告'}}</h1>

    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save" >
      <el-form-item label="名称" >
        <!--这里用model.name而不是name是因为这是element规定model为表单数据对象-->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="URL">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="广告" style="margin-top:0.5rem;">
              <!-- action是请求地址,on-success成功后做什么 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl_mixin"
                :headers='getAuthHeaders_mixin()'
                :show-file-list="false"
                :on-success="res => $set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <!--                native-type="submit"记得加这个和表单联系起来，这样点提交才有反应-->
        <el-button type="primary" native-type="submit">提交</el-button>
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
      model: { items: [] }
    };
  },
  methods: {
    /**
     * 上传广告
     */
    AfteruploadUrl(res) {
      this.$set(this.model, "image", res.url);
      this.model.image = res.url;
    },
    /**
     * 保存数据
     */
    async save() {
      //通过id判断是编辑还是新建
      if (this.id) {
        const res = await this.$http.put(
          `crud/ads/${this.id}`,
          this.model
        );
      } else {
        const res = await this.$http.post("crud/ads", this.model);
      }

      //跳转广告列表
      this.$router.push("/ads/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条广告数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/ads/${this.id}`);
      this.model = Object.assign(this.model, res.data);
    },
    /**
     * 获取上级广告
     */
    async fetchParent() {
      const res = await this.$http.get("crud/ads");
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