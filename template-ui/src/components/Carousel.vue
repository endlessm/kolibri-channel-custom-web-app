<template>
<b-container id="carousel">
  <b-carousel
    v-model="slide"
    interval="6000"
    img-width="1024"
    img-height="380"
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
    ...mapState(['nodes', 'carouselNodeIds', 'carouselSlideNumber']),
    carouselInfo() {
      if (this.carouselNodeIds.length) {
        return this.carouselInfoFixed(this.carouselNodeIds);
      }

      return this.carouselInfoRandom(this.carouselSlideNumber);
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
