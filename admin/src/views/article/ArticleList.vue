<template>
  <!-- :data传入数据 -->
  <el-table :data="items" style="width: 100%">
    <!-- element中prop代表items._id   -->
    <el-table-column prop="_id" label="id" width="300"></el-table-column>
    <!-- 怎么能遍历所有分类显示? -->
    <!-- <el-table-column  prop="categories[0].name" label="分类"></el-table-column> -->
    <el-table-column prop="title" label="标题"></el-table-column>
    <!-- fixed列是否固定在左侧或者右侧，true 表示固定在左侧 -->
    <el-table-column label="操作" fixed="right" width="180">
      <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push(`/articles/edit/${scope.row._id}`)"
          type="primary"
        >编辑</el-button>
        <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    /**
     * 获取文章列表
     */
    async fetch() {
      const res = await this.$http.get("crud/articles");
      this.items = res.data;
    },
    /**
     * 删除一条文章列表
     */
    async remove(row) {
      //这是element-ul里的 ,row代表这一行
      this.$confirm(`是否确定要删除文章"${row.title}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/crud/articles/${row._id}`); //eslint-disable-line no-unused-vars
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {}); //catch(()=>{})虽然没有值,但是也要写否则会报错
    }
  },
  created() {
    //创建时获取文章数据
    this.fetch();
  }
};
</script>
<style >
</style>