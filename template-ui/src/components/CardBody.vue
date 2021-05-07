<template>
  <div class="card-content">
    <p class="text-uppercase text-info mb-1 text-truncate">
      <span v-if="typeTag">{{ typeTag }}</span>
      <span v-if="typeTag && gradeOrLevelTag"> • </span>
      <span v-if="gradeOrLevelTag">{{ gradeOrLevelTag }}</span>
    </p>
    <h5 class="mb-1">
      <v-clamp
        autoresize
        :max-lines="3"
      >
        {{ node.title }}
      </v-clamp>
    </h5>
    <p class="text-muted mb-1 text-truncate">
      {{ getCardSubtitle(node) }}
    </p>
    <b-badge
      pill variant="primary"
      class="mr-1 mb-1"
      v-for="tag in subjectTags"
      :key="tag"
    >
      {{ tag }}
    </b-badge>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
import { mapGetters } from 'vuex';
import { StructuredTags } from '@/constants';

export default {
  props: ['node'],
  components: {
    VClamp,
  },
  computed: {
    ...mapGetters(['getCardSubtitle']),
    ...mapGetters({
      getStructuredTags: 'filters/getStructuredTags',
      getFirstStructuredTag: 'filters/getFirstStructuredTag',
    }),
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

$type-line-height: $font-size-base * $line-height-base;
$title-line-height: 3 * ($h5-font-size * $headings-line-height);
$subtitle-line-height: $font-size-base * $line-height-base;
$tags-line-height: $font-size-base * $line-height-base;

$margins: map-get($spacers, 1) * 4;

$total-card-height: ($type-line-height + $title-line-height +
                     $subtitle-line-height + $tags-line-height +
                     $margins);

.card-content {
  min-height: $total-card-height;
}

</style>
