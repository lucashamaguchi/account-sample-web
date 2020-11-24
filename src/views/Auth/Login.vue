<template>
    <section class="login">
        <header class="login-header">
            <h1 class="brand">
                <router-link
                    to="/"
                    tabindex="-1">
                    <img src="favicon.ico">
                </router-link>
            </h1>
            <el-alert
                v-if="error"
                :title="error.title"
                type="warning"
                :description="error.message"
                show-icon
            />
        </header>
        <el-form
            ref="loginForm"
            v-loading="loading"
            class="login-form"
            auto-complete="off"
            :model="model"
            :rules="rules"
            label-position="top"
            @submit.native.prevent
        >
            <h2 class="heading">
                Login
            </h2>
            <el-form-item
                prop="email">
                <el-input
                    v-model="model.email"
                    type="text"
                    size="small"
                    placeholder="Email"
                />
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="model.password"
                    type="password"
                    size="small"
                    placeholder="Senha"
                />
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-button
                        type="primary"
                        :loading="loading"
                        round
                        size="small"
                        @click="submit()">
                        {{ loading ? "Loading..." : "Login" }}
                    </el-button>
                </el-col>
                <p class="text">
                    Não tem conta? Faça o cadastro <a href="/signup">aqui</a>
                </p>
                <el-col :span="10" />
            </el-row>

            <el-row :gutter="20">
                <div>
                    <el-button
                        type="secondary"
                        :loading="loading"
                        size="small"
                        @click="loginGoogle">
                        {{ loading ? "Loading..." : "Google Login" }}
                    </el-button>
                </div>
                <div>
                    <el-button
                        type="secondary"
                        :loading="loading"
                        size="small"
                        @click="loginFacebook">
                        {{ loading ? "Loading..." : "Facebook Login" }}
                    </el-button>
                </div>
                <div>
                    <el-button
                        type="secondary"
                        :loading="loading"
                        size="small"
                        @click="showEsqueciSenhaDialog = true">
                        Esqueci a senha
                    </el-button>
                </div>
            </el-row>
        </el-form>
        <el-dialog
            title="Esqueci a senha"
            :visible.sync="showEsqueciSenhaDialog"
            width="30%">
            <forgot-password
                @close="showEsqueciSenhaDialog = false" />
        </el-dialog>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "@/store/types";
import ForgotPassword from "@/components/Auth/ForgotPassword";
export default {
    name: "Login",
    title: "Login Sample",
    components: {
        ForgotPassword
    },
    data() {
        const model = {
            email: "hamaguchi.lucas@gmail.com",
            password: "jackpot123"
        };
        // form validate rules
        const rules = {
            email: [
                { required: true, message: "Email deve ser informado" }
            ],
            password: [{ required: true, message: "Senha deve ser informada" }]
        };
        return { model: model, rules: rules, error: null, loading: false, showEsqueciSenhaDialog: false };
    },
    computed: {
        ...mapGetters({
            user: types.AUTH_USER,
            token: types.AUTH_TOKEN
        })
    },
    mounted() {
        // check if already logged and then send to home page
    },
    methods: {
        async submit() {
            const payload = { ...this.model };
            this.loading = true;
            try {
                await this.$store.dispatch(types.AUTH_LOGIN, payload)
                await this.$router.push("/app");
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: 'Email ou senha estão errados.'
                });
            } finally {
                this.loading = false;
            }
        },
        async loginGoogle() {
            const url = await this.$store.dispatch(types.AUTH_GOOGLE_LOGIN);
            window.open(url, "_self");
        },
        async loginFacebook() {
            const url = await this.$store.dispatch(types.AUTH_FACEBOOK_LOGIN);
            window.open(url, "_self");
        },
        async goToSignUp() {
            this.$router.push("/signup");
        }
    }
};
</script>

<style lang="scss">
@import "../../styles/element-variables";

.login {
    flex: 1;
    width: 95%;
    max-width: 25rem;
    margin: 0 auto;
    font-size: 0.875rem;
    &-header {
        margin-bottom: 1rem;
        .brand {
            margin: 4.5rem 0 0.5rem;
            text-align: center;
            letter-spacing: 0.125rem;
            a {
                margin: 0;
                color: $--color-primary;
                font: 300 3rem sans-serif;
                &:hover {
                    color: $--color-secondary;
                    text-shadow: 0 0 1rem $--color-secondary;
                }
            }
        }
    }
    &-form {
        margin-bottom: 2.5rem;
        padding: 1.875rem 1.25rem;
        background: $--color-white;
        color: $--color-white;
        .heading {
            margin: 0 0 1rem;
            font-weight: 400;
            font-size: 1.5rem;
            text-align: center;
        }
        .el-button {
            margin-top: 0.5rem;
            width: 100%;
        }
        .text {
            color: black;
            font-size: 13px;
        }
    }
    &-footer {
        margin-bottom: 1rem;
        padding: 0.625rem;
        border: 0.0625rem solid $--color-primary;
        font-size: 0.75rem;
        text-align: center;
        a {
            color: $--color-primary;
        }
    }
}
</style>
