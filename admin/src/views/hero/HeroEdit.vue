<template>
  <div class="category-edit">
    <!-- 判断是有id,有id就是修改英雄界面 -->
    <h1>{{id?'修改英雄':'新建英雄'}}</h1>

    <!-- native是原生表单,vue组件转化为一个普通的HTML标签，prevent是阻止默认行为 -->
    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- 嵌套在 el-form-item 中的 el-form-item 标签宽度默认为零，不会继承 el-form 的 label-width .如果需要可以为其单独设置 label-width 属性。-->
      <el-tabs value="basic" type="border-card">
        <el-tab-pane name="basic" label="基础信息">
          <el-form-item :label="this.id?'修改英雄':'添加英雄'">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item :label="this.id?'修改头像':'添加头像'">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl_mixin"
              :headers="getAuthHeaders_mixin()"
              :show-file-list="false"
              :on-success="res=>$set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :label="this.id?'修改称号':'添加称号'">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item :label="this.id?'修改背景':'添加背景'">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl_mixin"
              :headers="getAuthHeaders_mixin()"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :label="this.id?'修改难度':'添加难度'">
            <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item :label="this.id?'修改技能':'添加技能'">
            <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item :label="this.id?'修改攻击':'添加攻击'">
            <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item :label="this.id?'修改生存':'添加生存'">
            <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item :label="this.id?'修改类型':'添加类型'">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 顺风出装 -->
          <el-form-item :label="this.id?'修改顺风出装':'添加顺风出装'">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装 -->
          <el-form-item :label="this.id?'修改逆风出装':'添加逆风出装'">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">{{id?'修改':'新建'}}</el-button>
          </el-form-item>
        </el-tab-pane>

        <!-- 技能 -->
        <el-tab-pane name="skills" label="技能">
          <el-button @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i" style="margin-bottom:2rem">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl_mixin"
                  :headers="getAuthHeaders_mixin()"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="model.skills.splice(i,1)" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" native-type="submit">{{id?'修改':'新建'}}</el-button>
          </el-form-item>
        </el-tab-pane>

        <!-- 搭档 -->
        <el-tab-pane name="partners" label="搭档">
          <el-button @click="model.partners.push({})">
            <i class="el-icon-plus"></i>添加搭档
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i" style="margin-bottom:2rem">
              <el-form-item label="名称">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="model.partners.splice(i,1)" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" native-type="submit">{{id?'修改':'新建'}}</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
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
      model: {
        name: "",
        avatar: "",
        scores: {},
        skills: [],
        partners: []
      },
      heroes: [],
      categories: {},
      items: {}
    };
  },
  methods: {
    /**
     * 保存数据
     */
    async save() {
      //通过id判断是编辑还是新建
      if (this.id) {
        const res = await this.$http.put(`crud/heroes/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("crud/heroes", this.model);
      }
      //请求数据
      //跳转英雄列表
      this.$router.push("/heroes/list");
      //消息提示
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    /**
     * 获取编辑的单条英雄数据
     */
    async fetch() {
      const res = await this.$http.get(`crud/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    /**
     * 获取上级目录
     */
    async fetchCategories() {
      const res = await this.$http.get(`crud/categories`);
      this.categories = res.data;
    },
    /**
     * 获取物品
     */
    async fetchItems() {
      const res = await this.$http.get(`crud/items`);
      this.items = res.data;
    },
    /**
     * 获取英雄
     */
    async fetchHeroes() {
      const res = await this.$http.get(`crud/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    //当存在id的时候重新获取数据
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
    this.fetchHeroes()
  }
};
</script>
<style >
</style>