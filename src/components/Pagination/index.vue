// 页面面包屑
// 使用如下参考
// <Bread :sources="breadSource" titleKey='title' targetBread='login' @clickBread="clickBread"></Bread>
// breadSource: [{title: '登录页面', name: 'login'}],
<template>
    <el-pagination
        small
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, total"
        :total="totalNumber">
    </el-pagination>
</template>

<script>
export default {
    name: '',
    props: {
        pageSize: {
            type: Number,
            default: 20,
        },
        totalNumber: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return{
            currentPage3: 0,
        };
    },
    methods: {
        handleCurrentChange(currentPage) {
            this.$emit('pageChange', currentPage);
        },
    },
};
</script>

<style lang="less" scoped>
.bread-com {
    height:22px;
    font-size:14px;
    line-height:22px;
    color:rgba(0,0,0,0.6);
    font-weight:400;
    .bread-item {
        &.path {
            cursor: pointer;
            font-weight:500;
            color:rgba(0,0,0,0.87);
            line-height:22px;
        }

        &:hover {
            cursor: pointer;
            font-weight:500;
            color:rgba(0,0,0,1);
        }
    }
}

</style>
