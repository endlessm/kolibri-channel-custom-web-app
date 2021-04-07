<template>
  <ContentLink :node="node" @isHovered="(hovered) => isHovered = hovered">
    <b-card
      :img-src="thumbnail"
      :img-alt="node.title"
      :class="{
        shadow: isHovered,
      }"
      overlay
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
  border: 0;
  &:hover {
    color: $primary;
  }
}

.card-img-overlay {
  transition: all ease .4s;
  color: $white;
  display: flex;
  align-items: flex-end;
  padding: 0;
  &:hover {
    color: $primary;
  }
  span {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 15%);
    width: 100%;
    padding: $card-img-overlay-padding;
  }
}

</style>
