<template>
  <div>
    <p class="text-uppercase text-info mb-1">
      <span v-if="typeTag">{{ typeTag }}</span>
      <span v-if="typeTag && gradeOrLevelTag"> • </span>
      <span v-if="gradeOrLevelTag">{{ gradeOrLevelTag }}</span>
    </p>
    <p class="mb-0 font-weight-bold">{{ node.title }}</p>
    <p class="mb-0">{{ getCardSubtitle(node) }}</p>
    <b-badge
      pill variant="primary"
      class="mr-1 mb-1"
      v-for="tag in subjectTags"
      :key="tag"
    >
      {{ tag }}
    </b-badge>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { StructuredTags } from '@/constants';

export default {
  props: ['node'],
  computed: {
    ...mapGetters(['getCardSubtitle']),
    ...mapGetters({
      getStructuredTags: 'filters/getStructuredTags',
      getFirstStructuredTag: 'filters/getFirstStructuredTag',
    }),
    subjectTags() {
      return this.getStructuredTags(this.node, StructuredTags.SUBJECT);
    },
    typeTag() {
      return this.getFirstStructuredTag(this.node, StructuredTags.TYPE);
    },
    gradeOrLevelTag() {
      return (
        this.getFirstStructuredTag(this.node, StructuredTags.GRADE)
        || this.getFirstStructuredTag(this.node, StructuredTags.LEVEL)
      );
    },
  },
};
</script>
