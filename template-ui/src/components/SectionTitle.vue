<template>
<b-container>
  <h3 :id="sectionSlug">
    <span class="title" >{{ section.title }}</span>
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
