<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 border-bottom">
      <div class="iconfont icon-Back text-blue"></div>
      <div class="flex-1 text-blue fs-sm">
        <strong>{{model.title}}</strong>
      </div>
      <div class="text-grey fs-xs">2019-06-19</div>
    </div>
    <div v-html="model.body" class="px-3 body"></div>
    <!-- 相关资讯 -->
    <div class="mb-5">
      <div class="px-2 py-2">
        <div class="d-flex ai-center">
          <i class="iconfont icon-menu1 fs-xl"></i>
          <strong class="text-blue fs-lg ml-1">相关资讯</strong>
        </div>
      </div>
      <div class="d-flex ai-center" v-for="item in model.related" :key="item._id">
        <router-link
          class="pt-2 px-4 text-ellipsis flex-1"
          tag="div"
          :to="`/articles/${item._id}`"
        >{{item.title}}</router-link>
        <div class="text-grey-1 fs-sm px-1 d-flex ai-center">{{item.createdAt | date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
      console.log(res.data.related);
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    id:'fetch'
  },
};
</script>
<style lang='scss'>
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
  p {
    text-align: center;
    font-size: 1rem;
    font-family: 微软雅黑;
  }
}
</style>