<template>
    <div class="navbar">
        <nav class="main-nav">
            <router-link v-for="(item, index) in routes"
                         v-show="(item.meta && !item.meta.hidden)"
                         :key="index"
                         :class="{ 'active': $route.path.startsWith(item.path) }"
                         :to="item.redirect || item.path"
                         class="nav-item">
                {{ item.meta ? item.meta.title: '' }}
            </router-link>
        </nav>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex';
import { permissionRoutes } from "../../../router";

export default {
    components: {
    },
    data() {
        return {
            routes: permissionRoutes,
            activeIndex: '1',
            isOpen: true,
        };
    },
    computed: {
        // ...mapGetters('permission', ['routes']),
    },
    watch: {
    },
    created() {
        console.log('permission', this.$route.path);
    },
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        },
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.navbar {
    height: 53px;
    line-height: 53px;
    overflow: hidden;
    position: relative;
    background: @color_main;
    z-index: 1001;
    .main-nav {
        height: 100%;
        .nav-item {
            padding: 0 16px;
            display: inline-block;
            font-size: @normal_size;
            color: #fff;
            &:hover {
                background: #008FBF;
            }
            &.active {
                background: #006F93;
            }
        }
    }
}
</style>
