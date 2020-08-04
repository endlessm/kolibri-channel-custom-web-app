<template>
  <div id="home">

    <b-container
      class="section-container my-5"
      v-for="section in mainSections"
      :key="'section-' + section.id"
    >
      <b-row>
        <SectionTitle :section="section" />
      </b-row>
      <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="subsection in section.children"
          :key="'subsection-' + section.id + '-' + subsection.id"
        >
          <div class="rounded overflow-hidden mb-2 mt-4">
            <b-link :to="getSubsectionUrl(section, subsection)" class="m-0">
            <img
              v-if="subsection.thumbnail"
              :alt=subsection.title
              :src=subsection.thumbnail
              class="w-100"
            >
            </b-link>
          </div>
          <b-link
            :to="getSubsectionUrl(section, subsection)"
            class="text-reset text-decoration-none"
          >
            <span>{{ subsection.title }}</span>
            <span> - {{ getVideosCount(subsection) }} videos</span>
          </b-link>
        </b-col>
      </b-row>
    </b-container>

<b-container>
  <h3>Discover</h3>
</b-container>
<b-container class="mt-4">
<div class="bg-primary">
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
      v-for="info in carouselVideos"
      :key="'video-' + info.section.id"
      :caption="info.section.title"
      :text="info.video.title"
      :img-src="info.video.thumbnail"
    />
  </b-carousel>
</b-container>
</div>
</b-container>
  </div>
</template>

<script>
import SectionTitle from '@/sikana/components/SectionTitle.vue';
import { getSlug, goToContent } from '@/sikana/sikana';

export default {
  name: 'Home',
  components: {
    SectionTitle,
  },
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    channel() {
      return this.$root.$children[0].channel;
    },
    nodes() {
      return this.$root.$children[0].nodes;
    },
    mainSections() {
      return this.$root.$children[0].mainSections;
    },
    carouselVideos() {
      return this.mainSections.map((s) => ({
        video: s.children[0],
        section: s,
      }));
    },
  },
  methods: {
    getVideosCount(node) {
      if (!node.children) {
        return 1;
      }
      return node.children
        .map(this.getVideosCount)
        .reduce((a, b) => a + b, 0);
    },
    getSubsectionUrl(section, subsection) {
      return `/${getSlug(section.title)}/${getSlug(subsection.title)}`;
    },
    goToContent,
  },
};
</script>

<style lang="scss" scoped>
@import '@/sikana/styles.scss';

#carousel {
  max-width: 50vw;
}
.subsection {
  font-weight: 600;
  transition: all ease .4s;
  img {
    transform: scale(1);
    transition: all ease .8s;
  }
  &:hover {
    color: $primary;
    img {
      transform: scale(1.1);
    }
  }
}
</style>
