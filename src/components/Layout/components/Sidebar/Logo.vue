<template>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/main/index.vpage">
                <img v-if="logo" src="@/assets/sidebar/logo2.png" class="sidebar-logo" style="margin-top:-3px;">
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/main/index.vpage">
                <img v-if="logo" src="@/assets/sidebar/logo@2x.png" class="sidebar-logo" style="margin-top:-3px;">
            </router-link>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            title: 'MOZI',
            logo: '/assets/images/logo.png'
        };
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 200px;
    float: left;
    height: 80px;
    text-align: center;
    overflow: hidden;
    z-index: 1;
    background: @color_main;
    transition: width .28s;
    & .sidebar-logo-link {
        height:64px;
        width: 100%;
        line-height: 64px;
        & .sidebar-logo {
            height: 64px;
            width:100%;
        }

    }

    &.collapse {
        width: auto;
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>
