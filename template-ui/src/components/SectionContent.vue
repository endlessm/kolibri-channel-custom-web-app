<template>
  <span>
    <SectionTitle :section="section" />

    <CardGrid
      v-for="child in section.children"
      :key="child.id"
      :nodes="child.children"
      :id="child.id"
      v-if="inlineSection"
    >
      <b-row>
        <SectionTitle tag="h4" :section="child" :showDescription="true" />
      </b-row>
    </CardGrid>

    <CardGrid
      :nodes="section.children"
      :id="section.id"
      v-if="!inlineSection"
    />
  </span>
</template>

<script>

export default {
  name: 'SectionContent',
  props: {
    section: Object,
  },
  computed: {
    inlineSection() {
      return this.section.children.every((s) => s.kind === 'topic');
    },
  },
};
</script>
