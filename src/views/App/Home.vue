<template>
  <h1>
      Fala aí usuario!
  </h1>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from "@/store/types"
export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            user: types.AUTH_USER
        })
    }
}
</script>

<style>

</style>