<template>
  <div>
    <!-- 头部 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-c">
      <img src="~assets/mobaImg/logo.png" alt="logo" height="30" />
      <!-- 左边 -->
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <!-- 右边 -->
      <button class="btn bg-primary ai-c">立即下载</button>
    </div>
    <!--nav  -->
    <div class="bg-primary py-2">
      <nav class="nav nav-inverse d-flex jc-around p-1">
        <div class="nav-item  active">
          <router-link class="nav-link" to="/home">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/">赛事中心</router-link>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
  
    };
  },
  methods: {

  }
};
</script>
<style lang='scss'>
.topbar{
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>