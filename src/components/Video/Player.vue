<template>
    <div class="player">
        <video
          controls
          muted
          autoPlay
          crossOrigin="anonymous">
            <source
              :src="videoUrl"
              type="video/mp4">
            <track
              label="English"
              kind="captions"
              srcLang="en"
              :src="`${videoUrl}/caption`"
              default>
        </video>
    </div>
</template>
<script>
export default {
    props: {
        videoUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {}
    },
}
</script>
<style scoped>
.player {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
}
</style>
