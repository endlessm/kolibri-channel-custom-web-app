<template>
  <b-container class="section-container my-5">
    <slot></slot>
    <b-row>
      <b-col
        cols="6"
        md="4"
        class="subsection"
        v-for="node in nodes.slice(0, 6)"
        :key="node.id"
      >
        <Card :node="node" />
      </b-col>
    </b-row>
    <b-collapse :id="'collapse-' + id" class="mt-2">
      <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="node in nodes.slice(6)"
          :key="'item-' + node.id"
        >
          <Card :node="node" />
        </b-col>
      </b-row>
    </b-collapse>
    <b-row align-h="center" v-if="nodes.length > 6">
      <b-button class="mt-2" v-b-toggle="'collapse-' + id" variant="light">
        <span class="when-open">Show less</span>
        <span class="when-closed">Show more</span>
        <b-icon-arrow-up class="when-open" />
        <b-icon-arrow-down class="when-closed" />
      </b-button>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'CardGrid',
  props: ['nodes', 'id'],
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

button:hover {
  color: $primary !important;
}

</style>
