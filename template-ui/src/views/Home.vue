<template>
  <div
    :style="{ backgroundImage: backgroundImageURL }"
  >

    <Carousel />
    <FilterContent />

    <CardGrid
      :nodes="contentNodes"
      v-if="contentNodes"
    />

    <CardGrid
      v-for="section in filteredSections"
      :key="section.id"
      :nodes="filterNodes(section.children)"
      :id="section.id"
    >
      <b-row>
        <SectionTitle :section="section" />
      </b-row>
    </CardGrid>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['channel', 'nodes', 'section', 'carousel']),
    ...mapGetters({
      mainSections: 'mainSections',
      getAssetURL: 'getAssetURL',
      filterNodes: 'filters/filterNodes',
    }),
    backgroundImageURL() {
      return this.getAssetURL('homeBackgroundImage');
    },
    contentNodes() {
      if (!this.section || !this.section.children) {
        return null;
      }
      const childs = this.section.children.filter((n) => n.kind !== 'topic') || null;
      return this.filterNodes(childs);
    },
    filteredSections() {
      return this.filterNodes(this.mainSections);
    },
  },
};
</script>
