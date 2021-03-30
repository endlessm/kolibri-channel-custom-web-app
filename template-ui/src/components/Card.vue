<template>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getTopicUrl(node)"
    class="text-reset text-decoration-none"
    v-b-hover="handleHover"
  >
    <b-card
      :img-src="thumbnail"
      :img-alt="node.title"
      :class="{
        shadow: isHovered,
        'my-2': !isHighQualityMedia,
        'is-high-quality': isHighQualityMedia,
      }"
      :overlay="isHighQualityMedia"
    >
      <span class="font-weight-bold">{{ title }}</span>
    </b-card>
  </b-link>
</template>

<script>
import { getThumbnail, goToContent } from 'kolibri-api';
import { mapState, mapGetters } from 'vuex';

export default {
  props: ['node'],
  data() {
    return {
      thumbnail: null,
      isHovered: false,
    };
  },
  computed: {
    ...mapState(['isHighQualityMedia']),
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
  &.is-high-quality {
    border: 0;
  }
}

.card-img-overlay {
  transition: all ease .4s;
  color: $white;
  display: flex;
  align-items: flex-end;
  padding: 0;
  &:hover {
    color: $primary;
  }
  span {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 15%);
    width: 100%;
    padding: $card-img-overlay-padding;
  }
}

</style>
