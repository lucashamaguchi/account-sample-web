<template>
    <div>
        <el-form
            ref="formModel"
            :model="formModel"
            label-width="80px">
            <el-form-item label="Email">
                <el-input
                    v-model="formModel.email"
                    size="mini" />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="mini"
                    @click="onSubmit">
                    Confirmar
                </el-button>
                <el-button
                    size="mini"
                    @click="$emit('close')">
                    Cancelar
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import * as types from "@/store/types";
export default {
    data() {
        return {
            loading: false,
            formModel: {}
        }
    },
    methods: {
        async onSubmit() {
            const payload = {
                ...this.formModel
            };
            this.loading = true;
            try {
                await this.$store.dispatch(types.AUTH_REQUEST_FORGOT_PASSWORD, payload)
                this.$emit("close")
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: "Usuario nao encontrado ou nao confirmado"
                });
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-button {
    float: right;
    margin: 5px;
}
</style>