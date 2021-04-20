<template>
  <div>
    <p class="mb-0 font-weight-bold">{{ node.title }}</p>
    <p class="mb-0">{{ getCardSubtitle(node) }}</p>
    <b-badge
      pill variant="primary"
      class="mr-1 mb-1"
      v-for="tag in topicTags"
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
    ...mapGetters({ getStructuredTags: 'filters/getStructuredTags' }),
    topicTags() {
      return this.getStructuredTags(this.node, StructuredTags.TOPIC);
    },
  },
};
</script>
