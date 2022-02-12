<template>
  <div>
    fala ai video form
        <el-form
          ref="formModel"
          :model="formModel"
          label-width="80px"
          :rules="rules">
            <el-row>
                <el-col>
                    <el-form-item
                        label="Name"
                        prop="name">
                        <el-input
                            v-model="formModel.name"
                            size="mini" />
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item
                        label="Description"
                        prop="description">
                        <el-input
                            v-model="formModel.description"
                            size="mini" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <el-upload
                        ref="upload"
                        class="upload-document"
                        :data="getUploadData()"
                        :action="getUploadEndpoint()"
                        :auto-upload="false"
                        :drag="true"
                        :headers="getUploadHeaders()"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        accept=".mp4,"
                        :limit="1"
                        :multiple="false">
                        <div class="upload-document__upload-area">
                            <i class="el-icon-plus" />
                            <small>Arraste e solte o arquivo ou clique para selecionar</small>
                        </div>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button
                      type="primary"
                      size="mini"
                      round
                      @click="onSubmit">
                      Enviar
                    </el-button>
                </el-form-item>
            </el-row>
        </el-form>
  </div>
</template>

<script>
import * as types from "@/store/types";
import { v4 as uuid4 } from "uuid";
export default {
    props: {
        formModel: {
            required: false,
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            rules: {
                name: { required: true},
                description: { required: true }
            }
        }
    },
    methods: {
        handleSuccess(response) {
            console.log("success response", response)
            const payload = {
                ...this.formModel,
                videoFileKey: response.key
            }
            if (this.formModel._id || this.formModel.id) this.$emit("update", payload)
            else this.$emit("create", payload)
        },
        handleError(payload) {
            console.log("error payload", payload)
            this.$emit("error", payload)
        },
        getUploadData() {
            return {
                code: uuid4().toString(),
                path: "videos",
                tempFile: true
            }
        },
        getUploadEndpoint() {
            return `${process.env.VUE_APP_FILEUPLOAD_API_REST}/files`
        },
        getUploadHeaders() {
            const token = this.$store.getters[types.AUTH_TOKEN];
            return {
                Authorization: `${token}`
            }
        },
        onSubmit() {
            this.$refs.upload.submit();
        }
    }
}
</script>

<style>

</style>
