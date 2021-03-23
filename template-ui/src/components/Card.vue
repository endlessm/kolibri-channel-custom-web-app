<template>
<div class="card">
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
import { mapGetters } from 'vuex';

export default {
  props: ['node'],
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    ...mapGetters(['getCardLabel', 'getAsset']),
    title() {
      if (this.node.kind === 'topic') {
        return this.getCardLabel(this.node);
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
    async getThumbnail() {
      if (!this.node.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
        this.thumbnail = this.getAsset('defaultThumbnail');
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
        this.thumbnail = this.getAsset('defaultThumbnail');
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

.card {
  font-weight: 600;
  transition: all ease .4s;
  img {
    transform: scale(1);
    transition: all ease .8s;
    border-style: none;
  }
  &:hover {
    color: $primary;
    img {
      transform: scale(1.1);
    }
  }
}

.content-image {
  background: $secondary !important;
}
</style>
