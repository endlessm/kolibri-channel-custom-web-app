<template>
  <b-container>
    <b-button-toolbar key-nav aria-label="Sections">
      <b-button-group
        class="mx-1 my-1"
        v-for="section in mainSections"
        :key="'menu-' + section.id"
      >
      <b-button pill variant="primary"
        :to="getNodeUrl(section)"
        :active="section === parentSection"
      >
        {{ section.title }}
      </b-button>
      </b-button-group>
    </b-button-toolbar>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['section', 'parentSection']),
    ...mapGetters(['mainSections', 'getNodeUrl']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.container {
  margin-bottom: $jumbotron-padding;
}

</style>
