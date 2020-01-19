<template>
  <!-- :data传入数据 -->
  <el-table :data="items" style="width: 100%">
    <!-- element中prop代表heroes._id   -->
    <el-table-column prop="_id" label="id" width="300"></el-table-column>
    <el-table-column prop="name" label="英雄"></el-table-column>
    <el-table-column prop="title" label="title"></el-table-column>
    <el-table-column prop="avatar" label="头像">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" alt="图片" style="height:5rem">
      </template>
    </el-table-column>
    <!-- fixed列是否固定在左侧或者右侧，true 表示固定在左侧 -->
    <el-table-column label="操作" fixed="right" width="180">
      <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
     * 获取英雄列表
     */
    async fetch() {
      const res = await this.$http.get("/crud/heroes");
      this.items = res.data;
    },
    /**
     * 删除一条英雄列表
     */
    async remove(row) {
      //这是element-ul里的 ,row代表这一行
      this.$confirm(`是否确定要删除英雄"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/crud/heroes/${row._id}`); //eslint-disable-line no-unused-vars
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
    //创建时获取英雄数据
    this.fetch();
  }
};
</script>
<style >
</style>