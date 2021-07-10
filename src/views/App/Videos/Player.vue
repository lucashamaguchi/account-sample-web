<template>
  <div>
    fala ai player
    <video-player :video-url="videoUrl" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/Video/Player";
export default {
    components: {
        VideoPlayer
    },
    data() {
        return {
            videoUrl: `${process.env.VUE_APP_VIDEOS_API_REST}/videos/soul`
        }
    },
    // mounted(){
    //     this.videoId = this.$route.params.name
    // }
}
</script>

<style>

</style>
