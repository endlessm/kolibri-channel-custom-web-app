<template>
  <div
    id="section"
    :style="{ backgroundImage: backgroundImageURL }"
  >

  <b-container class="my-5">
      <SectionHeader :node="section" />
  </b-container>

  <div v-if="isInlineLevel">
  <CardGrid
    v-for="subsection in section.children"
    :key="subsection.id"
    :nodes="subsection.children"
    :id="subsection.id"
  >
    <b-row>
      <SectionTitle :section="subsection" />
    </b-row>
  </CardGrid>
  </div>
  <div v-else>
  <CardGrid
    :key="section.id"
    :nodes="section.children"
    :id="section.id"
    variant="paginated"
    :itemsPerPage="6"
  />
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { goToContent } from 'kolibri-api';

export default {
  name: 'Section',
  computed: {
    ...mapState(['section', 'parentSection']),
    ...mapGetters({
      isInlineLevel: 'isInlineLevel',
      getAssetURL: 'getAssetURL',
    }),
    backgroundImageURL() {
      return this.getAssetURL('sectionBackgroundImage');
    },
  },
  methods: {
    goToContent,
  },
};
</script>
