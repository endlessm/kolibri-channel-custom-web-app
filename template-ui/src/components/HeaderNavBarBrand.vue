<template>
  <b-navbar-brand to="/">
    <b-img
      width="44"
      v-if="channel.thumbnail"
      :src="channel.thumbnail"
      :alt="channel.title"
    />
    <span v-else>{{ channel.title }}</span>
  </b-navbar-brand>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderNavBarBrand',
  computed: {
    ...mapState(['channel']),
  },
};
</script>
