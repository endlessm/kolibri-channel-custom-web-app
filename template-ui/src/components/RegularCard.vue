<template>
  <BaseCard :node="node">
    <b-card
      :img-src="thumbnail"
      :img-alt="node.title"
      class="my-2"
      :class="{
        shadow: isHovered,
      }"
    >
      <span class="font-weight-bold">{{ title }}</span>
    </b-card>
  </BaseCard>
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

.card {
  transition: all ease .4s;
  &:hover {
    color: $primary;
  }
}

</style>
