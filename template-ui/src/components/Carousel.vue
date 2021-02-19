<template>
<b-container  id="carousel">
  <b-carousel
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="100"
    img-height="180"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <b-carousel-slide
      v-for="info in carouselInfo"
      :key="'item-' + info.section.id"
      :caption="info.section.title"
      :text="info.item.title"
      :img-src="thumbnails[info.item.id]"
    />
  </b-carousel>
</b-container>
</template>

<script>
import { getThumbnail } from 'kolibri-api';
import defaultThumbnail from '@/assets/default-card-thumbnail.svg';

export default {
  name: 'Carousel',
  props: ['carouselInfo'],
  data() {
    return {
      thumbnails: [],
      slide: 0,
    };
  },
  computed: {
  },
  methods: {
    async getThumbnails() {
      await Promise.all(
        this.carouselInfo.map(async ({ item }) => {
          if (!item.thumbnail && process.env.VUE_APP_USE_MOCK_DATA === 'true') {
            this.thumbnails[item.id] = defaultThumbnail;
            return;
          }
          if (item.thumbnail) {
            this.thumbnails[item.id] = item.thumbnail;
            return;
          }
          const thumbnail = await getThumbnail(item);
          if (thumbnail) {
            this.thumbnails[item.id] = thumbnail;
          } else {
            this.thumbnails[item.id] = defaultThumbnail;
          }
        }),
      );
    },
  },
  created() {
    this.getThumbnails();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

#carousel {
  max-width: 50vw;
}
.carousel-item {
  background: $secondary !important;
}
</style>
