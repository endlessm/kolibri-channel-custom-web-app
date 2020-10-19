<template>
  <div>
  <b-container class="my-5">
    <b-row>
      <SectionTitle :section="parentSection" />
    </b-row>
      <SectionHeader :node="section" />
  </b-container>

  <b-container
      class="subsection-container my-5"
      v-for="s in section.children"
      :key="'subsection-' + s.id"
  >
  <b-row>
  <h3>{{ s.title }}</h3>
  </b-row>
  <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="node in s.children.slice(0, 6)"
          :key="'item-' + node.id"
        >
          <Card :node="node" />
        </b-col>
  </b-row>
  <b-collapse :id="'collapse-'+ s.id" class="mt-2">
  <b-row>
        <b-col
          cols="6"
          md="4"
          class="subsection"
          v-for="node in s.children.slice(6)"
          :key="'item-' + node.id"
        >
          <Card :node="node" />
        </b-col>
  </b-row>
  </b-collapse>
  <b-row
    align-h="center"
    v-if="s.children.length > 6"
  >
    <b-button class="mt-2" v-b-toggle="'collapse-' + s.id" variant="light">
      <span class="when-open">Show less</span>
      <span class="when-closed">Show more</span>
      <b-icon-arrow-up class="when-open"/>
      <b-icon-arrow-down class="when-closed"/>
    </b-button>
  </b-row>
  </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SectionTitle from '@/components/SectionTitle.vue';
import Card from '@/components/Card.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { goToContent } from 'kolibri-api';

export default {
  name: 'Section',
  components: {
    SectionTitle,
    Card,
    SectionHeader,
  },
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

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

button:hover {
  color: $primary !important;
}

</style>
