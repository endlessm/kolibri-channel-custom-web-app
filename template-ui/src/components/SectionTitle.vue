<template>
<b-container>
  <component :is="tag" :id="sectionSlug">
    <span class="title" >{{ section.title }}</span>
    <b-button
      v-b-toggle="'collapse-description-' + section.id"
      variant="link"
      v-if="showDescription && section.description"
    >
      <b-icon-info-circle />
    </b-button>
  </component>
  <b-collapse
    :id="'collapse-description-' + section.id"
    v-if="showDescription && section.description"
  >
    {{ section.description }}
  </b-collapse>
</b-container>
</template>

<script>
import { getSlug } from '@/utils';

export default {
  name: 'SectionTitle',
  props: {
    section: Object,
    showDescription: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'h3',
    },
  },
  computed: {
    sectionSlug() {
      return getSlug(this.section.title);
    },
  },
};
</script>
