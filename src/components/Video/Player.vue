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
              v-if="captionUrl"
              label="English"
              kind="captions"
              srcLang="en"
              :src="captionUrl"
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
        },
        captionUrl: {
            type: String,
            required: false,
            default: ""
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
