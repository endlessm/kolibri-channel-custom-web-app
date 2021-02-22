<template>
  <div>
  <b-container class="my-5">
      <SectionHeader :node="section" />
  </b-container>

  <CardGrid
    :key="section.id"
    :nodes="section.children"
    :id="section.id"
  />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { goToContent } from 'kolibri-api';

export default {
  name: 'Section',
  computed: {
    ...mapState(['section', 'parentSection']),
  },
  methods: {
    goToContent,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.subsection {
  font-weight: 600;
  transition: all ease .4s;
  img {
    transform: scale(1);
    transition: all ease .8s;
    border-style: none;
  }
  &:hover {
    color: $primary;
    img {
      transform: scale(1.1);
    }
  }
}

</style>
