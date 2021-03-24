<template>
  <b-row>
    <b-col
      cols="6"
      md="4"
      v-for="node in nodes"
      :key="node.id"
    >
      <Card :node="node" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'GridPage',
  props: ['nodes'],
};
</script>
