<template>
<div>
  <div class="rounded overflow-hidden mb-2 mt-4">
    <b-link
      v-on:click="isLeaf? goToContent(node) : false"
      :to="isLeaf? '' : getTopicUrl(node)"
      class="m-0 text-reset text-decoration-none"
    >
      <div class="content-image">
      <img
          :alt="node.title"
          :src="thumbnail"
          class="w-100"
      >
      </div>
    </b-link>
  </div>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getTopicUrl(node)"
    class="text-reset text-decoration-none"
  >
    <span>{{ title }}</span>
  </b-link>
</div>
</template>

<script>
import { getThumbnail, goToContent } from 'kolibri-api';
import defaultThumbnail from '@/components/default-thumb.svg';

export default {
  props: ['node'],
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    title() {
      if (this.node.kind === 'topic') {
        return `${this.node.title} - ${this.getLeavesCount(this.node)} items`;
      }
      return this.node.title;
    },
    isLeaf() {
      return this.node.kind !== 'topic';
    },
  },
  methods: {
    goToContent,
    getTopicUrl(node) {
      return `/${node.id}`;
    },
    getLeavesCount(node) {
      if (!node.children) {
        return 1;
      }
      return node.children
        .map(this.getLeavesCount)
        .reduce((a, b) => a + b, 0);
    },
    async getThumbnail() {
      if (!this.node.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
        this.thumbnail = defaultThumbnail;
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
        this.thumbnail = defaultThumbnail;
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
