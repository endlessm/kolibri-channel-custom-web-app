<template>
  <div id="home">

    <b-container
      class="section-container my-5"
      v-for="section in mainSections"
      :key="section.id"
    >
      <b-row>
        <SectionTitle :section="section" />
      </b-row>
      <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="node in section.children"
          :key="node.id"
        >
          <Card :node="node" />
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
import SectionTitle from '@/components/SectionTitle.vue';
import Card from '@/components/Card.vue';
import Carousel from '@/components/Carousel.vue';

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
        item: s.children[0],
        section: s,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

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
