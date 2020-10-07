<template>
<img
    :alt="node.title"
    :src="thumbnail"
    class="w-100"
>
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
  },
  methods: {
    async getThumbnail() {
      if (this.node.thumbnail) {
        this.thumbnail = this.node.thumbnail;
        return;
      }
      const thumbnail = await getThumbnail(this.node);
      this.thumbnail = thumbnail;
    },
  },
  created() {
    this.getThumbnail();
  },
};
</script>
