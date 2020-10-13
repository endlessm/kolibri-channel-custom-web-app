<template>
<div class="content-image">
<img
    :alt="node.title"
    :src="thumbnail"
    class="w-100"
>
</div>
</template>

<script>
import { getThumbnail } from 'kolibri-api';

export default {
  props: ['node'],
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    defaultThumbnail() {
      return `${process.env.BASE_URL}/assets/${this.$store.state.defaultThumbnailAsset}`;
    },
  },
  methods: {
    async getThumbnail() {
      if (!this.node.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
        this.thumbnail = this.defaultThumbnail;
        return;
      }
      if (this.node.thumbnail) {
        this.thumbnail = this.node.thumbnail;
        return;
      }
      const thumbnail = await getThumbnail(this.node);
      if (thumbnail) {
        this.thumbnail = thumbnail;
      } else {
        this.thumbnail = this.defaultThumbnail;
      }
    },
  },
  created() {
    this.getThumbnail();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.content-image {
  background: $secondary !important;
}
</style>
