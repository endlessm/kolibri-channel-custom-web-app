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
            <Card :node="subsection" />
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
  <Carousel :carouselInfo=carouselInfo />
</div>
</b-container>
  </div>
</template>

<script>
import SectionTitle from '@/sikana/components/SectionTitle.vue';
import Card from '@/sikana/components/Card.vue';
import Carousel from '@/sikana/components/Carousel.vue';
import { getSlug, goToContent } from '@/sikana/sikana';

export default {
  name: 'Home',
  components: {
    SectionTitle,
    Card,
    Carousel,
  },
  data() {
    return {
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
    carouselInfo() {
      return this.mainSections.map((s) => ({
        video: s.children[0],
        // FIXME, use video.parent?
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
