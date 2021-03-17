<template>
  <div
    id="home"
    :style="{ backgroundImage: backgroundImageURL }"
  >

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

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['channel', 'nodes', 'section']),
    ...mapGetters(['mainSections', 'getAssetURL']),
    backgroundImageURL() {
      return this.getAssetURL('homeBackgroundImage');
    },
    contentNodes() {
      if (!this.section || !this.section.children) {
        return null;
      }
      return this.section.children.filter((n) => n.kind !== 'topic') || null;
    },
  },
};
</script>
