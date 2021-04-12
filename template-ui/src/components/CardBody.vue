<template>
  <div>
    <p class="mb-0 font-weight-bold">{{ node.title }}</p>
    <p class="mb-0">{{ getCardSubtitle(node) }}</p>
    <b-badge
      pill variant="primary"
      class="mr-1 mb-1"
      v-for="tag in node.tags"
      :key="tag"
    >
      {{ tag }}
    </b-badge>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['node'],
  computed: {
    ...mapGetters(['getCardSubtitle']),
  },
};
</script>
