<template>
  <b-link
    v-on:click="isLeaf? goToContent(node) : false"
    :to="isLeaf? '' : getTopicUrl(node)"
    class="text-reset text-decoration-none"
    v-b-hover="handleHover"
  >
    <b-card
      :img-src="thumbnail"
      :img-alt="node.title"
      :class="{
        shadow: isHovered,
        'my-2': !isHighQualityMedia,
        'is-high-quality': isHighQualityMedia,
      }"
      :overlay="isHighQualityMedia"
    >
      <span class="font-weight-bold">{{ title }}</span>
    </b-card>
  </b-link>
</template>

<script>
import { mapState } from 'vuex';
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node'],
  mixins: [cardMixin],
  computed: {
    ...mapState(['isHighQualityMedia']),
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
  &.is-high-quality {
    border: 0;
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
