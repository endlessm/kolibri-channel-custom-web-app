<template>
  <b-row>
    <b-col
      cols="6"
      md="4"
      class="subsection"
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

<style lang="scss" scoped>
@import '@/styles.scss';

.subsection {
  font-weight: 600;
  transition: all ease .4s;
  ::v-deep img {
    transform: scale(1);
    transition: all ease .8s;
    border-style: none;
  }
  &:hover {
    color: $primary;
    ::v-deep img {
      transform: scale(1.1);
    }
  }
}

</style>
