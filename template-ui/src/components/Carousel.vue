<template>
<b-container id="carousel">
  <b-carousel
    v-model="slide"
    :interval="config.interval"
    :controls="config.controls"
    :indicators="config.indicators"
    :background="config.background"
    :img-width="config.imgWidth"
    :img-height="config.imgHeight"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <BaseCard
      v-for="info in carouselInfo"
      :key="'item-' + info.item.id"
      :node="info.item"
      v-on:thumbLoaded="(thumb) => thumbLoaded(info.item.id, thumb)"
    >
      <b-carousel-slide
        :caption="info.section.title"
        :text="info.item.title"
        :img-height="config.imgHeight"
        :img-src="getThumb(info.item)"
      />
    </BaseCard>
  </b-carousel>
</b-container>
</template>

<script>
import { mapState } from 'vuex';
import defaultThumbnail from '@/assets/default-card-thumbnail.svg';
import cardMixin from '@/components/mixins/cardMixin';

export default {
  name: 'Carousel',
  mixins: [cardMixin],
  data() {
    return {
      thumbnails: [],
      slide: 0,
    };
  },
  computed: {
    ...mapState({
      config: 'carousel',
      nodes: 'nodes',
    }),
    carouselInfo() {
      switch (this.config.method) {
        case 'fixed':
          return this.carouselInfoFixed(this.config.nodeIds);
        case 'random':
        default:
          return this.carouselInfoRandom(this.config.slides);
      }
    },
  },
  methods: {
    getThumb(item) {
      return this.thumbnails[item.id] || defaultThumbnail;
    },
    carouselInfoRandom(n) {
      const items = [];
      // Get n random nodes that are not topic:
      const possibleNodes = this.nodes.filter((node) => node.kind !== 'topic');
      while (items.length < n && possibleNodes.length > 0) {
        const index = Math.floor(Math.random() * possibleNodes.length);
        const [item] = possibleNodes.splice(index, 1);
        items.push(this.createCarouselInfo(item));
      }
      return items;
    },
    carouselInfoFixed(nodeIds) {
      return nodeIds.map((n) => {
        const node = this.nodes.find((m) => m.id === n.id);
        return this.createCarouselInfo(node);
      });
    },
    createCarouselInfo(node) {
      const section = this.nodes.find((n) => n.id === node.parent);
      return { section, item: node };
    },
    thumbLoaded(id, thumb) {
      this.thumbnails = { ...this.thumbnails, [id]: thumb };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.carousel-item {
  background: $secondary !important;
}
</style>
