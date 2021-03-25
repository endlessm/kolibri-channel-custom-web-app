<template>
  <b-row>
    <b-col
      :cols="cardColumns.cols"
      :md="cardColumns.md"
      v-for="node in nodes"
      :key="node.id"
    >
      <Card :node="node" />
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GridPage',
  props: ['nodes'],
  computed: {
    ...mapState(['cardColumns']),
  },
};
</script>
