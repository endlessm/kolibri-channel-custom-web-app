<template>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getNodeUrl(node)"
    class="text-reset text-decoration-none"
    v-b-hover="handleHover"
  >
    <slot></slot>
  </b-link>
</template>

<script>
import { goToContent } from 'kolibri-api';
import { mapGetters } from 'vuex';

export default {
  props: ['node'],
  emits: ['isHovered'],
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    ...mapGetters(['getNodeUrl']),
    isLeaf() {
      return this.node.kind !== 'topic';
    },
  },
  methods: {
    goToContent,
    handleHover(hovered) {
      this.$emit('isHovered', hovered);
    },
  },
};
</script>
