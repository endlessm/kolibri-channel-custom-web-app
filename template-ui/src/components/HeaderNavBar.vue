<template>
  <b-navbar toggleable="lg" type="light" variant="light"
    :style="{ backgroundImage: headerImageURL }"
  >
    <HeaderNavBarBrand />

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <slot name="sections">
        <HeaderNavBarSections />
      </slot>

      <slot></slot>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <slot name="right"></slot>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderNavBar',
  computed: {
    ...mapGetters(['getAssetURL']),
    headerImageURL() {
      return this.getAssetURL('headerImage');
    },
  },
};
</script>
