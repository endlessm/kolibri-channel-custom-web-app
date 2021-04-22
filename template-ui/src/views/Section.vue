<template>
  <div
    :style="{ backgroundImage: backgroundImageURL }"
  >
  <FilterContent />

  <div v-if="isFilterResultEmpty">
    <EmptyResultsMessage />
  </div>

  <template v-else>

  <div v-if="isInlineLevel">
  <CardGrid
    v-for="subsection in filteredSections(section)"
    :key="subsection.id"
    :nodes="filteredSections(subsection)"
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
    :nodes="filteredSections(section)"
    :id="section.id"
    variant="paginated"
  />
  </div>

  </template>

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
      filterNodes: 'filters/filterNodes',
    }),
    backgroundImageURL() {
      return this.getAssetURL('sectionBackgroundImage');
    },
    isFilterResultEmpty() {
      if (!this.section) {
        return true;
      }
      return this.filteredSections(this.section).length;
    },
  },
  methods: {
    goToContent,
    filteredSections(section) {
      return this.filterNodes(section.children);
    },
  },
};
</script>
