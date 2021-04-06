<template>
  <component
    :is="cardVariant"
    :node="node"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['node'],
  computed: {
    ...mapState(['isHighQualityMedia']),
    cardVariant() {
      switch (this.isHighQualityMedia) {
        case true:
          return 'HighResCard';
        default:
          return 'RegularCard';
      }
    },
  },
};
</script>
