<template>
  <div>
    fala ai myvideos
    <el-button
        size="small"
        round
        @click="handleShowCreateDialog">
        New
    </el-button>
    <video-list :list="list" />
    <el-dialog
        title="Create Video"
        :visible.sync="showCreateDialog"
        width="30%">
        <video-form
            @create="handleCreate"
            @update="handleUpdate"
            @error="handlerError"
            @cancel="handleCloseDialog"
        />
    </el-dialog>
  </div>
</template>

<script>
import VideoList from "@/components/Video/VideoList";
import VideoForm from "@/components/Video/VideoForm";
import * as types from "@/store/types";
import { mapGetters } from "vuex";
export default {
    components: {
        VideoList,
        VideoForm
    },
    data() {
        return {
            loading: false,
            showCreateDialog: false,
        }
    },
    computed: {
        ...mapGetters({
            list: types.VIDEOS_LIST
        })
    },
    mounted () {
        // carregar os todos
        this.handleRefresh();
    },
    methods: {
        async handleCreate(payload) {
            this.loading = true;
            try {
                await this.$store.dispatch(types.VIDEOS_CREATE, payload);
                this.$notify.success({
                    title: "Success",
                    message: "Video Created"
                });
                this.handleRefresh();
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: error?.message
                });
            } finally {
                this.loading = false;
            }
        },
        async handleUpdate(payload) {
            this.loading = true;
            try {
                await this.$store.dispatch(types.VIDEOS_CREATE, payload);
                this.$notify.success({
                    title: "Success",
                    message: "Video Created"
                });
                this.handleRefresh();
            } catch (error) {
                this.$notify.error({
                    title: "Error",
                    message: error?.message
                });
            } finally {
                this.loading = false;
            }
        },
        async handlerError(payload) {
            console.log("error payload", payload)
            return;
        },
        async handleRefresh() {
            this.loading = true;
            await this.$store.dispatch(types.VIDEOS_LIST)
            this.loading = false;
        },
        async handleCloseDialog() {
            this.showCreateDialog = false;
        },
        async handleShowCreateDialog() {
            this.showCreateDialog = true;
        }
    }
}
</script>

<style>

</style>
