<template>
  <b-container class="section-container my-5">
    <slot></slot>

    <component
      :is="displayVariant"
      :nodes="nodes"
      :id="id"
      :itemsPerPage="itemsPerPage"
    />
  </b-container>
</template>

<script>

export default {
  name: 'CardGrid',
  props: {
    nodes: Array,
    id: String,
    variant: {
      type: String,
      default: 'collapsible',
      validator(value) {
        // The value must match one of these strings
        return ['paginated', 'collapsible'].includes(value);
      },
    },
    itemsPerPage: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    displayVariant() {
      switch (this.variant) {
        case 'paginated':
          return 'PaginatedCardGrid';
        default:
          return 'CollapsibleCardGrid';
      }
    },
  },
};
</script>
