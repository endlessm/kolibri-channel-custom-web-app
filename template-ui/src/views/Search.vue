<template>
  <div
    :style="{ backgroundImage: backgroundImageURL }"
  >
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  computed: {
    ...mapGetters(['getAssetURL']),
    backgroundImageURL() {
      return this.getAssetURL('homeBackgroundImage');
    },
  },
};
</script>
