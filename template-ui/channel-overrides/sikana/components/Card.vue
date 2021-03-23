<template>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getTopicUrl(node)"
    class="text-reset text-decoration-none"
    v-b-hover="handleHover"
  >
    <b-card
      :overlay="hasTextInImage"
      :img-src="thumbnail"
      :img-alt="node.title"
      class="my-2"
      :class="{shadow: isHovered}"
    >
      <span v-if="!hasTextInImage" class="font-weight-bold">{{ title }}</span>
    </b-card>
  </b-link>
</template>

<script>
import { getThumbnail, goToContent } from 'kolibri-api';
import { mapGetters } from 'vuex';

export default {
  props: ['node'],
  data() {
    return {
      thumbnail: null,
      isHovered: false,
    };
  },
  computed: {
    ...mapGetters(['getCardLabel', 'getAsset', 'getLevel']),
    title() {
      if (this.node.kind === 'topic') {
        return this.getCardLabel(this.node);
      }
      return this.node.title;
    },
    isLeaf() {
      return this.node.kind !== 'topic';
    },
    hasTextInImage() {
      return this.getLevel(this.node) === 4;
    }
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
    handleHover(hovered) {
      this.isHovered = hovered;
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
  transition: all ease .4s;
  &:hover {
    color: $primary;
  }
}
</style>
