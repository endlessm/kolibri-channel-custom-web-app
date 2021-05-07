<template>
  <b-row :no-gutters="isHighQualityMedia">
    <b-col
      :cols="cardColumns.cols"
      :md="cardColumns.md"
      v-for="node in nodes"
      :key="node.id"
    >
      <Card
        v-resize
        @resize="cardResize"
        :node="node"
        :minHeight="maxCardHeight"
        ref="cards"
      />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'GridPage',
  props: ['nodes'],
  data() {
    return {
      maxCardHeight: 0,
    };
  },
  computed: {
    ...mapState(['cardColumns']),
    ...mapGetters(['isHighQualityMedia']),
  },
  methods: {
    calculateMaxHeight() {
      const heights = this.$refs.cards.map((c) => c.$el.clientHeight);
      const maxHeights = Math.max(...heights);
      if (maxHeights > this.maxCardHeight) {
        this.maxCardHeight = maxHeights;
        this.$emit('maxCardHeight', this.maxCardHeight);
      }
    },
    cardResize() {
      this.calculateMaxHeight();
    },
  },
  mounted() {
    this.calculateMaxHeight();
  },
};
</script>
