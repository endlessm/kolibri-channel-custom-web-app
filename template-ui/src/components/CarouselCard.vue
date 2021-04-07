<template>
  <ContentLink :node="node">
    <b-carousel-slide
      :caption="section.title"
      :text="node.title"
      :img-src="thumbnail"
    />
  </ContentLink>
</template>

<script>
import { mapState } from 'vuex';
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node'],
  mixins: [cardMixin],
  computed: {
    ...mapState(['nodes']),
    section() {
      return this.nodes.find((n) => n.id === this.node.parent);
    },
  },
};
</script>
