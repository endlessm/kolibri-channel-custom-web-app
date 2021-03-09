<template>
  <span>
    <b-navbar-nav v-if="mainSectionsInDropdown">
      <b-nav-item-dropdown text="Topics" right>
        <b-dropdown-item
          v-for="section in mainSections"
          :to="getSectionUrl(section)"
          :key="'menu-' + section.id"
          :active="section === parentSection"
        >
          <span>{{ section.title }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <b-navbar-nav v-else>
      <b-nav-item
        v-for="section in mainSections"
        :to="getSectionUrl(section)"
        :key="'menu-' + section.id"
        :active="section === parentSection"
      >
        <span>{{ section.title }}</span>
      </b-nav-item>
    </b-navbar-nav>
  </span>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getSlug } from '@/utils';

export default {
  name: 'HeaderNavBarSections',
  computed: {
    ...mapState(['parentSection']),
    ...mapGetters(['mainSections']),
    mainSectionsInDropdown() {
      return this.mainSections.length >= 5;
    },
  },
  methods: {
    getSectionUrl(section) {
      return `/#${getSlug(section.title)}`;
    },
  },
};
</script>
