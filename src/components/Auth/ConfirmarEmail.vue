<template>
    <section class="cadastro">
        <header class="cadastro-header">
            <h1 class="brand">
                <router-link
                    to="/"
                    tabindex="-1">
                    <img src="favicon.ico">
                </router-link>
            </h1>
        </header>
        <div class="cadastro-body">
            <h1>
                Confirme seu e-mail
            </h1>
            <h3>
                Clique no link enviado por e-mail para confimar seu endereço de e-mail
            </h3>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/element-variables";
.cadastro {
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