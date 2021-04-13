<template>
  <ContentLink :node="node">
    <b-carousel-slide>
      <template #img>
        <b-card :title="node.title">
          <template>
            <div class="img" :style="backgroundStyle"></div>
            <b-card-text>
              <p>{{ getCardSubtitle(node) }}</p>
              <p class="text-muted">
                <v-clamp
                  autoresize
                  :max-lines="5"
                >
                  {{ node.description }}
                </v-clamp>
              </p>
              <b-badge
                pill variant="primary"
                class="mr-1 mb-1"
                v-for="tag in node.tags"
                :key="tag"
              >
                {{ tag }}
              </b-badge>
            </b-card-text>
          </template>
        </b-card>
      </template>
    </b-carousel-slide>
  </ContentLink>
</template>

<script>
import VClamp from 'vue-clamp';
import { mapGetters } from 'vuex';
import cardMixin from '@/components/mixins/cardMixin';

export default {
  props: ['node'],
  mixins: [cardMixin],
  components: {
    VClamp,
  },
  computed: {
    ...mapGetters(['getCardSubtitle']),
    backgroundStyle() {
      return {
        backgroundImage: `url("${this.thumbnail}")`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles.scss';

.badge {
  font-size: $font-size-base;
}
.card {
  border-radius: $border-radius-lg;
  padding-left: 50%;
  position: relative;
  min-height: $carousel-min-height;
}
.img {
  border-top-left-radius: $border-radius-lg;
  border-bottom-left-radius: $border-radius-lg;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
}
</style>
