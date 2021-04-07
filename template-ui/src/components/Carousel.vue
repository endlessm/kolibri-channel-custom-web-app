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
    <b-carousel-slide
      v-for="info in carouselInfo"
      :key="'item-' + info.item.id"
      :caption="info.section.title"
      :text="info.item.title"
      :img-height="config.imgHeight"
      :img-src="getThumb(info.item)"
    />
  </b-carousel>
</b-container>
</template>

<script>
import { getThumbnail } from 'kolibri-api';
import { mapState } from 'vuex';
import defaultThumbnail from '@/assets/default-card-thumbnail.svg';

export default {
  name: 'Carousel',
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
    async getThumbnails() {
      await Promise.all(
        this.carouselInfo.map(async ({ item }) => {
          if (!item.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
            this.thumbnails = { ...this.thumbnails, [item.id]: defaultThumbnail };
            return;
          }
          if (item.thumbnail) {
            this.thumbnails = { ...this.thumbnails, [item.id]: item.thumbnail };
            return;
          }
          const thumbnail = await getThumbnail(item);
          if (thumbnail) {
            this.thumbnails = { ...this.thumbnails, [item.id]: thumbnail };
          } else {
            this.thumbnails = { ...this.thumbnails, [item.id]: defaultThumbnail };
          }
        }),
      );
    },
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
  },
  created() {
    this.getThumbnails();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.carousel-item {
  background: $secondary !important;
}
</style>
