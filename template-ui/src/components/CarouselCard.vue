<template>
  <ContentLink :node="node">
    <b-carousel-slide>
      <template #img>
        <b-card>
          <template>
            <div class="img" :style="backgroundStyle">
              <CardMediaType :node="node" />
            </div>
            <b-card-text>
              <p class="text-uppercase text-info mb-1">
                <span v-if="typeTag">{{ typeTag }}</span>
                <span v-if="typeTag && gradeOrLevelTag"> • </span>
                <span v-if="gradeOrLevelTag">{{ gradeOrLevelTag }}</span>
              </p>
              <h4 class="mb-1">
                <v-clamp
                  autoresize
                  :max-lines="5"
                >
                  {{ node.title }}
                </v-clamp>
              </h4>
              <p class="text-muted mb-1">{{ getCardSubtitle(node) }}</p>
              <b-badge
                pill variant="primary"
                class="mr-1 mb-1"
                v-for="tag in subjectTags"
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
import { StructuredTags } from '@/constants';

export default {
  props: ['node'],
  mixins: [cardMixin],
  components: {
    VClamp,
  },
  computed: {
    ...mapGetters(['getCardSubtitle']),
    ...mapGetters({
      getStructuredTags: 'filters/getStructuredTags',
      getFirstStructuredTag: 'filters/getFirstStructuredTag',
    }),
    backgroundStyle() {
      return {
        backgroundImage: `url("${this.thumbnail}")`,
      };
    },
    subjectTags() {
      return this.getStructuredTags(this.node, StructuredTags.SUBJECT);
    },
    typeTag() {
      return this.getFirstStructuredTag(this.node, StructuredTags.TYPE);
    },
    gradeOrLevelTag() {
      return (
        this.getFirstStructuredTag(this.node, StructuredTags.GRADE)
        || this.getFirstStructuredTag(this.node, StructuredTags.LEVEL)
      );
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
