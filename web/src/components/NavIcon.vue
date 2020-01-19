<template>
  <div class="nav-icons bg-white mt-3 text-center">
    <div class="d-flex flex-wrap">
      <div class="nav-item">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-story"></i>
        <div>故事站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-shop"></i>
        <div>周边商城</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-experience"></i>
        <div>体验服</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-story"></i>
        <div>故事站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-shop"></i>
        <div>周边商城</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-experience"></i>
        <div>体验服</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-story"></i>
        <div>故事站</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-shop"></i>
        <div>周边商城</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-experience"></i>
        <div>体验服</div>
      </div>
      <div class="nav-item">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
    </div>
    <div class="bg-light py-2 fs-sm d-flex jc-center ai-c">
        <i class="sprite sprite-arrow"></i>
        收起
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
@import "~assets/scss/variables";

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    margin-top: 1rem;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>