<template>
  <div>
    <!-- 头部轮播 -->
    <home-swiper :adCats='adCats'></home-swiper>
    <!-- 小图标 -->
    <nav-icon></nav-icon>
    <!-- 新闻资讯 -->
    <tt-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          :to="`/articles/${news._id}`"
          tag="div"
          class="py-2 d-flex"
          v-for="(news,i) in category.newsList"
          :key="i"
        >
          <span>[{{news.categoryName}}]</span>
          <span class="mx-1">|</span>
          <span class="flex-1 text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm px-1">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </tt-list-card>
    <!-- 英雄列表 -->
    <tt-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem">
          <router-link
            :to="`heroes/${hero._id}`"
            tag="div"
            class="p-2"
            style="width:20%"
            v-for="(hero,i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" alt />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </tt-list-card>
  </div>
</template>

<script>
import NavIcon from "components/NavIcon.vue";
import HomeSwiper from "components/HomeSwiper.vue";
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      newsCats: [],
      heroCats: [],
      adCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("hero/list");
      this.heroCats = res.data;
    },
    async fetchAdCats() {
      const res = await this.$http("ad/list");
      this.adCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchAdCats();
  },
  components: {
    NavIcon,
    HomeSwiper
  }
};
</script>
<style lang='scss'>
</style>