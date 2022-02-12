<template>
  <div>
    {{ list }}
    <video-container
      v-for="l in list"
      :key="l._id"
      :item="l" />
  </div>
</template>

<script>
import VideoContainer from "@/components/Video/VideoContainer";
export default {
    components: {
        VideoContainer
    },
    props: {
        list: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>
