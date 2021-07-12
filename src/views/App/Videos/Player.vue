<template>
  <div>
    fala ai player
    <video-player
      :video-url="videoUrl"
      :caption-url="captionUrl" />
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
            videoUrl: `${process.env.VUE_APP_VIDEOS_API_REST}/videos/soul/stream`,
            captionUrl: `${process.env.VUE_APP_VIDEOS_API_REST}/videos/soul/caption`
        }
    },
    // mounted(){
    //     this.videoId = this.$route.params.name
    // }
}
</script>

<style>

</style>
