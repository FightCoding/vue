<template>
    <div class="menu-wrapper">
        <template v-for="(route, i) in item.children" >
            <div :key="i" v-if="route.meta && !route.meta.hidden">
                <app-link :to="{name: route.name}" v-if="!route.children || !route.children.length">
                    <el-menu-item class="flat-submenu" :index="route.name">
                        <item v-if="route.meta" :icon="route.meta.icon" :title="route.meta.title"/>
                    </el-menu-item>
                </app-link>
                <el-submenu v-else :index="route.name" popper-append-to-body>
                    <template slot="title">
                        <item :icon="route.meta.icon" :title="route.meta.title"/>
                    </template>
                    <template v-for="(child, j) in route.children">
                        <app-link :to="{name: child.name}" :key="j" v-if="child.meta && !child.meta.hidden">
                            <el-menu-item :index="child.name">
                                <item :icon="child.meta.icon" :title="child.meta.title"/>
                            </el-menu-item>
                        </app-link>
                    </template>
                </el-submenu>
            </div>
        </template>
    </div>
</template>

<script>
    import Item from './Item';
    import AppLink from './Link';

    export default {
        name: 'SidebarItem',
        components: {
            Item,
            AppLink,
        },
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
        },
        data() {
            return {};
        },
        created() { },
        methods: {
            click(route) {
                this.$router.push({
                    name: route.name
                });
            },
        }
    };
</script>
<style lang="less" scoped>
@import '~@/styles/variables.less';
.menu-wrapper{
    .is-active{
        .svg-icon{
            color: @color_main !important;
        }
    }
    .is-opened{
        .el-menu{
            .el-menu-item{
                padding-left:51px !important;
            }
            .el-menu-item:hover{
                background: #F5F5FF;
            }
        }
    }
}
</style>
