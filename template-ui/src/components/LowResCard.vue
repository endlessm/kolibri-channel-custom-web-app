<template>
  <ContentLink :node="node">
    <b-card
      border-variant="light"
      :img-src="thumbnail"
      :img-alt="node.title"
      class="my-2"
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

.card-body {
  padding-left: 0;
}

</style>
