<template>
<b-container id="carousel">
  <b-carousel
    v-model="slide"
    :interval="4000"
    img-width="1024"
    img-height="380"
  >
    <CarouselCard
      v-for="info in carouselInfo"
      :key="'item-' + info.item.id"
      :node="info.item"
      :section="info.section"
    >
    </CarouselCard>
  </b-carousel>
</b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Carousel',
  data() {
    return {
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
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.carousel-item {
  background: $secondary !important;
}
</style>
