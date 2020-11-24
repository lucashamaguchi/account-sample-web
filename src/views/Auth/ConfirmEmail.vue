<template>
    <section class="confirmEmail">
        <header class="confirmEmail-header">
            <h1 class="brand">
                <router-link
                    to="/"
                    tabindex="-1">
                    <img src="favicon.ico">
                </router-link>
            </h1>
        </header>
        <div class="confirmEmail-body">
            <h1 v-if="!error">
                Estamos validando, aguarde um momento
            </h1>
            <h1 v-else>
                Token invalido ou expirado
            </h1>
        </div>
    </section>
</template>


<script>
import * as types from "@/store/types";
export default {
    data() {
        return {
            loading: false,
            error: false
        }
    },
    async mounted() {
        console.log(this.$route)
        try {
            await this.$store.dispatch(types.AUTH_CONFIRM_EMAIL, {
                confirmToken: this.$route.query.token,
                email: this.$route.query.email,
            })
            this.$router.push("/")
        }
        catch (error) {
            this.$notify.error({
                title: "Error",
                message: "Token invalido"
            });
            this.error = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/element-variables";
.confirmEmail {
    width: 95%;
    max-width: 55rem;
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
    &-body {
        margin-bottom: 2.5rem;
        padding: 1.875rem 1.25rem;
        background: $--color-grey;
        color: $--color-white;
        border-radius: 1.5rem;
        & h1 {
            align-content: center;
            color: black;
            font-size: 50px;
        }
        .heading {
            margin: 0 0 1rem;
            font-weight: 400;
            font-size: 1.5rem;
            text-align: center;
        }
    }
}
</style>