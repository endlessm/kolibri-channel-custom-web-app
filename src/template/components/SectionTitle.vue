<template>
  <h3 :id="sectionSlug">
    <span :class="'si si-' + sectionSlug" />
    <span class="title" >{{ section.title }}</span>
  </h3>
</template>

<script>
import { getSlug } from '@/kolibri-api';

export default {
  name: 'SectionTitle',
  props: {
    section: Object,
  },
  computed: {
    sectionSlug() {
      return getSlug(this.section.title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/template/styles.scss';

h3 {
  position: relative;
  padding-left: 45px;
  .si {
    color: $primary;
    font-size: 40px;
    position: absolute;
    top: -5px;
    left: 0;
  }
}
</style>
