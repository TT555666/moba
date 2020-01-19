<template>
  <div>
    <tt-card :icon="icon" :title="title">
      <!-- 头部导航 -->
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{active:currentIndex === index}"
          v-for="(category,index) in categories"
          :key="index"
          @click="$refs.list.swiper.slideTo(index)"
        >
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <!-- 滚动区域 -->
      <div class="pt-3">
        <swiper :options="{autoHeight: true}" ref="list" @slide-change='()=>currentIndex=$refs.list.swiper.realIndex'>
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </tt-card>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    title: { type: String },
    categories: { type: Array }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {}
};
</script>
<style >
</style>