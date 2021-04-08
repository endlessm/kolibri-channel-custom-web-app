<template>
  <ContentLink :node="node" @isHovered="(hovered) => isHovered = hovered">
    <b-card
      :img-src="thumbnail"
      :img-alt="node.title"
      class="my-2 rounded-lg"
      :class="{
        shadow: !isHovered,
        'shadow-lg': isHovered,
      }"
    >
      <span class="font-weight-bold">{{ title }}</span>
    </b-card>
  </ContentLink>
</template>

<script>
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node'],
  mixins: [cardMixin],
  data() {
    return {
      isHovered: false,
    };
  },
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

.card-img {
  border-top-left-radius: $border-radius-lg;
  border-top-right-radius: $border-radius-lg;
}

</style>
