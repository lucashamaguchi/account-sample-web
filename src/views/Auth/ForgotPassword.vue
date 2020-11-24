<template>
    <section class="forgotPassword">
        <header class="forgotPassword-header">
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
            ref="forgotPasswordForm"
            v-loading="loading"
            class="forgotPassword-form"
            auto-complete="off"
            :model="model"
            :rules="rules"
            label-position="top"
            @submit.native.prevent
        >
            <h2 class="heading">
                Definir Senha
            </h2>
            <el-form-item
                prop="password">
                <el-input
                    v-model="model.password"
                    type="password"
                    size="small"
                    placeholder="Informe a senha"
                />
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="model.newPassword"
                    type="password"
                    size="small"
                    placeholder="Confirme a senha"
                />
            </el-form-item>
            <el-button
                type="primary"
                :loading="loading"
                size="small"
                round
                @click="submit()">
                {{ loading ? "Loading..." : "Confirmar" }}
            </el-button>
        </el-form>
    </section>
</template>

<script>
import * as types from "@/store/types";
export default {
    name: "Login",
    title: "Login Sample",
    data() {
        const model = {};
        // form validate rules
        const rules = {
            password: [{ required: true, message: "Senha deve ser informada" }],
            newPassword: [{ required: true, message: "Senha deve ser confirmada" }]
        };
        return { model: model, rules: rules, error: null, loading: false };
    },
    mounted() {
        // check if already logged and then send to home page
    },
    methods: {
        async submit() {
            const payload = {
                ...this.model,
                email: this.$route.query.email,
                confirmToken: this.$route.query.token,
            };
            this.loading = true;
            try {
                await this.$store.dispatch(types.AUTH_FORGOT_PASSWORD, payload)
                await this.$router.push("/");
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: "Invalid token"
                });
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>

<style lang="scss">
@import "../../styles/element-variables";

.forgotPassword {
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
        color: $--color-black;
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
