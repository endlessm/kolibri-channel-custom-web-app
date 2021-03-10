<template>
  <b-navbar-brand to="/">
    <img
      class="sikana-logo"
      :src="logo"
      :alt="channel.title"
    />
  </b-navbar-brand>
</template>

<script>
import { mapState } from 'vuex';
import logo from '../assets/sikana.png';

export default {
  name: 'HeaderNavBarBrand',
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapState(['channel']),
  },
};
</script>

<style lang="scss">
  img {
    width: 100px;
  }
</style>
