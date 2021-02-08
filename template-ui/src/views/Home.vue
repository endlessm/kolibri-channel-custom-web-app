<template>
  <div id="home">

    <CardGrid
      :nodes="contentNodes"
      id="content-nodes"
      v-if="contentNodes"
    />

    <CardGrid
      v-for="section in mainSections"
      :key="section.id"
      :nodes="section.children"
      :id="section.id"
    >
      <b-row>
        <SectionTitle :section="section" />
      </b-row>
    </CardGrid>

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
import { mapState, mapGetters } from 'vuex';
import SectionTitle from '@/components/SectionTitle.vue';
import CardGrid from '@/components/CardGrid.vue';
import Carousel from '@/components/Carousel.vue';

export default {
  name: 'Home',
  components: {
    SectionTitle,
    CardGrid,
    Carousel,
  },
  computed: {
    ...mapState(['channel', 'nodes', 'section']),
    ...mapGetters(['mainSections']),
    carouselInfo() {
      return this.mainSections.map((s) => ({
        item: s.children[0],
        section: s,
      }));
    },
    contentNodes() {
      return this.section.children.filter((n) => n.kind !== 'topic') || null;
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
