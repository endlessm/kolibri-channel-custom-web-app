<template>
  <div
    id="footer"
    class="mt-auto bg-secondary"
    :style="{ backgroundImage: footerImageURL }"
  >
    <b-container>
      <b-card class="border-0 bg-transparent text-light text-center">
        <h3>About {{ channel.title }}</h3>
        <p class="font-weight-bold">{{ channel.description }}</p>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dynamicRequireAsset from '@/dynamicRequireAsset';

const footerImage = dynamicRequireAsset('footer-background.jpg');

export default {
  name: 'Footer',
  data() {
    return {
      footerImageURL: footerImage ? `url(${footerImage})` : null,
    };
  },
  computed: {
    ...mapState(['channel']),
  },
};
</script>

<style lang="scss">
#footer {
  text-shadow: 1px 1px 2px #333;
}
</style>
