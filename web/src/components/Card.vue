<template>
  <div class="card bg-white p-3 mt-3">
    <div
      class="card-header pb-3 d-flex ai center"
      :class="[{'border-bottom': !plain, 'pb-3': !plain}]"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{strong:plain}">{{title}}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    icon: { type: String },
    plain: { type: Boolean }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss'>
@import "assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
  .strong{
    font-weight: 700;
  }
}
</style>