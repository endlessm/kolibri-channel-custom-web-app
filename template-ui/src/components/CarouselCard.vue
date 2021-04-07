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
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node', 'section'],
  mixins: [cardMixin],
};
</script>
