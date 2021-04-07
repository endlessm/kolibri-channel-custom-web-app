<template>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getTopicUrl(node)"
    class="text-reset text-decoration-none"
    v-b-hover="handleHover"
  >
    <slot></slot>
  </b-link>
</template>

<script>
import { goToContent } from 'kolibri-api';

export default {
  props: ['node'],
  emits: ['isHovered'],
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    isLeaf() {
      return this.node.kind !== 'topic';
    },
  },
  methods: {
    goToContent,
    getTopicUrl(node) {
      return `/${node.id}`;
    },
    handleHover(hovered) {
      this.$emit('isHovered', hovered);
    },
  },
};
</script>
