<template>
  <div>
    <p class="mb-0 font-weight-bold">{{ node.title }}</p>
    <p class="mb-0">{{ getCardSubtitle(node) }}</p>
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
