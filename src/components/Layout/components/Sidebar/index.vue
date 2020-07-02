<template>
    <aside class="left-sidebar">
        <!--<div class="toggle-right-box">
            <hamburger :toggle-click="toggleSideBar" :is-active="!isCollapse" class="hamburger-container"/>
        </div>-->
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <template v-for="(route, index) in routes">
                <el-menu
                    v-if="$route.path.startsWith(route.path)"
                    :key="index"
                    mode="vertical"
                    :default-active="activeMenu"
                    :unique-opened="true"
                    :collapse-transition="false"
                >
                    <sidebar-item v-if="route" :item="route"/>
                </el-menu>
            </template>
        </el-scrollbar>
    </aside>
</template>

<script>
import { permissionRoutes } from "@/router";
import SidebarItem from "./SidebarItem";
export default {
    data() {
        return {
            routes: permissionRoutes,
        };
    },
    components: {
        SidebarItem,
    },
    computed: {
        activeMenu() {
            const route = this.$route;
            const { query, name, meta } = route;
            if (query.activeMenu) {
                return query.activeMenu;
            }
            if (meta && meta.activeMenu) {
                return meta.activeMenu;
            }
            return name;
        },
    },
    watch: {

    },
    created() {
    },
    methods: {
        defaultActive(currentRoute) {
            if (currentRoute && currentRoute.children) {

            }
        }
    }
};
</script>
<style lang="less">
.left-sidebar {
    padding-top: 53px;
}
.scrollbar-wrapper {
  margin: 0px;
}
.el-scrollbar__wrap {
  margin: 0;
}
.el-scrollbar__wrap .menu-wrapper .el-submenu .el-submenu__title {
  padding-left: 40px;
}

#app .sidebar-container .el-menu {
  border: none;
  height: 100%;
  width: 100%;
  padding: 0 0 0 0;
  background: #2f4050;
}
</style>
<style lang="less" scoped>
.left-sidebar{
    .toggle-right-box{
        width:12px;
        height:100%;
        position: absolute;
        top:0px;
        right:-12px;
        .hamburger-container{
            position: absolute;
            top:50%;
            margin-top:-24px;
        }
    }
}
</style>

