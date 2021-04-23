<template>
  <b-img
    fluid
    :src="thumbnail"
    :alt="node.title"
    class="rounded w-100"
  />
</template>

<script>
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node'],
  mixins: [cardMixin],
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';
</style>
