<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path;
        }
    }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
    height: calc(100vh - 56px);
    width: 100%;
    position: relative;
    overflow: auto;
    background:rgba(247,246,251,1);
    padding: 24px;
    box-sizing: border-box;
}
.fixed-header+.app-main {
    padding-top: 50px;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
