<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,i) in adCats.items" :key="i">
        <img class="w-100" :src="item.image" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    adCats: { required: true }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        //自动轮播
        autoplay: {
          delay: 3000
        }
      }
    };
  },
  methods: {}
};
</script>
<style lang='scss' >
@import "~assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
</style>