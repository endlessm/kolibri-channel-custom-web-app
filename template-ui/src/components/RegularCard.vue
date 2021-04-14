<template>
    <b-card
      class="my-2 rounded-lg"
      :class="{
        shadow: !isHovered,
        'shadow-lg': isHovered,
      }"
    >
  <ContentLink :node="node" @isHovered="(hovered) => isHovered = hovered">
      <b-card-img
        :src="thumbnail"
        :alt="node.title"
      />
      <b-card-text>
        <CardBody :node="node" />
      </b-card-text>
  </ContentLink>
    </b-card>
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

// Move padding from card body to the single card text:
.card-body {
  padding: 0;
}
.card-text {
  padding: $card-spacer-x;
}

.card-img {
  border-top-left-radius: $border-radius-lg;
  border-top-right-radius: $border-radius-lg;
}

</style>
