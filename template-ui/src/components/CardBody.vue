<template>
  <div>
    <p class="mb-0 font-weight-bold">{{ node.title }}</p>
    <p class="mb-0">{{ subtitle }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: ['node'],
  computed: {
    ...mapState(['channel']),
    ...mapGetters(['getTopicCardSubtitle']),
    subtitle() {
      if (this.node.kind === 'topic') {
        return this.getTopicCardSubtitle(this.node);
      }
      const byLine = this.node.author || this.channel.title;
      return `by ${byLine}`;
    },
  },
};
</script>
