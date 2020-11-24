<template>
  <div>
      Você será redirecionado em instantes
  </div>
</template>

<script>
import * as types from "@/store/types";
export default {
    created() {
        const token = this.$route.query.token;
        this.$store.commit(types.AUTH_TOKEN, token);
        this.$router.push("/app")
    }
}
</script>

<style>

</style>