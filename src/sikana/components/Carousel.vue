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
      :key="'video-' + info.section.id"
      :caption="info.section.title"
      :text="info.video.title"
      :img-src="thumbnails[info.video.id]"
    />
  </b-carousel>
</b-container>
</template>

<script>
import { getThumbnail } from '@/kolibri-api';

export default {
  name: 'Carousel',
  props: ['carouselInfo'],
  data() {
    return {
      thumbnails: [],
      slide: 0,
    };
  },
  methods: {
    async getThumbnails() {
      await Promise.all(
        this.carouselInfo.map(async ({ video }) => {
          if (video.thumbnail) {
            this.thumbnails[video.id] = video.thumbnail;
            return;
          }
          const thumbnail = await getThumbnail(video);
          this.thumbnails[video.id] = thumbnail;
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
@import '@/sikana/styles.scss';

#carousel {
  max-width: 50vw;
}
</style>
