<template>
<b-container>
  <h3 :id="sectionSlug">
    <span class="title text-primary" >{{ section.title }} <b-icon-arrow-right /></span>
  </h3>
</b-container>
</template>

<script>
import { getSlug } from '@/utils';

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
