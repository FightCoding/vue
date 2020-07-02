<template>
    <div class="login-page" @keydown.enter="onLogin">
        <div class="left">
            <img class="left-image" src="@/assets/images/auth/login.jpg" alt="bg">
        </div>
        <div class="right">
            <img class="logo" src="@/assets/images/auth/logo_text.png">
            <el-form class="form" ref="form" :rules="rules" :model="formData" auto-complete="on">
                <el-form-item prop="mobile">
                    <el-input v-model="formData.mobile" placeholder="请输入手机号"
                              prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                              type="password"></el-input>
                </el-form-item>
                <div class="alt-wrap">
                    <el-checkbox v-model="formData.autoLogin">是否记住用户名密码？</el-checkbox>
                </div>
                <el-button :loading="submitting" class="confirm-bt" type="primary" @click="onLogin">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import {phoneExp} from '../../utils/regExp';
export default {
    name: 'Login',
    data() {
        return {
            formData: {
                mobile: '',
                password: '',
                autoLogin: false,
            },
            submitting: false,
        };
    },
    computed: {
        rules() {
            return {
                mobile: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    /*{
                        validator(rule, value, callback) {
                            if (value) {
                                value = value.trim();
                            }
                            if (phoneExp.test(value)) {
                                callback();
                                return;
                            }
                            callback(new Error('手机号格式错误'));
                        },
                        trigger: 'blur',
                    },*/
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {
                        validator(rule, value, callback) {
                            if (value) {
                                value = value.trim();
                            }
                            if (!value) {
                                callback(new Error('密码不可为空'));
                                return;
                            }
                            callback();
                        },
                        trigger: 'blur',
                    },
                ],
            };
        },
    },
    methods: {
        // 用户点击 登录
        async onLogin() {
            try {
                await this.$refs.form.validate();
            } catch (e) {
                return e;
            }

            this.submitting = true;
            try {
                await this.$store.dispatch('user/login', this.formData);
            } catch (e) {
                this.$message.error(e.message);
            }
            this.submitting = false;
        },
    },
};
</script>
<style lang="less" scoped>
    @import '~@/styles/variables.less';

    .login-page {
        height: 100vh;
        width: 100%;
        background: white;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: stretch;

        > .left {
            width: 62%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(325deg, rgba(255, 96, 0, 1) 0%, rgba(255, 125, 47, 1) 100%);

            .title {
                font-size: 46px;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                line-height: 65px;
            }

            .left-image {
                margin-top: 56px;
                width: 46.6%;
            }
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .logo {
                height: 56px;
            }

            .form {
                margin-top: 48px;
                width: 320px;
                height: 200px;

                .alt-wrap {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 500;
                    color: #333333;

                    .forget-pass {
                        &:hover {
                            color: @color_main;
                        }
                    }
                }

                .confirm-bt {
                    margin-top: 10px;
                    width: 100%;
                }
            }
        }
    }
</style>
