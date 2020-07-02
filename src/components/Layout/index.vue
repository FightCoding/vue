<template>
    <div class="app-layout">
        <navbar />
        <sidebar class="sidebar-container" />
        <main class="app-main" :style="mainStyle">
            <router-view :key="key"></router-view>
        </main>
    </div>
</template>

<script>
import { Navbar, Sidebar } from './components';
export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
    },
    computed: {
        mainStyle() {
            const styles = {};
            if (this.$route.meta.hideNavBar) {
                styles.marginTop = 0;
            }
            return styles;
        },
        key() {
            return this.$route.path;
        }
    },
    created() {
        console.log('aaaaa');
    },
};
</script>

<style lang='less' scoped>
@import '~@/styles/variables.less';
.app-layout {
    position: relative;
    height: 100%;
    width: 100%;
    .app-main {
    }
}
</style>
